String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

(function ($, bvRPL, amplify, _) {

  jQuery.fx.interval = 100;

  var map;

  var searchStates = {
    done: "Found"
  };


  var options = {
    mapAnimationDelay: 1000
  };

  // $(window).on('resize', function () {
  //   enforceMapHeight();
  // });


  var enforceMapHeight = function () {

    $('#map').css('height', "300px");
  };

  var formatPhoneNumber = function (phoneNumber) {
    phoneNumber = phoneNumber.toString(); // Fix before using replace in IE9
    var formatted = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formatted;
  };

  var formatPhoneNumberSimple = function (phoneNumber) {
    phoneNumber = phoneNumber.toString(); // Fix before using replace in IE9
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
    return $.ajax(requestUrl, {dataType: 'jsonp', jsonpCallback: 'parseResults'});
  };

  var locations = {
    usa: [38.505191, -97.734375]
  };

  var createMap = function () {
    // var map = L.mapbox.map('map', 'beenverified.i3k1i3cc', bvRPL.leaflet.mapOpts);
    // map.setView(locations.usa, 5);


    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw';
    var map = new mapboxgl.Map(bvRPL.leaflet.mapOpts);
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


  var storeSearchData = function (storageData) {

    amplify.store(bvRPL.config.searchData, storageData);
  };

  /* Holds data queried from the RPL API */
  var searchData;

  var prepSearchData = function (data) {
    // var activateLink = "<a href='" + subscribeUrl + "'>Activate Your Account To Search</a>";

    var prepped = {
      ownersName: data.names[0] ? data.names[0].full : "",
      carrier: data.carrier,
      email: data.emails[0] ? data.emails[0] : "",
      lineType: (data.type == "L") ? "Landline" : "Cellphone",
      location: data.addresses[0] ? data.addresses[0].full : "",
      latitude: data.addresses[0] ? data.addresses[0].latitude : "",
      longitude: data.addresses[0] ? data.addresses[0].longitude : "",
    };

    return prepped;
  };


  var phoneNumber = getPhoneNumber();
      // subscribeUrl = $("body").data('next-page') + "?record_search[phone_number]=" + phoneNumber;

  if (!phoneNumber) {
    window.location = bvRPL.config.landingUrl;
    return;
  }

  var initializeFlow = function () {
    phoneNumber = phoneNumber.replace(/\D|\-/g,'');
    fullSearchFlow();

    map = createMap();
  };

  var startMapFly = function(lng, lat) {

    map.on('load', function(){

      map.flyTo({
        center: [lng,  lat],
        zoom: 13,
        bearing: 0,
        pitch: 0,
        speed: 0.8,
        curve: 0.8
      });

      map.once('moveend', function(){
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      });
    });
  };


  var fullSearchFlow = function () {
    var phoneLookup = queryPhoneLookup(phoneNumber);
    enforceMapHeight();

    var lookupData = false;

    var formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    $.when(phoneLookup).done(function (lookupResults, status) {
      // debugger
      var data = lookupResults,
          success = (status === "success"),
          latlng = [];

      if (success && !$.isEmptyObject(data)) {

        // Again, mapbox is a monster and accepts coordinates as [lng, lat]
        searchData = prepSearchData(data);

        if (searchData.latitude && searchData.longitude) {
          startMapFly(searchData.longitude, searchData.latitude);
        } else {
          startMapFly(-97.734375, 38.505191);
        }

        storeSearchData({
          latlng: [searchData.latitude, searchData.longitude],
          phoneNumber: phoneNumber,
          formattedPhoneNumber: formattedPhoneNumber,
          ownersName: searchData.ownersName,
          location: searchData.location,
          carrier: searchData.carrier,
          type: searchData.lineType,
          email: searchData.email,
          data: searchData
        });
      }
    });
  };

  $('#signup-modal-form').validate({
    rules: {
      "account[first_name]": "required",
      "account[last_name]": "required",
      "user[email]": {
          required: true,
          email: true
      }
    },
    messages: {
      "account[first_name]": "Please enter a first name",
      "account[last_name]": "Please enter a last name",
      "user[email]": "Please enter an email"
    },
    submitHandler: function(form, e){

      e.preventDefault();
      var formData = $(form).serializeArray();
      reportLeadData(formData);
      window.location.href = $('body').data('next-page');
    }
  });

  $(document).ready(initializeFlow);

}(jQuery, bvRPL, amplify, _));
