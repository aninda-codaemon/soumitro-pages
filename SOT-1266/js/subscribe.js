/*
 *
 * subscribeRunner.js - 0.1.3 - Modified
 * Subscription form validation and bounce dialog code lives here.
 *
 * To be placed on a form with id="subscribe_form":
 *
 * data-sub-success-image="/img/check.png"     [Define an image to be shown next to valid fields.]
 * data-sub-ignore-messages="false"            [If set to true, error messages are not displayed.]
 * data-sub-ignore-success="false"             [If set to true, labels are not marked with a success class.]
 * data-sub-success-class="input-success"      [The class added to valid fields.]
 * data-sub-error-class="input-error"          [The class added to invalid fields.]
 *
 * The text for the bounce dialog can be specified on an HTML element with id="subscribe_bounce_text"
 * Optional attributes to be placed on the text element:
 *
 * data-sub-bounce-url="https://bv.com/trial"  [The url the bounce dialog should redirect to]
 *
 */

(function () {

  var today = new Date(),
      year = today.getFullYear(),
      month = today.getMonth() + 1,
      sub_validator;

  var noop = function () {};

  var $monthSelect = $("#credit_card_expiration_date_2i"),
      $yearSelect = $("#credit_card_expiration_date_1i");

  var setCCMonthYear = function () {
    $monthSelect.val(month);
    $yearSelect.val(year);
  };

  var disableForm = function() {
    $('#create_button').attr('disabled', 'disabled');
    $('#create_button').hide();
    $('#spinner').show();
    $('#spinner').removeClass('hidden');
  };

  var enableForm = function() {
    $('#create_button').removeAttr('disabled');
    $('#create_button').show();
    $('#spinner').hide();
    $('#spinner').addClass('hidden');
  };

  var checkCardType = function () {
    var card_number = $('#credit_card_card_number').val();
    return checkCC(card_number);
  };

  var handleFormSubmit = function(form) {

    disableForm();

    var formXHR = $.post("/api/v4/account.json", $(form).serialize());
    // var formXHR = $.ajax({
    //   type: "GET",
    //   url: "http://127.0.0.1:9000/accounts.json",
    //   data: $(form).serialize(),
    //   dataType: 'jsonp'
    // });

    formXHR.success(function () {
      console.log('Form XHR')
      var selectedPlan = $(".plan_name_radio:checked").val();
      if (heap && heap.track) {
        heap.track("Successful Signup", {plan_selected: selectedPlan});
      }
      window.onbeforeunload = noop;
      window.setTimeout(function () {
        window.location = '/accounts/creating_account';
      }, 2 * 1000);
    });

    formXHR.fail(function (jqXHR, textStatus, errorThrown) {
      enableForm();
      data = $.parseJSON(jqXHR.responseText);
      if (data && data.results && data.results.errors) {

        var errors = _.reduce(data.results.errors, function(e, group, group_name) {
          e = e.concat(group);
          return e;
        }, []);

        errors = _.reject(errors, function(e) {
          return e === "Credit cards is invalid";
        });

       if (heap && heap.track) {
         heap.track("Validation Errors - Server", {data: errors});
       }

        $("#messages").html(_.map(errors, function(err) {
          return $("<li>").html(err);
        }));

        $("#error_container").removeClass("hidden");

        $('html, body').animate({
            scrollTop: $("#error_container").offset().top
        }, 500);
      }
    });
  };

  var $subscribe_form = $("#subscribe_form"),
      $month = $("[name=credit_card\\[expiration_date\\(2i\\)\\]]"),
      $year = $("[name=credit_card\\[expiration_date\\(1i\\)\\]]"),
      successURL = $('.check-icon-img').attr('src'),
      errorClass = $subscribe_form.data('sub-error-class'),
      successClass = $subscribe_form.data('sub-success-class'),
      ignoreMessages = $subscribe_form.data('sub-ignore-messages'),
      ignoreSuccess = $subscribe_form.data('sub-ignore-success');

  $month.on('change', function () {
    $year.valid();
    $(this).valid();
  });

  $year.on('change', function () {
    $month.valid();
    $(this).valid();
  });

  // Add a custom validation method for monthYear selections
  var validMonthYear = function () {
    var isValid = true,
        m = parseInt($month.val(), 10),
        y = parseInt($year.val(), 10),
        isCurrentYear = year === y;

    if (!y || !m || (y < year)) return false;

    if (isCurrentYear) {
      isValid = m >= month;
    }

    if (isValid) {
      $month.removeClass(errorClass);
      $year.removeClass(errorClass);
      $month.addClass(successClass);
      $year.addClass(successClass);
    } else {
      $month.removeClass(successClass);
      $year.removeClass(successClass);
      $month.addClass(errorClass);
      $year.addClass(errorClass);
    }

    return isValid;
  };

  var validCVV = function () {
    var valid = true, cardType = checkCardType(), cvv = $("#cvv2").val();
    if (cardType === "american_express") {
      valid = cvv && cvv.length === 4;
    } else {
      valid = cvv && cvv.length === 3;
    }
    return valid;
  };

  $.validator.addMethod('validCVV', validCVV, 'Enter a valid card verification number');
  $.validator.addMethod('validMonth', validMonthYear, ' ');
  $.validator.addMethod('validYear', validMonthYear, 'Please enter a valid expiration date.');

  var validatorOpts = {
    rules: {
      "account[first_name]": "required",
      "account[last_name]": "required",
      "user[email]": {
        required: true,
        email: true
      },
      "tos2": {
        required: true
      },
      "account[tos]": {
        required: true
      },
      "user[email_confirmation]": {
        required: true,
        email: true,
        equalTo: "#user_email"
      },
      "credit_card[expiration_date(2i)]": {
        validMonth: true
      },
      "credit_card[expiration_date(1i)]": {
        validYear: true
      },
      "credit_card[first_name]": "required",
      "credit_card[last_name]": "required",
      "address[address1]": "required",
      "address[city]": "required",
      "address[zip]": {
        maxlength: 5,
        minlength: 5,
        digits: true,
        required: true
      },
      "account[phone_number]": "required",
      "credit_card[verification_number]": {
        required: true,
        number: true,
        maxlength: 4,
        validCVV: true
      },
      "credit_card[card_number]": {
        creditcard2: function() {
          var card_type = checkCardType();
          return card_type;
        }
      }
    },

    success: function($label) {
      // NOTE:
      // Ideally, we'd be removing the error class, but jquery validate needs it.
      // Otherwise, it adds another label field if its not present. To mitigate
      // this, make sure that .success is declared after .error in your CSS.
      $label.addClass('success');

      if (successURL && $label.find("img").length === 0) {
        $label.html($("<img>").attr('src', successURL));
        $label.addClass('label-success');
      }
    },

    highlight: function (input) {
      var $input = $(input),
          $targetElem;

      if (input.name === "tos2" || input.name === "account[tos]") {
        $input.parent().next().removeClass('label-success');
      } else {
        $input.parent().find('.label-success').removeClass('label-success');
      }

      if ($input.attr('type') === "checkbox") {
        $targetElem = $input.parent();
      } else {
        $targetElem = $input;
      }
      $targetElem.removeClass(successClass);
      $targetElem.addClass(errorClass);
    },

    unhighlight: function (input) {
      var $input = $(input),
          $targetElem;

      if ($input.attr('type') === "checkbox") {
        $targetElem = $input.parent();
      } else {
        $targetElem = $input;
      }
      $targetElem.removeClass(errorClass);
      $targetElem.addClass(successClass);
    },

    invalidHandler: function (evt, validator) { },

    messages: {
      "account[first_name]": "Please enter your first name.",
      "account[last_name]": "Please enter your last name.",
      "credit_card[first_name]": "Please enter your first name.",
      "credit_card[last_name]": "Please enter your Last name.",
      "address[address1]": "Please enter the credit card billing address.",
      "address[city]": "Please enter the city associated with your credit card.",
      "address[zip]": "Please enter the postal code associated with your credit card.",
      "account[phone_number]": "Please enter the phone number you can be reached at.",
      "credit_card[verification_number]": {
          required: "Please provide your card's verification number.",
          number: "Card codes must be either 3 or 4 numerical digits"
      },
      "user[password]": {
          required: "Please provide a password.",
          minlength: "Your password must be at least 8 characters long."
      },
      "user[password_confirmation]": {
          required: "Please provide a password.",
          minlength: "Your password must be at least 8 characters long.",
          equalTo: "Please enter the same password as above."
      },
      "user[email_confirmation]": {
          required: "Please confirm your email.",
          equalTo: "Please enter the same email address as above."
      },
      "tos2": {
          required: "You will need to agree in order to use our services."
      },
      "account[tos]": {
          required: "You will need to agree in order to use our services."
      },
      "user[email]": "Please enter a valid email address."
    }
  };

  if (ignoreSuccess === true) {
    delete validatorOpts.success;
  }

  if (ignoreMessages === true) {
    validatorOpts.errorPlacement = noop;
  } else {
    validatorOpts.errorPlacement = function (error, element) {
      var name = element.attr("name");

       if (name === "account[tos]" || name === "tos2") {
        error.insertAfter(element.parent());
       } else {
        error.insertAfter(element);
       }
    };
  }

  sub_validator = $("#subscribe_form").validate(validatorOpts);
  window.sub_validator = sub_validator;

  var beforeUnload = function () {

    var $subscribeBounceTB = $("#subscribe_bounce_text"),
        text = null,
        bounceRedirect = null;

    if ($subscribeBounceTB.length > 0) {
      text = $subscribeBounceTB.text();
      bounceRedirect = $subscribeBounceTB.data('sub-bounce-url');
    }

    redirectTo = bounceRedirect || "https://www.beenverified.com/subscribe/view_report_trial";

    window.setTimeout(function () {
      window.onbeforeunload = noop;
      window.setTimeout(function () {
        window.location = redirectTo;
      }, 500);
    }, 5);

    return text || 'WAIT: WANT UNLIMITED REPORTS FOR JUST A DOLLAR?\n\n>>>> SPECIAL LIMITED TIME OFFER! <<<<\n\nStay on this page to take advantage of our special promotional offer - a 5-day trial membership for just ONE DOLLAR!\n\nYou run unlimited background reports for the trial period! Don\'t miss out on this very special offer!\n\nJust click \"Cancel\" or \"Stay On Page\" to sign up for a trial membership.';
  };

  var initBoundDialog = function () {
    window.onbeforeunload = beforeUnload;
  };

  $("#subscribe_form").on('change', function (evt) {
    if (evt.target.name === "credit_card[card_number]") {
      window.onbeforeunload = noop;
    }
  });

  $("body").on('submit', "#subscribe_form", function (evt) {
    evt.preventDefault();
    if (sub_validator.form()) {
      var $form = $(this);
      if (typeof(processTokenizedForm) != "undefined") {
        processTokenizedForm(form);
      } else {
        $('input[type=submit]', $form).attr('disabled', 'disabled');
        $('input[type=image]', $form).attr('disabled', 'disabled');
        handleFormSubmit($form[0]);
      }
    }
  });

  /* Form is submitted over ajax, so we stop submission of the form. */
  $subscribe_form.on('submit', function (evt) {
    evt.preventDefault();
    if (heap && heap.track) {
      if (sub_validator && sub_validator.errorMap && !_.isEmpty(sub_validator.errorMap)) {
        var errorsList = JSON.stringify(sub_validator.errorMap);
        heap.track("Validation Errors - Client", {data: errorsList});
      }
    }
  });

  /* Make sure to change that checkbox value, so it plays nice with rails. */
  $("[name=tos2]").on('change', function () {
    this.value = (this.checked) ? 1 : 0;
  });

  $("[name=account\\[tos\\]]").on('change', function () {
    this.value = (this.checked) ? 1 : 0;
  });

  var $tos = $("#subscribe_form input[name=account\\[tos\\]]"),
      $tos2 = $("#subscribe_form input[name=tos2]");

  var checkValidity = function () {
    $(this).valid();
  };

  $tos.on("change", checkValidity);
  $tos2.on("change", checkValidity);

  $tos.parent().on('click', function (evt) {
    $tos.valid();
  });

  $tos2.parent().on('click', function (evt) {
    $tos2.valid();
  });

  var initialize = function () {
    setCCMonthYear();
//    initBoundDialog();
  };

  initialize();
}());
