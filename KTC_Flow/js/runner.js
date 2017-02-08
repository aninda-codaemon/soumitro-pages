;(function ($) {
  var trackNL = function (evtName, props) {
    if (typeof nolimit !== 'undefined' && nolimit.track) {
      if (props) {
        nolimit.track(evtName, props);
      } else {
        nolimit.track(evtName);
      }
    }
    if (typeof heap !== 'undefined' && heap.track) {
      if (props) {
        heap.track(evtName, props);
      } else {
        heap.track(evtName);
      }
    }
  };


  // set column state for mobile teaser data

  var setColumnState = function() {
    var teaserPreview = $('.mobile-subject-teaser .teaser-preview');

    if (teaserPreview.length === 1) {
      teaserPreview.css('width', '100%');
    }
  };

  // Set current year inside footer
  ;(function ($) {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');

    $currentYear.html(currentYear);
  }(jQuery));


  var $bounceBackBtn = $('#iModal-back'),
      $bounceExitBtn = $('#iModal-exit'),
      $goToNextPage  = $('#show-dollar-trial'),
      $iOSModal      = $('#iModal'),
      $iOSModalTrial = $('#iModal-trial'),
      $iModalX       = $("#imodal-x");

  var bounceBack = function () {
    trackNL('onBack Modal - Rejected');
    //window.location.href = $("body").data("search-page");
  };

  var bounceExit = function () {
    $iOSModal.modal('hide');
    window.setTimeout(function () {
        $iOSModalTrial.modal('show');
    }, 300);
  };

  $bounceBackBtn.on('click' , bounceBack);
  $bounceExitBtn.on('click' , bounceExit);
  $goToNextPage.on('click', function () {
    trackNL('onBack Modal - Accepted');
    window.location.href = $("body").data("next-page");
  });

  $iModalX.on('click', function() {
    trackNL('onBack Modal - Exited');
  });


  var setLastVisit = function() {
    Cookie.create("lastVisit", Date.now(), 30);
    trackNL('lastVisit Cookie Set');
    //amplify.store("lastVisit", Date.now());
  }

  // Form Validations


  $peopleSearchForm = $('#people_search');
  $phoneSearchForm = $('#phone_search');
  $emailSearchForm = $('#email_search');
  $propertySearchForm = $('#property_search');
  $companyForm = $('#company-form');


  $peopleSearchForm.validate({

    rules: {
      fn: "required",
      ln: "required"
    },
    messages: {
      fn: "Please enter a first name",
      ln: "Please enter a last name"
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      hideSearches();
    }
  });

  var hideSearches = function() {
    $('article.contact-panel').hide();
    startLoading();
  }

  $.validator.addMethod("phoneUS", function (phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
    }, "Please specify a valid phone number");

  $phoneSearchForm.validate({
    validClass: "success",

    rules: {
      "phone": {
        required: true,
        phoneUS: true
      }
    },
    messages: {
      phone: "Please enter a phone number. e.g., (212) 555-6789"
    },

    submitHandler: function(form, e) {
      e.preventDefault();
      hideSearches();
    }
  });

  $emailSearchForm.validate({

      rules: {
        "email": {
          required: true,
          email: true
        },
      },
      messages: {
        "email": "Please enter an Email Address"
      },

      submitHandler: function(form, e) {
        e.preventDefault();
        hideSearches();
      }
    });

  $propertySearchForm.validate({
    rules: {
      address: "required"
    },
    messages: {
      address: "Please enter an address"
    },
    submitHandler: function(form, e){
      e.preventDefault();
      hideSearches();
    }
  });

  $companyForm.validate({
    rules: {
      company_select: "required"
    },
    messages: {
      company_select: "Please select your company's size"
    },
    submitHandler: function(form, e) {
      e.preventDefault()
      amplify.store("userData", {
        
      })
    }
  })

  //Transition to search animation

var startLoading = function() {

}

  // Set the content to show based on the price tag from the URL


  var initialize = function () {
    setLastVisit();
    setColumnState();
    $('#company-modal').modal('show');

  /* initDownsells(); */

  };

  initialize();

}(jQuery));
