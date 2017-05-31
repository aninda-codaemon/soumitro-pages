String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

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
    mapAnimationDelay: 1000
  };

  $(window).on('resize', function () {
    enforceMapHeight();
  });

  var centerLocatingText = function () {
    var $locating = $('.locating-text'),
        top = $locating.height() / 2,
        left = $locating.width() / 2;
    $locating.css('margin', '-' + top + 'px 0 0 -' + left + 'px');
  };

  var enforceMapHeight = function () {
    // var width = $(this).width(),
    //     height = $(this).height();
    var height = '500';
    $('#map').css('height', "275px");
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
    amplify.store(bvRPL.config.personalInfo, formVals);
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

  var onMapAnimationFinished = function () {

    // promptPersonalInfo();
  };

  var storeSearchData = function (storageData) {
    amplify.store(bvRPL.config.searchData, storageData);
  };

  /* Holds data queried from the RPL API */
  var searchData;

  var prepSearchData = function (data) {
    var activateLink = "<a href='" + subscribeUrl + "'>Activate Your Account To Search</a>";

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


  var fullSearchFlow = function () {
    var phoneLookup = queryPhoneLookup(phoneNumber);

    centerLocatingText();
    enforceMapHeight();


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

    $.when(phoneLookup).done(function (lookupResults, status) {
      // debugger
      var data = lookupResults.results,
          success = (status === "success"),
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

}(jQuery, bvRPL, amplify, _));
