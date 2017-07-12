;(function ($) {

  var searchData = localStorage.getItem('__amplify__propertyTeaserData') ? JSON.parse(localStorage.getItem('__amplify__propertyTeaserData')) : {};
  if (searchData) {
    searchData = searchData.data;
  }


  Vue.config.devtools = true;
  var buildingClass = function(){

    if (_empty(searchData.buildings)) {
      return '';
    }

    var type = {
      1: "Residential",
      2: "Residential",
      3: "Residential",
      4: "Residential",
      5: "Residential",
      6: "Residential",
      7: "Residential",
      8: "Commercial",
      9: "Miscellaneous",
      10: "Residential"
    };
    return type[searchData.buildings[0].class];
  };

  var propertyTax = function() {
    var taxes = searchData.taxes;

    if (!taxes || _empty(taxes.bills) || !taxes.bills[0].amount) {
      return false;
    } else {
      return taxes.bills[0].amount;
    }
  };

  var yearBuilt = function() {
    var buildings = searchData.buildings;
    if (!buildings || _empty(buildings[0]) || !buildings[0].year_built){
      return false;
    } else {
      return "Built between " + buildings[0].yearRange();
    }
  };

  var stories = function() {
    var buildings = searchData.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].number_of_stories){
      return false;
    } else {
      return buildings[0].number_of_stories.roomRange();
    }
  };

  var rooms = function() {
    var buildings = searchData.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].rooms){
      return false;
    } else {
      return buildings[0].rooms.total.roomRange();
    }
  };


  var app = new Vue({
    el: '#app',
    data: {
      address: searchData.address,
      teaser: searchData.teasers[0] || searchData.teasers,
      dataRows: [
        {name: "county", existance: searchData.owner ? true : false, text:"County", value: searchData.owner},
        {name: "sold-1", existance: searchData.last_sold_price === 0 ? true : false, text:"last sale est."},
        {name: "residential", existance: _empty(searchData.buildings), text : "", value: buildingClass()},
        {name: "dollarbag", existance: propertyTax(), text:"$/yr in taxes", value: propertyTax()},
        {name: "built", existance: yearBuilt(), text:"", value: yearBuilt()},
        {name: "stories", existance: stories(), text:"", value: stories()},
        {name: "ruler", existance: searchData.owner ? true : false, text:"County"},
        {name: "rooms", existance: rooms(), text:"", value: rooms()},
        {name: "buildings", existance: searchData.owner ? true : false, text:"County"},
        {name: "bedroom", existance: searchData.owner ? true : false, text:"County"},
        {name: "bathroom", existance: searchData.owner ? true : false, text:"County"},


      ]
    },
    methods: {
      isFullAddress: function() {
        if (this.teaser.parcel_address.full) {
          return true;
        }
      },

      showStreet: function() {

        var parcel_address = this.teaser.parcel_address;
          if (!parcel_address || !parcel_address.parsed) {
            return "";
          }
          var number = parcel_address.parsed.primary_address_number,
              street = parcel_address.parsed.street_name + " " + parcel_address.parsed.street_type;
          return number + " " + street;
      },

      secondLine: function() {
        var parcel_address = this.teaser.parcel_address;
        if (!parcel_address || !parcel_address.parsed) {
          return "";
        }
        return parcel_address.parsed.city + ", " + parcel_address.parsed.state + " " + parcel_address.parsed.zip5;
      },

      owner
    }
  });

  // debugger

  var sendToHeap = function (eventName, prop) {
    if (typeof heap !== 'undefined' && _.isFunction(heap.track)) {
      heap.track(eventName, prop);
    }
  };


  /*********  *********/
  function initializeSignupModal() {
    sendToHeap('Viewed AccountNeeded Modal');

    var leadForm = $('#signup-modal-form'),
      emailMesg = (window.isMobile) ? 'Please enter a valid email' : 'Please enter a valid email address';

    $.validator.setDefaults({
      debug: false,
      errorElement: 'label',
      errorClass: 'help-block',
      highlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
      },
      errorPlacement: function (error, element) {
        if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
          error.insertAfter(element.parent());
        } else {
          element.attr('placeholder', error[0].textContent);
        }
      }
    });

    var flattenFormData = function (formSerializedArray) {
      var resultingData = {},
        len = formSerializedArray.length;

      for (var i = 0; i < len; i += 1) {
        resultingData[formSerializedArray[i].name] = formSerializedArray[i].value;
      }

      return resultingData;
    };

    var cookie = function (key, val) {
      if (arguments.length === 2) {
        document.cookie = key + '=' + escape(val) + '; path=/; domain=.beenverified.com';
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
        var k = kvp[0],
          v = kvp[1];
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

      // var searchData = amplify.store('propertySearchData'),
      //   currentRecord = amplify.store('propertyCurrentRecord'),
      //   dataPath = $('#main-content div.report-wrapper').data('fr-bound2'),
      //   data = framerida.dataFromDataPath(dataPath),
      //   teaser = new TeaserRecord(data);

      var leadData = {},
        recordSearchData = [];

      recordSearchData = {
        source_flow: 'reverse property',
        source_url: getPageURL(),
        source_visitor: cookie('bv_sess') || '',
        prop_searched: searchData.address || '',
        prop_street: teaser.street() || '',
        prop_unit: teaser.unit() || '',
        prop_city: teaser.city() || '',
        prop_state: teaser.state() || '',
        prop_zip: teaser.zip5() || '',
        prop_zipfull: teaser.zip() || '',
        prop_owner: teaser.owner() || '',
        //prop_lender: teaser.lender() || '', TODO: Validate if we need to use this.
        prop_mkt_val: _.get(currentRecord, 'values.market[0].land') || '',
        prop_mkt_val_display: teaser.marketLandValue() || '',
        prop_build_class: teaser.buildingClass() || '',
        prop_build_date: _.get(currentRecord, 'buildings[0].year_built') || '',
        prop_build_date_display: teaser.yearBuilt() || '',
        prop_constr_type: teaser.constructionType() || '',
        prop_county: teaser.county() || '',
        prop_rooms: _.get(currentRecord, 'buildings[0].rooms.total') || '',
        prop_rooms_display: teaser.totalRooms() || '',
        prop_baths: _.get(currentRecord, 'buildings[0].rooms.baths.total') || '',
        prop_baths_display: teaser.bathrooms() || '',
        prop_beds: _.get(currentRecord, 'buildings[0].rooms.bed') || '',
        prop_beds_display: teaser.bedrooms() || '',
        prop_stories: _.get(currentRecord, 'buildings[0].number_of_stories') || '',
        prop_stories_display: teaser.stories() || '',
        prop_residents: currentRecord.residents && currentRecord.residents.length || '',
        prop_residents_display: currentRecord.residents && currentRecord.residents.length.toString().numberRange(5) || '',
        prop_est_tax: _.get(currentRecord, 'taxes.bills[0].amount') || '',
        prop_est_tax_display: teaser.propertyTaxes() || '',
        prop_units: currentRecord.number_of_units || '',
        prop_units_display: teaser.units() || '',
        prop_buildings: currentRecord.number_of_buildings || '',
        prop_buildings_display: teaser.buildings() || '',
        prop_sqft: teaser.getLotSize() || '',
        prop_sqft_display: teaser.lotSize() || '',
        prop_lat: currentRecord.latitude || '',
        prop_long: currentRecord.longitude || '',
        mapbox_access_token: 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw'
      };

      leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
      leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
      leadData['lead[email]'] = formVals['user[email]'] || '';
      leadData['lead[report_type]'] = 'reverse_property';
      leadData['lead[report_data]'] = JSON.stringify(recordSearchData);

      amplify.store('leadData', {
        'account[first_name]': formVals['account[first_name]'] || '',
        'account[last_name]': formVals['account[last_name]'] || '',
        'user[email]': formVals['user[email]'] || ''
      });

      var leadQueryArr = [];
      _.forEach(leadData, function (v, k) {
        leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      });

      var leadQueryString = leadQueryArr.join('&');
      return $.post('https://www.beenverified.com/api/v4/leads.json', leadData);
    };

    $('#signup-modal-form').on('click', function (e) {
      $(this).validate({
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
          },
          'user[tos]': {
            required: true
          }
        },
        messages: {
          'account[first_name]': 'Please enter a first name',
          'account[last_name]': 'Please enter a last name',
          'user[email]': {
            required: emailMesg,
            email: 'Your email address must be in the format of name@domain.com'
          },
          'user[tos]': 'Please accept the Terms of Service'
        },
        submitHandler: function (form) {
          if (typeof heap !== 'undefined' && heap.track) {
            heap.track('Submitted Lead Form - Success');
          }

          try {
            reportLeadData($(form).serializeArray());
          } catch (err) {
            console.log(err);
          }

          timeout = window.setTimeout(function () {
            form.submit();
          }, 300);

          return false;
        }
      });
    });
  }

  function initialize() {
    // amplify.store('contentToDisplay', null);
    // getTeaserData(searchData);
    // initializeSignupModal();
  }

  initialize();
})(jQuery);
