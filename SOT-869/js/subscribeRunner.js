/* NOTE: Updated specifically to point to v4/accounts (freshness) */
/* NOTE: Verifi is disabled for this PayPal test. */
window.BV_KILL_VERIFI = true;

/*!
 * Subscribe.js - Supports signups via Verifi, Paypal with configurable fallback to
 * the original BV signup process.
 * Deps: jQuery, _, jQuery.validate, jquery.validate.creditcard2.pack
 */

// BV_KILL_VERIFI = true
// BV_SIGNUP_REDIRECT_URL = '/accounts/creating_account'
// BV_ENDPOINT_URL = '/accounts.json'
// BV_VERIFI_ENDPOINT = 'https://secure.verifi.com/api/v2/three-step/'
// BV_VERIFI_STEP_2_TIMEOUT = 60000
// BV_ENDPOINT_STEP1 = '/internal/api/signup_preflight.json'
// BV_ENDPOINT_STEP3 =  '/accounts.json'
// BV_PAYPAL_PREFLIGHT_URL
// BV_PAYPAL_ENDPOINT_URL

/**
 * Reporters - @public
 * Registered functions are expected to have an arity of 2.
 * e.g: trackingFn(eventType<string>, eventProps<object>)
 */
;
(function(w) {
  if (typeof w.BvEventReporters === 'undefined') {
    w.BvEventReporters = {};
    w.BvEventReporters.trackers = {};
  }

  if (typeof heap !== 'undefined' && typeof heap.track === 'function') {
    w.BvEventReporters.trackers.heap = "track";
  }

  if (typeof nolimit !== 'undefined' && typeof nolimit.track === 'function') {
    w.BvEventReporters.trackers.nolimit = 'track';
  }
}(window));

/**
 * BvEventReporters - @private
 */
;
(function(w) {

  if (typeof w.BvEventReporters === 'undefined') {
    w.BvEventReporters = {};
  }

  w.BvEventReporters.report = function BvEventReporter(eventType, eventProps) {
    try {
      for (var k in w.BvEventReporters.trackers) {
        var fn = w.BvEventReporters.trackers[k];
        if (typeof fn === 'function') {
          fn(eventType, eventProps);
        } else if (typeof fn === 'string') {
          if (typeof w[k] !== 'undefined' && typeof w[k][fn] === 'function') {
            try {
              w[k][fn](eventType, eventProps);
            } catch (e) {}
          }
        }
      }
    } catch (err) {}
  };
}(window));

/**
 * VerifiPaymentProcessor - @private
 */
;
(function(w, $) {
  var VERIFI_ENDPOINT = w.BV_VERIFI_ENDPOINT || 'https://secure.verifi.com/api/v2/three-step/',
    BV_ENDPOINT_STEP_1 = w.BV_ENDPOINT_STEP1 || '/internal/api/signup_preflight.json',
    BV_ENDPOINT_STEP_3 = w.BV_ENDPOINT_STEP3 || '/api/v4/account.json',
    STEP_2_TIMEOUT = w.BV_VERIFI_STEP_2_TIMEOUT || (60 * 1000),
    REDIRECT_IDENTIFIER = 'beenverified.com';

  /**
   * Sends cc info directly to Verifi via iframe injection.
   * The path of execution is as follows:
   * 1. An iframe is created and appended to the body.
   * 2. A form is injected into the iframe and submitted using the DOM.
   * 3. The window is watched until a redirect is detected.
   * 4. The token is parsed.
   * Note: The process times out after 5 seconds and a failure is assumed.
   */
  var postToVerifi = function(formUrl) {
    var def = new $.Deferred();
    if (!formUrl) {
      def.reject(['Missing form URL']);
      return def.promise();
    }

    var $iframe = $('<iframe>');
    $iframe.attr('id', 'verifi-frame');
    $iframe.prop('src');
    $iframe.css('display', 'none');
    $('body').append($iframe);

    var $formContent = $('<div>'),
      $form = $('<form>');

    $form.attr('id', 'verifi-form');
    $form.attr('method', 'POST');
    $form.attr('action', formUrl);

    var yr = $('#credit_card_expiration_date_1i').val();
    yr = yr.substr(2);

    var ccNum = $('#credit_card_card_number').val();

    var exp = $('#credit_card_expiration_date_2i').val() + yr;
    if (exp && exp[0] != '0') {
      exp = '0' + exp;
    }
    var cvv = $('#cvv2').val();

    $form.append($('<input>').attr('type', 'text').attr('name', 'billing-cc-number').attr('value', ccNum));
    $form.append($('<input>').attr('type', 'text').attr('name', 'billing-cc-exp').attr('value', exp));
    $form.append($('<input>').attr('type', 'text').attr('name', 'billing-cvv').attr('value', cvv));

    $formContent.html($form);


    var timeoutId = w.setTimeout(function() {
      if (typeof w.BvEventReporters !== 'undefined') {
        w.BvEventReporters.report('Verifi Step2 timed out');
      }
      $iframe.remove();
      def.reject(['Sorry, payment processing timed out. Please try again.']);
    }, STEP_2_TIMEOUT);


    $iframe.on('load', function(evt) {
      try {
        var url = $iframe.get()[0].contentWindow.location.href;
        if (url.indexOf(REDIRECT_IDENTIFIER) > -1) {
          w.clearTimeout(timeoutId);
          def.resolve(url);
          $iframe.remove();
        }
      } catch (err) {
        if (typeof w.BvEventReporters !== 'undefined') {
          w.BvEventReporters.report('Verifi Step 2 Error', err.message);
        }
        def.reject([err.message]);
        $iframe.remove();
      }
    });

    $('#verifi-frame').get()[0].contentWindow.document.write($formContent.html());
    $('#verifi-frame').get()[0].contentWindow.document.getElementById('verifi-form').submit();

    return def.promise();
  };

  var parseVerifiToken = function(url) {
    if (!url) return '';
    var splits = url.split('?'),
      queryString = (splits.length > 1) ? splits[1] : '';
    var kvs = queryString.split('&'),
      kvsLen = kvs.length,
      kvsParts;
    if (kvsLen > 0) {
      for (var i = 0; i < kvsLen; i += 1) {
        kvsParts = kvs[i].split('=');
        if (kvsParts.length > 1) {
          if (typeof kvsParts[0] === 'string') {
            if (kvsParts[0].indexOf('token-id') > -1) {
              return kvsParts[1];
            }
          }
        }
      }
    }
    return '';
  };

  var excludeCreditCardInfo = function(formData) {
    formData.initialize_verifi = true;
    var customerInfo = '';
    for (var k in formData) {
      var val = formData[k];
      if (k.indexOf('credit_card') === -1) {
        customerInfo += (k + '=' + w.encodeURIComponent(val));
        customerInfo += '&';
      }
    }
    return customerInfo;
  };

  var maskCreditCardNumber = function(ccNumber) {
    if (typeof ccNumber !== "string") {
      ccNumber = ccNumber.toString();
    }
    var masked = '',
      x = 'X',
      prefixVals = 6,
      suffixVals = ccNumber.length - 4,
      len = ccNumber.length;

    if (len < 13) {
      for (var i = 0; i < len; i += 1) {
        masked += x;
      }
      return masked;
    }

    for (var i = 0; i < len; i += 1) {
      if (i >= prefixVals && i < suffixVals) {
        masked += x
      } else {
        masked += ccNumber[i];
      }
    }
    return masked;
  };

  var VerifiPaymentProcessor = function() {};

  VerifiPaymentProcessor.prototype.step1 = function step1(formData) {
    var customerInfo = excludeCreditCardInfo(formData);
    return $.post(BV_ENDPOINT_STEP_1, customerInfo);
  };

  VerifiPaymentProcessor.prototype.step2 = function step2(formUrl) {
    return postToVerifi(formUrl);
  };

  VerifiPaymentProcessor.prototype.step3 = function step3(formData, tokenId) {
    // delete formData['credit_card[verification_number]'];
    delete formData['initialize_verifi'];
    formData['credit_card[card_number]'] = maskCreditCardNumber(formData['credit_card[card_number]']);
    formData['credit_card[initial_token]'] = tokenId;
    var d = [];
    for (var k in formData) {
      d.push(k + '=' + w.encodeURIComponent(formData[k]));
    }
    return $.post(BV_ENDPOINT_STEP_3, d.join('&'));
  };

  VerifiPaymentProcessor.prototype.process = function process(formData) {
    var self = this,
      def = new $.Deferred(),
      token;

    var handleStepError = function(error) {
      def.reject(error);
    };

    var handleStep3Error = function(error) {
      if (error && error.responseText) {
        // Note: This works for jQuery 1.9 and below. Otherwise expect an error.
        var resp = $.parseJSON(error.responseText);
        if (resp && resp.results && resp.results.errors) {
          def.reject(resp.results.errors);
          return
        }
      }
      def.reject(['Sorry, there was an error processing your payment. Please verify your information and try again.']);
    };

    var step1 = self.step1,
      step2 = self.step2,
      step3 = self.step3;

    step1(formData).then(function(d1) {
      if (typeof d1.valid_for_signup !== 'undefined' && d1.valid_for_signup === false) {
        def.reject(d1.errors.user);
        return;
      }

      var formURL = d1.form_url;

      step2(formURL).then(function(redirectURL) {

        var token = parseVerifiToken(redirectURL);

        step3(formData, token).then(function(d3) {
          def.resolve(d3);
        }, handleStep3Error);

      }, handleStepError);

    }, handleStepError);

    return def.promise();
  };

  w.VerifiPaymentProcessor = VerifiPaymentProcessor;
}(window, jQuery));

/**
 * Helper to get query param values by name
 */
var BVGetQueryVariable = function(variable) {
  var query = window.location.search.substring(1),
    vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};

/**
 * PaypalPaymentProcessor
 * Related query args:
 * bvpp - when present, indicates a paypal redirect
 * bvppcanc - when present, it implies that a paypal error ocurred.
 */
;
(function(w, $, _) {

  var BV_PAYPAL_PREFLIGHT_URL = w.BV_PAYPAL_PREFLIGHT_URL || '/internal/api/signup_preflight.json',
    BV_ENDPOINT = w.BV_PAYPAL_ENDPOINT_URL || '/api/v4/account.json';

  var excludeCreditCardInfo = function(formData) {
    var customerInfo = '';
    for (var k in formData) {
      var val = formData[k];
      if (k.indexOf('credit_card') === -1 && k.indexOf('zip') === -1) {
        customerInfo += (k + '=' + w.encodeURIComponent(val));
        customerInfo += '&';
      }
    }
    return customerInfo;
  };

  /**
   * Initiates a preflight request to BV's server. If the request is successful,
   * then an URL containing a PayPal token will be sent in the response. A successful
   * request results in users being forwarded to PayPal via window.location.
   * Failed requests are reported via paymentProcessingDef.reject(), where paymentProcessingDef
   * is an instance of jQuery.Deferred().
   */
  var processPaypalPreflight = function(formData, paymentProcessingDef) {
    amplify.store('paypal_lead', formData);

    var preflightXHR = $.post(BV_PAYPAL_PREFLIGHT_URL, excludeCreditCardInfo(formData));

    preflightXHR.done(function paypalPreflightDoneHandler(d) {
      w.BvEventReporters.report("Pre-flight Success", {
        payment_method: 'paypal'
      });
      if (typeof d.valid_for_signup !== 'undefined' && d.valid_for_signup === false) {
        if (d.errors && d.errors instanceof Array) {
          paymentProcessingDef.reject(d.errors);
        } else if (d.errors && d.errors.user instanceof Array) {
          paymentProcessingDef.reject(d.errors.user);
        } else {
          paymentProcessingDef.reject(['An error has happened. Please, try again.']);
        }
      } else {
        window.onbeforeunload = function() {};
        window.location = d.form_url;
      }
    });

    preflightXHR.fail(function paypalPreflightErrorHandler(resp) {
      w.BvEventReporters.report("Pre-flight Failed", {
        payment_method: 'paypal'
      });
      paymentProcessingDef.reject(resp.errors);
    });
  };

  /**
   * Completes a PayPal transaction
   */
  var processPaypalConfirmation = function(formData, paymentProcessingDef) {

    // Get the token and payerId from paypal's redirect.
    formData.paypal_token = BVGetQueryVariable('token');
    formData.paypal_payer_id = BVGetQueryVariable('PayerID');

    if (!formData.paypal_token || !formData.paypal_payer_id) {
      w.BvEventReporters.report("Paypal Confirmation Failed - Missing Token or PayerID");
      paymentProcessingDef.reject(['Sorry, your PayPal transaction failed. Please try again or contact customer support for assistance.']);
    }

    var confirmation = $.post(BV_ENDPOINT, formData);

    confirmation.done(function() {
      // amplify.store('paypal_lead', null);
      paymentProcessingDef.resolve();
    });

    confirmation.fail(function(resp) {
      w.BvEventReporters.report("Paypal Confirmation Failed", {
        data: resp
      });
      var d = JSON.parse(resp.responseText);
      if (d.errors && d.errors instanceof Array) {
        paymentProcessingDef.reject(d.errors);
      } else if (d.errors && d.errors.user instanceof Array) {
        paymentProcessingDef.reject(d.errors.user);
      } else {
        paymentProcessingDef.reject(['An error has happened. Please, try again.']);
      }
    });
  };

  var PaypalPaymentProcessor = function() {};

  PaypalPaymentProcessor.prototype.process = function process(formData) {
    var def = new $.Deferred();

    if (!BVGetQueryVariable("bvpp") || window.PaypalPaymentProcessorRetry === true) {
      processPaypalPreflight(formData, def);
    } else {
      processPaypalConfirmation(formData, def);
    }

    return def.promise();
  };

  w.PaypalPaymentProcessor = PaypalPaymentProcessor;
}(window, jQuery, _));

/**
 * BvPaymentProcessor
 */
;
(function(w, $, _) {

  var BV_ENDPOINT = w.BV_ENDPOINT_URL || 'https://www.beenverified.com/api/v4/account.json';

  var BvPaymentProcessor = function() {};

  BvPaymentProcessor.prototype.process = function process(formData) {
    var def = new $.Deferred();
    var formXHR = $.post(BV_ENDPOINT, formData);

    formXHR.success(function() {
      def.resolve();
      w.BvEventReporters.report("Processing Success", {
        payment_method: 'bv_credit'
      });
    });

    formXHR.fail(function failedXHR(jqXHR, textStatus, errorThrown) {

      var data;
      try {
        data = $.parseJSON(jqXHR.responseText);
      } catch (err) {
        w.BvEventReporters.report("BVPaymentProcessor - Failed to parse responseText", {
          data: jqXHR.responseText
        });
        def.reject(['Sorry, something went wrong. Please contact customer support or try again.']);
        return;
      }

      if (data && data.account && data.account.errors) {
        w.BvEventReporters.report("Processing Failed", {
          payment_method: 'bv_credit',
          data: data.account.errors
        });

        var errors = _.reduce(data.account.errors, function(e, group, group_name) {
          e = e.concat(group);
          return e;
        }, []);

        errors = _.reject(errors, function(e) {
          return e === "Credit cards is invalid";
        });

        def.reject(errors);
      } else {
        w.BvEventReporters.report("Processing Failed", {
          payment_method: 'bv_credit'
        });
      }
    });

    return def.promise();
  };

  w.BvPaymentProcessor = BvPaymentProcessor;
}(window, jQuery, _));

/**
 * CheckCC - Checks a given string for a valid credit card (Vendored JS)
 * @returns:
 *   -1  invalid
 *       1       mastercard
 *       2       visa
 *       3       amex
 *       4       diners club
 *       5       discover
 *       6       enRoute
 *       7       jcb
 */
! function(a) {
  a.checkCC = function(a) {
    String.prototype.startsWith = function(a) {
      return this.match("^" + a) == a
    }, Array.prototype.has = function(a, b) {
      for (var c = 0; c < this.length; c++)
        if (this[c] == a) return b ? c : !0;
      return !1
    }, a = a.replace(/[^0-9]/g, "");
    for (var b = [], c = 0, d = 0, e = a; 0 !== e;) b[c] = e % 10, e -= b[c], e /= 10, c++, d++;
    if (13 > d) return "invalid";
    var f = "invalid";
    if (a.startsWith("5")) {
      if (16 != d) return "invalid";
      f = 1
    } else if (a.startsWith("4")) {
      if (16 != d && 13 != d) return "invalid";
      f = 2
    } else if (a.startsWith("34") || a.startsWith("37")) {
      if (15 != d) return "invalid";
      f = 3
    } else if (a.startsWith("36") || a.startsWith("38") || a.startsWith("300") || a.startsWith("301") || a.startsWith("302") || a.startsWith("303") || a.startsWith("304") || a.startsWith("305")) {
      if (14 != d) return "invalid";
      f = 4
    } else if (a.startsWith("6011")) {
      if (15 != d && 16 != d) return "invalid";
      f = 5
    } else {
      if (a.startsWith("2014") || a.startsWith("2149")) return 15 != d && 16 != d ? "invalid" : 6;
      if (a.startsWith("3")) {
        if (16 != d) return "invalid";
        f = 7
      } else {
        if (!a.startsWith("2131") && !a.startsWith("1800")) return "invalid";
        if (15 != d) return "invalid";
        f = 7
      }
    }
    var h, g = 0;
    for (h = 1; d > h; h += 2) {
      var i = 2 * b[h];
      g += i % 10, g += (i - i % 10) / 10
    }
    for (h = 0; d > h; h += 2) g += b[h];
    return 0 !== g % 10 ? "invalid" : (return_vals = {
      "-1": "invalid",
      1: "master",
      2: "Visa",
      3: "american_express",
      4: "invalid",
      5: "Discover",
      6: "invalid",
      7: "invalid"
    }, return_vals["" + f])
  }
}(this);

/**
 * FormValidator - Should return append to window.BvValidateSubForm which
 * should return a validator object, containing a .form() method.
 * .form() should return a boolean representing success/failure of validation.
 */
;
(function(w, $) {
  // Helpers
  var today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth() + 1;

  var noop = function() {};

  var checkCardType = function() {
    var card_number = $('#credit_card_card_number').val();
    return checkCC(card_number);
  };

  var validatorRules = {
    "account[first_name]": "required",
    "account[last_name]": "required",
    "user[email]": {
      required: true,
      email: true
    },
    tos2: {
      required: true
    },
    'account[tos]': {
      required: true
    },
    "credit_card[expiration_date(2i)]": {
      validMonth: true
    },
    "credit_card[expiration_date(1i)]": {
      validYear: true
    },
    // "address[address1]": "required",
    // "address[city]": "required",
    "address[zip]": {
      maxlength: 5,
      minlength: 5,
      digits: true,
      required: true
    },
    // "account[phone_number]": "required",
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
  };

  /**
   * Applies the validation rules using jQuery.validate(). - @private
   */
  var applyValidation = function(formSelector) {

    var $subscribeForm = $(formSelector);

    /**
     * Validation using $.validate() plugin.
     */

    var $month = $("[name=credit_card\\[expiration_date\\(2i\\)\\]]"),
      $year = $("[name=credit_card\\[expiration_date\\(1i\\)\\]]"),
      successURL = $subscribeForm.data('sub-success-image'),
      errorClass = $subscribeForm.data('sub-error-class'),
      successClass = $subscribeForm.data('sub-success-class'),
      ignoreMessages = $subscribeForm.data('sub-ignore-messages'),
      ignoreSuccess = $subscribeForm.data('sub-ignore-success');

    // Custom validation rules.

    var validMonthYear = function() {
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

    var validCVV = function() {
      var valid = true,
        cardType = checkCardType(),
        cvv = $("#cvv2").val();
      if (cardType === "american_express") {
        valid = cvv && cvv.length === 4;
      } else {
        valid = cvv && cvv.length === 3;
      }
      return valid;
    };

    // Register custom validation methods.
    $.validator.addMethod('validCVV', validCVV, 'Enter a valid card verification number');
    $.validator.addMethod('validMonth', validMonthYear, ' ');
    $.validator.addMethod('validYear', validMonthYear, 'Please enter a valid expiration date.');

    // Validate dates on change.
    $month.on('change', function() {
      $year.valid();
      $(this).valid();
    });
    $year.on('change', function() {
      $month.valid();
      $(this).valid();
    });

    // Validation rules.
    var validatorOpts = {
      rules: validatorRules,

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

      highlight: function(input) {
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

      unhighlight: function(input) {
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

      invalidHandler: function(evt, validator) {},

      messages: {
        "account[first_name]": "Please enter your first name.",
        "account[last_name]": "Please enter your last name.",
        "account[tos]": "Please accept the terms before continuing.",
        "credit_card[first_name]": "Please enter your first name.",
        "credit_card[last_name]": "Please enter your Last name.",
        "address[address1]": "Please enter the credit card billing address.",
        "address[city]": "Please enter the city associated with your credit card.",
        "address[zip]": "Please enter the zip code associated with your credit card.",
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
        tos2: {
          required: "You will need to agree in order to use our services."
        },
        "user[email]": "Please enter a valid email address."
      }
    };

    // Custom behavior set via data attributes on the form.
    if (ignoreSuccess === true) {
      delete validatorOpts.success;
    }

    if (ignoreMessages === true) {
      validatorOpts.errorPlacement = noop;
    } else {
      validatorOpts.errorPlacement = function(error, element) {
        var name = element.attr("name");

        if (name === "account[tos]" || name === "tos2") {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      };
    }

    // Apply the validation rules. Return reference to the validator.
    return $("#subscribe_form").validate(validatorOpts);
  }; // End - applyValidation()

  /**
   * Helpers
   */
  var setCCMonthYear = function() {
    var $month = $("#credit_card_expiration_date_2i"),
      $year = $("#credit_card_expiration_date_1i");
    $month.val(month);
    $year.val(year);
  };

  w.BvValidateSubForm = function(formSelector) {
    setCCMonthYear();
    return applyValidation(formSelector);
  };

  function escapeStr(str) {
    if (str)
      return str.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
    return str;
  }

  w.BvValidateSubForm.disableAllValidation = function() {
    for (var item in validatorRules) {
      var selectorName = '[name=' + escapeStr(item) + ']';
      $(selectorName).rules('remove');
    }
  };

  w.BvValidateSubForm.enableAllValidation = function() {
    for (var item in validatorRules) {
      var selectorName = '[name=' + escapeStr(item) + ']';
      $(selectorName).rules('add', validatorRules[item]);
    }
  };

  w.BvValidateSubForm.enablePaypalValidation = function() {
    $('[name=account\\[first_name\\]]').rules('add', validatorRules['account[first_name]']);
    $('[name=account\\[last_name\\]]').rules('add', validatorRules['account[last_name]']);
    $('[name=user\\[email\\]]').rules('add', validatorRules['user[email]']);
    $('[name=account\\[tos\\]]').rules('add', validatorRules['account[tos]']);
  };

}(window, jQuery));

/**
 * FormView - Apply form validation, submissions, and processing.
 */
;
(function(w, $) {

  var SIGNUP_REDIRECT_URL = w.BV_SIGNUP_REDIRECT_URL || '//www.beenverified.com/accounts/creating_account',
    formSelector = '#subscribe_form';

  var noop = function() {};

  var disableForm = function() {
    $('#create_button').attr('disabled', 'disabled');
    $('#create_button').hide();
    $('#spinner').show();
    $('#spinner').removeClass('hidden');
    // $("#processing-payment").modal('show');
  };

  var enableForm = function() {
    $('#create_button').removeAttr('disabled');
    $('#create_button').show();
    $('#spinner').hide();
  };

  var handleProcessingSuccess = function() {
    if (typeof w.BvEventReporters !== 'undefined') {
      var selectedPlan = $(".plan_name_radio:checked").val(),
        payment_method = $("[name=payment_method]:checked").val();
      w.BvEventReporters.report("Successful Signup", {
        plan_selected: selectedPlan,
        payment_method: payment_method
      });
    }
    window.onbeforeunload = noop;
    window.setTimeout(function() {
      window.location = SIGNUP_REDIRECT_URL;
    }, 1000);
  };

  var handleProcessingError = function(errors) {
    var $errorContainer = $('#error_container'),
      $errorMessages = $('#messages'),
      errorLen = 0,
      i = 0;

    if ((errors instanceof Array) == false) {
      errors = ['Oops! Something went wrong. Please contact customer support at 1-888-579-5910 or try your payment again.'];
    }

    errorLen = errors.length;

    $errorMessages.html('');

    for (i; i < errorLen; i += 1) {
      var $li = $("<li>");
      $li.html(errors[i]);
      $errorMessages.append($li);
    }

    $errorContainer.fadeIn();

    $("#error_container").removeClass("hidden");
    $('html, body').animate({
      scrollTop: $("#error_container").offset().top
    }, 500);

    w.BvEventReporters.report("Failed Signup", {
      data: errors
    });
  };

  /**
   * Takes action based on the promised result of the processing param.
   * E.g: If processing fails, presents user with error messages.
   *      Or, if processing is successful, directs user to the backend.
   * Essentially, bridges the gap between view and business logic.
   */
  var handlePaymentProcessing = function(processing) {

    disableForm();

    processing.done(function() {
      handleProcessingSuccess();
    });

    processing.fail(function(err) {
      handleProcessingError(err);
    });

    processing.always(function() {
      enableForm();
    });
  };

  /**
   * Helpers
   */

  /**
   * Serialize a form to a plain object. e.g: {name: value}
   */
  var serializeToObject = function(serializedArray) {
    if (!serializedArray) return {};
    var i = 0,
      o = {},
      len = serializedArray.length;
    for (i; i < len; i += 1) {
      o[serializedArray[i].name] = serializedArray[i].value;
    }
    return o;
  };

  /**
   * Entrypoint.
   */
  var initialize = function() {

    var subValidator = w.BvValidateSubForm(formSelector),
      paymentProcessor = new VerifiPaymentProcessor(),
      isPaypalSelected = false;

    window.subValidator = subValidator; // TODO Remove

    /* Make sure the first plan is selected - IE10 fix. */
    var $planRows = $("input[name=subscription_plan_name]");
    if ($planRows.length > 0) {
      $planRows[0].click();
      $($planRows[0]).prop('checked', true);
    }

    var originalButtonText = $('#create_button').html();

    $('#paypal-radio').on('click', function() {
      isPaypalSelected = true;
      $(this).find('input[type=radio]').prop('checked', true);
      w.BvValidateSubForm.disableAllValidation();
      w.BvValidateSubForm.enablePaypalValidation();
      paymentProcessor = new PaypalPaymentProcessor();
      $('.cc-wrapper').hide();
      $('#create_button').html('Proceed to PayPal');
    });

    $('#credit-radio').on('click', function() {
      isPaypalSelected = false;
      $(this).find('input[type=radio]').prop('checked', true);
      w.BvValidateSubForm.enableAllValidation();
      paymentProcessor = new VerifiPaymentProcessor();
      $('.cc-wrapper').fadeIn(500);
      $('#create_button').html(originalButtonText);
    });

    if (BVGetQueryVariable("bvpp")) {

      // Populate the form
      var paypalData = amplify.store('paypal_lead');

      if (paypalData) {
        $("#account_first_name").val(paypalData['account[first_name]']);
        $("#account_last_name").val(paypalData['account[last_name]']);
        $("#user_email").val(paypalData['user[email]']);
        $("#account_tos").prop('checked', true);

        var planSelector = "input[value='" + paypalData['subscription_plan_name'] + "']",
          $planSelector = $(planSelector);
        $planSelector.prop('checked', true);
        $('.selection-wrap').removeClass('selection-selected');
        $planSelector.closest('.selection-wrap').addClass('selection-selected');
      }

      paymentProcessor = new PaypalPaymentProcessor();

      $('#paypal-radio').click();

      if (!BVGetQueryVariable("bvppcanc")) { // coerce
        $("#PayPal-Success").modal({
          backdrop: 'static',
          show: true
        });
        // $('#create_button').html('Confirm your Payment');

        $('#iModal-dismiss').on('click', function(evt) {
          evt.preventDefault();
          $("#PayPal-Success").modal('hide');
          window.PaypalPaymentProcessorRetry = true;
        });
        w.BvEventReporters.report("Paypal Payment Confirmation - Viewed");
      } else { // User canceled the paypal payment.
        window.PaypalPaymentProcessorRetry = true;
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        window.setTimeout(function() {
          $("#ppCanceled").fadeIn();
          window.setTimeout(function() {
            $("#ppCanceled").fadeOut();
          }, 10 * 1000);
        }, 800);
        w.BvEventReporters.report("Paypal Payment Canceled");
      }
    }

    var userConfirmedPaypal = false,
      $paypalConfirmSubText = $('#paypal-confirm-sub-text');

    $('#confirm-paypal').on('click', function(evt) {
      evt.preventDefault();

      if (userConfirmedPaypal) {
        return;
      }

      var formData = serializeToObject($(formSelector).serializeArray()),
        payment = paymentProcessor.process(formData),
        confirmButton = this;

      // Set the click state
      userConfirmedPaypal = true;
      $paypalConfirmSubText.text('Please wait while we create your account. This may take a few minutes.');


      $('#iModal-dismiss').fadeOut();
      $(confirmButton).fadeOut();
      $('#paypal-spinner').fadeIn();

      payment.fail(function() {
        $('#paypal-spinner').fadeOut();
        $(confirmButton).fadeIn();
        $('#iModal-dismiss').fadeIn();
        $('#paypal-confirm-error').fadeIn();
        w.BvEventReporters.report("Paypal Payment Confirmation - Confirmed - Failed");
      });
      handlePaymentProcessing(payment);
      payment.always(function() {
        userConfirmedPaypal = false;
        $paypalConfirmSubText.text('Just click the confirm button below to activate and view your report.');
      });
      w.BvEventReporters.report("Paypal Payment Confirmation - Confirmed");
    });


    $('body').on('submit', formSelector, function(evt) {
      evt.preventDefault();

      // Check if we need to fallback to BV handling the payment processing.
      if (!isPaypalSelected && typeof w.BV_KILL_VERIFI !== 'undefined' && w.BV_KILL_VERIFI === true) {
        paymentProcessor = new BvPaymentProcessor();
      }

      var validated = subValidator.form();
      if (!validated) return;

      if (typeof w.BvEventReporters !== 'undefined') {
        w.BvEventReporters.report("Signup Form Submitted");
      }

      var formData = serializeToObject($(this).serializeArray()),
        payment = paymentProcessor.process(formData);

      handlePaymentProcessing(payment);
    });
  };

  initialize();
}(window, jQuery));
