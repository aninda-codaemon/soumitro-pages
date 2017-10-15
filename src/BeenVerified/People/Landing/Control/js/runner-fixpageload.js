(function () {

  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        this.versionSearchString = data[i].subString;

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }

      var rv = dataString.indexOf("rv:");
      if (this.versionSearchString === "Trident" && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3));
      } else {
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }
    },

    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Edge",
        identity: "MS Edge"
      },
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
      },
      {
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
      },
      {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
      }
        ]
  };

  var REQUEST_DELAY = 300; // ms

  var $headerSearchPeople = $('#header-search-people'),
    $headerSearchPhone = $('#header-search-phone'),
    $headerSearchEmail = $('#header-search-email'),
    $headerSearchProperty = $('#header-search-property'),
    $addressField = $('#fullAddress');

  //Ticker Counter
  $.ajax({
    url: "https://www.beenverified.com/stats/report_count.json",
    dataType: 'json',
    success: function (data) {
      jCounter({
        startCount: data.startCount,
        slope: data.slope,
        afterUpdateCallback: function (currentCount) {

          count = currentCount + '';
          count_items = count.padWithZeros(8).split("");

          for (i = 0; i < count_items.length; i++) {
            $("#tick_" + i).html(count_items[i]);
          }
        }
      }).countIt();

      // Remove 'hide' class when counter is populated and ready to render
      $('#counter').removeClass('hide');
    }
  });

  //Search carousel selector
  $('.home-carousel-indicator').on('click', function () {
    $('.home-carousel-indicator').removeClass('active');
    $(this).addClass('active');
  });

  //checks validation of checkmark after input focus lost
  var $firstNameInput = $('#fn');
  var $lastNameInput = $('#ln');
  var checkRemover = function(inputField) {
    if (inputField.val() === '' && inputField.hasClass('success')) {
      inputField.removeClass('success');
    }
  }
  $firstNameInput.on('change', function() {
    checkRemover($firstNameInput)
  })
  $lastNameInput.on('change', function() {
    checkRemover($lastNameInput)
  })

  var initAddress = function () {
    // address verification
    var liveaddress = $.LiveAddress({
      debug: false,
      key: "137296413373292866",
      addresses: [{
        street: $addressField
        }],
      ambiguousMessage: "Choose the exact address",
      invalidMessage: "We did not find that address in our records<br><span class='line_two'>Be sure to include a building number and leave out resident names</span>",
      stateFilter: "AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY",
      submitVerify: true
    });

    liveaddress.on("AddressWasAmbiguous", function (event, data, previousHandler) {
      previousHandler(event, data);
    });

    // refocus search form if invalid
    liveaddress.on("InvalidAddressRejected", function (event, data, previousHandler) {
      $addressField.focus();
    });

    liveaddress.on("AddressChanged", function (event, data, previousHandler) {
      $addressField.removeClass("success");
      previousHandler(event, data);
    });

    liveaddress.on("AddressAccepted", function (event, data, previousHandler) {
      var chosen = data.response.chosen;

      amplify.store('propertySearchData', {
        address: chosen.delivery_line_1 + " " + chosen.last_line,
        street: chosen.delivery_line_1 || "",
        last_line: chosen.last_line || "",
        city: chosen.components.city_name || "",
        state: chosen.components.state_abbreviation || "",
        unit: chosen.components.secondary_number || "",
        zip5: chosen.components.zipcode || "",
        zip4: chosen.components.plus4_code || ""
      });
      amplify.store('propertyCurrentRecord', {
        _framerida_click: "store propertyCurrentRecord",
        _framerida_mapped: "TeaserRecord",
        parcel_address: {
          address: chosen.delivery_line_1 + " " + chosen.last_line,
          full: chosen.delivery_line_1 || "",
          parts: {
            carrier_route: chosen.metadata.carrier_route || "",
            city: chosen.components.city_name || "",
            house_number: chosen.components.primary_number || "",
            post_direction: chosen.components.street_postdirection || "",
            pre_direction: chosen.components.street_predirection || "",
            state: chosen.components.state_abbreviation || "",
            street_name: chosen.components.street_name || "",
            street_type: chosen.components.street_suffix || "",
            unit: chosen.components.secondary_number || "",
            zip: chosen.components.zipcode || "",
            zip4: chosen.components.plus4_code || ""
          }
        }
      });

      $addressField.addClass("success");
      $addressField.focus();

      previousHandler(event, data);
    });
  };
  
  $.validator.addMethod("notEmail", function(value, element) {
    return this.optional(element) || !/^[ a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?(?:\.[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?)*$/.test(value);
  }, "Email addresses are not searchable here");

  if ($headerSearchPeople.length !== 0) {
    $headerSearchPeople.validate({
      validClass: "success",
      rules: {
        fn: {
          required: true,
          notEmail: true
        },
        ln: {
          required: true,
          notEmail: true
        },
      },
      messages: {
        fn: "Please enter a first name",
        ln: "Please enter a last name"
      },
      onkeyup: false,
      onclick: false,
      onsubmit: true,
      submitHandler: function (form) {
        trackNL("Submitted Search Form - People");
        window.setTimeout(function () {
          form.submit();
        }, REQUEST_DELAY);
      }
    });

  }
  if ($headerSearchPhone.length !== 0) {
    $.validator.addMethod("phoneUS", function (phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
    }, "Please specify a valid phone number");

    $headerSearchPhone.validate({
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

      onkeyup: false,
      onclick: false,
      onsubmit: true,
      submitHandler: function (form) {
        trackNL("Submitted Search Form - Phone");
        window.setTimeout(function () {
          var phoneNumber = $("#phone").val(),
                cleanNumber = phoneNumber.replace(/\D/g, '');
          $('#phone').val(cleanNumber);
          form.submit();
        }, REQUEST_DELAY);
      }
    });

  }
  if ($headerSearchEmail.length !== 0) {
    $headerSearchEmail.validate({
      validClass: "success",

      rules: {
        "emailaddress": {
          required: true,
          email: true
        },
      },
      messages: {
        "emailaddress": "Please enter an Email Address"
      },

      onkeyup: false,
      onclick: false,
      onsubmit: true,
      submitHandler: function (form) {
        trackNL("Submitted Search Form - Email");
        window.setTimeout(function () {
          form.submit();
        }, REQUEST_DELAY);
      }
    });

  }
  if ($headerSearchProperty.length !== 0) {
    $headerSearchProperty.validate({
      rules: {
        $fullAddress: "required"
      },
      messages: {
        address: "Please enter an address"
      },

      onkeyup: false,
      onclick: false,
      onsubmit: true,
      submitHandler: function (form) {
        trackNL("Submitted Search Form - Reverse Property");
        window.setTimeout(function () {
          form.submit();
        }, REQUEST_DELAY);
      }
    });

  }

  var init = function () {
    BrowserDetect.init();
    $('.carousel').carousel();
    $('.focus-me').focus();
    $('.carousel').on('slid.bs.carousel', function (evt) {
      if (($('.carousel div.active').index() + 1) === 4) {
        initAddress();
      }
    });
    $('a.smarty-popup-close').html('<span class="glyphicon glyphicon-remove-circle"></span>');
  };

  init();
}());

/**
 * Targeted Content P.O.C.
 */
(function ($, _) {
  /*
   * @private
   * Parses query arguments and returns them as an object.
   */
  var parseQueryArgs = function (query) {
    if (!query) {
      return null;
    }
    var args = _
      .chain(query.split('&'))
      .map(function (params) {
        var p = params.split('=');
        var key = p[0];
        var val = window.decodeURIComponent(p[1]);
        val = val.replace(/\/+$/g, ""); // clean up trailing slash
        val = val.replace(/\+/g, " "); // replace white spaces
        return [key, val];
      })
      .object()
      .value();
    return args;
  };

  var findDynamicContent = function () {
    return $("[data-bv-content]");
  };

  var displayTargetedContent = function (queryArgs, $dynamicElems) {
    var ref = queryArgs.pagetype,
      kw = ref && ref.toLowerCase().replace(' ', '');

    if (!ref) return;

    _.forEach($dynamicElems, function (elem) {
      var $elem = $(elem),
        $defaults = $elem.find("[data-bv-ref=default]");
      $target = $elem.find("[data-bv-ref=" + kw + "]");
      if (!$target || $target.length === 0) {
        $defaults.show();
      } else {
        $defaults.hide();
        $target.show();
      }
    });
  };

  var show = function () {
    $(".box-text-wrap").removeClass("hide");
  };

  var initialize = function () {
    var query = window.location.search.substring(1),
      queryArgs = parseQueryArgs(query);

    var referrer = window.referrer;

    if (queryArgs) {
      $dynamicElems = findDynamicContent();
      displayTargetedContent(queryArgs, $dynamicElems);
    }
    //mask for phone input
    $("#phone").mask('(000) 000-0000');
  };

  try {
    initialize();
    show();
  } catch (err) {
    show();
    throw err;
  }

  window.targeted = {
    initialize: initialize
  };

}(jQuery, _));
