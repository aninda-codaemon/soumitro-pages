String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

jQuery.validator.addMethod("exactlength", function(value, element, param) {
 return this.optional(element) || value.length == param;
}, jQuery.format("Please enter exactly {0} numbers."));

(function ($, bvRPL, amplify, _) {

  jQuery.fx.interval = 100;

  var map;

  var searchStates = {
    done: "Found"
  };

  var carriers = {
    generic: {
      elem: '#carrier-generic'
    },
    verizon: {
      names: ['verizon'],
      elem: '#carrier-verizon'
    },
    sprint: {
      names: ['sprint', 'nextel'],
      elem: '#carrier-sprint'
    },
    att: {
      names: ['att', 'at&t', 'cingular'],
      elem: '#carrier-att'
    },
    tmobile: {
      names: ['tmobile', 't-mobile', 'omnipoint'],
      elem: '#carrier-tmobile'
    }
  };

  var options = {
    initialDuration: 30 * 1000,
    generateDuration: 30 * 1000,
    mapAnimationDelay: 1000
  };

  $(window).on('resize', function () {
    enforceMapHeight();
  });

  var $progressBar = $(".progress-bar"),
      $modalOverlay = $(".modal-overlay"),
      $personalInfoForm = $(".personal_info_form form"),
      $personalInfoModal = $(".personal_info_modal"),
      $partialNumberForm = $(".partial_modal form"),
      $partialHeader = $(".partial_header"),
      $partialModal = $(".partial_modal"),
      $searchState = $(".search-state"),
      $carrierName = $(".carrier-name");

  var centerLocatingText = function () {
    var $locating = $('.locating-text'),
        top = $locating.height() / 2,
        left = $locating.width() / 2;
    $locating.css('margin', '-' + top + 'px 0 0 -' + left + 'px');
  };

  var enforceMapHeight = function () {
    var width = $(this).width(),
        height = $(this).height();
    $('#map').css('height', height + 'px');
  };

  var formatPhoneNumber = function (phoneNumber) {
    phoneNumber = new String(phoneNumber); // Fix before using replace in IE9
    var formatted = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formatted;
  };

  var formatPhoneNumberSimple = function (phoneNumber) {
    phoneNumber = new String(phoneNumber); // Fix before using replace in IE9
    var formatted = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formatted;
  };

  var getQueryArgs = function () {
    var query = window.location.search.substring(1); // drop '?' char
    if (!query) {
      return false;
    }
    var args = _
    .chain(query.split('&'))
    .map(function(params) {
      var p = params.split('=');
      var key = p[0];
      var val = window.decodeURIComponent(p[1]);
      val = val.replace(/\/+$/, ""); // clean up trailing slash
      return [key, val];
    })
    .object()
    .value();

    if (args.state === 'All') {
      args.state = '';
    }

    return args;
  };

  var getPhoneNumber = function () {
    var args = getQueryArgs();
    return args.phone;
  };

  var queryPhoneLookup = function (phoneNumber) {
    var requestUrl = bvRPL.config.url + '&phone=' + phoneNumber;
    return $.ajax(requestUrl, {dataType: 'jsonp'});
  };

  var locations = {
    usa: [38.505191, -97.734375]
  };

  var createMap = function () {
    var map = L.mapbox.map('map', 'beenverified.i3k1i3cc', bvRPL.leaflet.mapOpts);
    map.setView(locations.usa, 5);
    return map;
  };

  var animateProgressBar = function (duration, stepCb) {
    if (!stepCb) {
      stepsCb = function () {};
    }

    var animation = $progressBar.animate({
        width: "100%"
      }, {
        step: stepCb,
        duration: duration,
        easing: 'linear'
    });
    return animation.promise();
  };

  var resetProgressBar = function () {
    $progressBar.width("0%");
  };

  var generateReport = function () {
    resetProgressBar();
    $('.generate_report_modal').fadeIn();

    var currentgenerateAnimStep = 0;
    var shownStates = {}; // Used to keep track of already shown result rows.
    var progressAnimation = animateProgressBar(options.generateDuration, function (progress) {

      progress = Math.floor(progress);

      var currentStep = 0,
        blueCheck = bvRPL.config.blueCheckUrl,
        $tds = {
          ownersName: $(".report-owners-name"),
          carrier: $(".report-carrier"),
          lineType: $(".report-line-type"),
          city: $(".report-city"),
          state: $(".report-state"),
          zipCode: $(".report-zip-code"),
          streetAddress: $(".report-street-address"),
          neighborhood: $(".report-neighborhood"),
          elevation: $(".report-elevation"),
          latitude: $(".report-latitude")
        };

      var showResultRow = function (resultName) {
        if (!shownStates[resultName]) {
          var $el = $tds[resultName];
          $el.find('img.loading-check').attr('src', blueCheck);
          $el.find('td.report-data').html(searchData[resultName]);
          shownStates[resultName] = true;
        }
      };

      if (progress <= 16) {
        // beginning state already shown
      } else if (progress > 16 && progress <= 32) {
        showResultRow('ownersName');
      } else if (progress > 32 && progress <= 48) {
        showResultRow('carrier');
      } else if (progress > 48 && progress <= 64) {
        showResultRow('lineType');
      } else if (progress > 64 && progress <= 80) {
        showResultRow('city');
      } else if (progress > 80 && progress <= 96) {
        showResultRow('state');
      } else if (progress > 96 && progress < 100) {
        showResultRow('zipCode');
      }
    });

    progressAnimation.done(function () {
      window.setTimeout(function () {
        $('.generating-result').hide();
        $('.generating-ready').show();

      }, 800);
    });
  };

  var promptPersonalInfo = function () {
    $personalInfoModal.fadeIn();
    $searchState.text(searchStates.done);
  };

  var personalInfoFormValidator = $personalInfoForm.validate({
    rules: {
      'account[first_name]': {
        required: true
      },
      'account[last_name]': {
        required: true
      },
      'user[email]': {
        required: true,
        email: true
      }
    },
    highlight: function(element) {

      var $elem = $(element),
          elemName = $elem.attr('name');

      elemName = elemName.replace('[', '\\[');
      elemName = elemName.replace(']', '\\]');
      elemName = elemName.replace(')', '\\)');
      elemName = elemName.replace('(', '\\(');

      $("#" + elemName + "_error").show();
      $elem.removeClass('success');
      $elem.addClass('error');
    },
    unhighlight: function(element) {

      var $elem = $(element),
          elemName = $elem.attr('name');

      elemName = elemName.replace('[', '\\[');
      elemName = elemName.replace(']', '\\]');
      elemName = elemName.replace(')', '\\)');
      elemName = elemName.replace('(', '\\(');

      $("#" + elemName + "_error").hide();
      $elem.removeClass('error');
      $elem.addClass('success');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) { },
    success: function () { }
  });

  var partialNumberFormValidator = $partialNumberForm.validate({
    rules: {
      'partial_area_code': {
        required: true,
        digits: true,
        exactlength: 3
      },
      'partial_exchange_code': {
        required: true,
        digits: true,
        exactlength: 3
      },
      'partial_subscriber_num': {
        required: true,
        digits: true,
        exactlength: 4
      }
    },
    highlight: function(element) {

      var $elem = $(element),
          elemName = $elem.attr('name');

      $elem.removeClass('success');
      $elem.addClass('error');
    },
    unhighlight: function(element) {

      var $elem = $(element),
          elemName = $elem.attr('name');

      $elem.removeClass('error');
      $elem.addClass('success');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) { },
    success: function () { }
  });

  var cookie = function (key, val) {
    if (arguments.length === 2) {
      document.cookie = key + "=" + escape(val) + "; path=/; domain=.beenverified.com";
      return;
    }

    var kvps = document.cookie.split(';'),
        kvpsLen = kvps.length,
        i = 0,
        findAll = arguments.length === 0,
        cookieDict = {};

    for (; i < kvpsLen; i += 1) {
      var kvp = kvps[i].split('=');
      if (kvp.length !== 2) continue;
      var k = kvp[0], v = kvp[1];
      if (findAll) {
        cookieDict[k.trim()] = v.trim();
      } else if (k.trim() === key) {
        return v;
      }
    }
    return findAll ? cookieDict : undefined;
  };

  var getPageURL = function () {
    try {
      return document.location.href.split('?')[0];
    } catch (err) {
      return '';
    }
  };

  var reportLeadData = function (dataArray) {
    var formVals = {};
    _.forEach(dataArray, function (v, k) {
      formVals[v.name] = v.value;
    });
    var leadData = {},
        recordSearchData = [];

    recordSearchData = {
      source_flow: 'reverse phone',
      source_url: getPageURL(),
      source_visitor: cookie('bv_sess') || "",
      phone_number: formatPhoneNumberSimple(phoneNumber) || "",
      phone_line_type: searchData.lineType || "",
      phone_carrier: searchData.carrier || "",
      phone_city: searchData.city || "",
      phone_state: searchData.state || "",
      phone_latitude: searchData.latitude || "",
      phone_longitude: searchData.longitude || ""
    };

    leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
    leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
    leadData['lead[email]'] = formVals['user[email]'] || '';
    leadData['lead[zip]'] = formVals['account[zip]'] || '';
    leadData['lead[state]'] = formVals['account[state]'] || '';
    leadData['lead[report_type]'] = "reverse_phone";
    leadData['lead[report_data]'] = JSON.stringify(recordSearchData);

    var leadQueryArr = [];
    _.forEach(leadData, function (v, k) {
      leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
    var leadQueryString = leadQueryArr.join('&');
    return $.post('/api/v4/leads.json', leadQueryString);
  };

  $personalInfoForm.on('submit', function (evt) {
    evt.preventDefault();
    var isValid = personalInfoFormValidator.form();
    if (isValid) {
      $personalInfoModal.fadeOut();
      var formData = $(this).serializeArray();
      reportLeadData(formData);
      amplify.store(bvRPL.config.sendDataTo, formData);
      generateReport();
    }
  });

  $partialNumberForm.on('submit', function (evt) {
    evt.preventDefault();
    var isValid = partialNumberFormValidator.form();
    if (isValid) {
      $partialHeader.hide();
      $partialModal.hide();
      phoneNumber = $(this).find('#partial_area_code').val() + $(this).find('#partial_exchange_code').val() + $(this).find('#partial_subscriber_num').val();
      //phoneNumber = phoneNumber.replace('0000', '') + $(this).find('input').val();
      fullSearchFlow();
    }
  });



  var onMapAnimationFinished = function () {
    $modalOverlay.fadeIn();
    promptPersonalInfo();
  };

  var storeSearchData = function (storageData) {
    amplify.store(bvRPL.config.searchData, storageData);
  };


  /* Holds data queried from the RPL API */
  var searchData;

  var prepSearchData = function (data) {
    var activateLink = "<a href='" + subscribeUrl + "'>Activate<span class='hideXXS'> Your</span> Account To Search</a>";

    var prepped = {
      ownersName: activateLink,
      carrier: data.company,
      lineType: (data.nxxusetype == "L") ? "Landline" : "Cellphone",
      city: data.city,
      state: data.state,
      zipCode: activateLink,
      streetAddress: activateLink,
      neighborhood: activateLink,
      elevation: activateLink,
      latitude: data.latitude,
      longitude: data.longitude
    };

    return prepped;
  };

  /**
   * Keeps track of shown states for the initializing screens.
   */
  var initializingState = {
    "done1": false,
    "done2": false,
    "done3": false
  };

  var phoneNumber = getPhoneNumber(),
      subscribeUrl = $("body").data('next-page') + "?record_search[phone_number]=" + phoneNumber;

  if (!phoneNumber) {
    window.location = bvRPL.config.landingUrl;
    return;
  }

  var initializeFlow = function () {
    phoneNumber = phoneNumber.replace(/\D|\-/g,'');

    if (phoneNumber.match(/^(\d{3})-(\d{3})$/)) {
      phoneNumber += "-0000";
      partialSearchFlow();
    } else if (phoneNumber.match(/^(\d{3})(\d{3})$/)) {
      phoneNumberDashed = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
      phoneNumber = phoneNumberDashed + "-0000";
      partialSearchFlow();
    } else {
      fullSearchFlow();
    }

    map = createMap();
  };

  var partialSearchFlow = function() {
    var phoneLookup = queryPhoneLookup(phoneNumber);

    $(".partial_header").show();
    $(".partial_modal").show();

    $("#change-number").attr('href', bvRPL.config.landingUrl);
    $("#proceed-download").attr('href', subscribeUrl);

    $("#partial_area_code").val(phoneNumber.slice(0, 3));
    $("#partial_exchange_code").val(phoneNumber.replace(/\D/g,'').slice(3, 6));
    $(".partial_subscriber_num_label").text(phoneNumber.slice(0, -4));

    centerLocatingText();
    enforceMapHeight();
    //map = createMap();

    $modalOverlay.fadeIn();

    $.when(phoneLookup).done(function (lookupResults, status) {
      if (status === "success") {
        if ($.isEmptyObject(lookupResults.results)) {
          notFound = true;
        } else {
          loc = " in " + lookupResults.results.city.capitalize(true) + ", " + lookupResults.results.state.capitalize();
          $('.partial_location').text(loc);
        }
      }
    });
  };

  var fullSearchFlow = function () {
    var phoneLookup = queryPhoneLookup(phoneNumber);

    $(".searching_header").show();
    $(".initial_modal").show();

    $("#change-number").attr('href', bvRPL.config.landingUrl);
    $("#proceed-download").attr('href', subscribeUrl);

    centerLocatingText();
    enforceMapHeight();
    //map = createMap();

    $modalOverlay.fadeIn();

    var $initializing1 = $(".initializing1"),
        $initializing2 = $(".initializing2"),
        $initializing3 = $(".initializing3");

    var lookupData, notFound = false;

    var presentPhoneCarrier = function (lookupData) {
      if (!lookupData || $.isEmptyObject(lookupData)) return;

      var i, carrier, currCarrier, carrierNamesLen,
          lookupCarrier = lookupData.company,
          carrierFound = null;
      if (!_.isString(lookupCarrier)) {
        $(carriers.generic.elem).show();
        return;
      }

      for (carrier in carriers) {
        if (carrierFound) break;
          currCarrier = carriers[carrier];
          carrierNamesLen = currCarrier.names ? currCarrier.names.length : 0;
        for (i = 0; i < carrierNamesLen; i++) {
          currCarrierName = currCarrier.names[i];
          if (lookupCarrier.toLowerCase().indexOf(currCarrierName.toLowerCase()) >= 0) {
            carrierFound = carriers[carrier];
          }
          if (carrierFound) break;
        }
      }

      if (carrierFound) {
        $(carrierFound.elem).show();
      } else {
        $(carriers.generic.elem).show();
      }

      $carrierName.text(lookupCarrier);
    };

    var showNotFoundModal = function () {
      $(".initial_modal").hide();
      $(".notFound").show();
    };

    var initializing = animateProgressBar(options.initialDuration, function (progress) {
      progress = Math.floor(progress);

      var state = phoneLookup.state();

      if (progress === 0 && !initializingState.done1) {
        $initializing1.show();
        initializingState.done1 = true;
      } else if ((progress === 33 && !initializingState.done2)) {
        if (notFound) {
          showNotFoundModal();
          return;
        }
        $initializing1.hide();
        $initializing2.show();
        initializingState.done2 = true;
      } else if (progress === 66 && !initializingState.done3) {
        $initializing2.hide();
        presentPhoneCarrier(lookupData);
        $initializing3.show();
        initializingState.done3 = true;
      }
    });

    $.when(phoneLookup).done(function (lookupResults, status) {
      if (status === "success") {
        if ($.isEmptyObject(lookupResults.results)) {
          notFound = true;
        } else {
          lookupData = lookupResults.results;
        }
      }
    });

    var formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    $('.phone-number').html(formattedPhoneNumber);

    $.when(phoneLookup, initializing).done(function (lookupResults) {
      var data = lookupResults[0].results,
          success = (lookupResults[1] === "success"),
          latlng = [];

      if (success && !$.isEmptyObject(data)) {
        latlng.push(data.latitude);
        latlng.push(data.longitude);

        searchData = prepSearchData(data);

        storeSearchData({
          latlng: latlng,
          phoneNumber: phoneNumber,
          formattedPhoneNumber: formattedPhoneNumber,
          data: searchData
        });

        mapAnimation.run(map, latlng, options.mapAnimationDelay, onMapAnimationFinished);
      }
    });
  };

  $(document).ready(initializeFlow);

  // Legacy blink code
  var blink = function() {
    $('.blink').animate({
      opacity: '.5'
    }, function(){
      $(this).animate({
        opacity: '1'
      }, blink);
    });
  };

  blink();

}(jQuery, bvRPL, amplify, _));
