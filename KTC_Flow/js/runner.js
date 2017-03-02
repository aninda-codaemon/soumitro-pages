;(function ($) {

noResults = false;

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
    // window.location.href = $("body").data("search-page");
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
  };

// Local storage object prep functions
var bestTeaserSorter = function(records, name) {
  var name = name.toLowerCase()
  if (records.length < 5) {
    return records;
  }
  records = _.chain(records).sortBy(function(record) {
    var addresses = 100,
        relatives = 999,
        addressCount = 0,
        relativeCount = 0;

    if (record.Addresses) {
      addressCount = record.Addresses.Address.length;
      addresses -= addressCount;
    }

    if (record.Relatives) {
      relativeCount = record.Relatives.Relative.length;
      relatives -= relativeCount;
      }

    return parseFloat("" + addresses + "." + relatives);
  }, this).value();
  var exactNames = records.filter(function(record) {
    var mikey;
  })
  return records.slice(0,5);
};
var recordsWithTeaser = [],
    peopleRecordCount,
    searchName;
var getExtraTeaserData = function(records) {

  // var dataPath = $(ctx).data("fr-bound2");
  // var dataPath = amplify.store().currentRecord._framerida_boundTo;
  // var data = framerida.dataFromDataPath(dataPath);
  records.forEach(function(record, index){


  var teaser = new TeaserRecord(record);
  var bvid = teaser.bvid;

  var baseUrl = "//www.beenverified.com/hk/dd/teaser/person?exporttype=jsonp";
  var url = baseUrl + "&bvid=" + bvid;
  var xhrData = $.ajax({
    url: url,
    dataType: 'jsonp',
  });

  $.when(xhrData).done(function(result) {
    trackNL("Person Data Teaser Called");

    var res = result;
    var img = '';

    // Get profile image URL
    if (res.images[0] && typeof(res.images[0].url !== 'undefined')) {
      img = res.images[0].url;
    }

    var phoneNumbers = $.map(res.phones, function(item){
      return item.number.formatPhone();
    });
    var emailAddresses = $.map(res.emails, function(item){
      return item.email_address.formatEmail().toLowerCase();
    });
    var socialNetworks = $.map(res.social, function(item){
      return item.type.nameize();
    });

    // Data elements to display - Waterfall controlled here
    var data = [
      // {
      //   'type': 'criminal',
      //   'name': 'Criminal or Traffic*',
      //   'single': 'Criminal or Traffic*',
      //   'style': ' crim-box',
      //   'weight': 9,
      //   'showIfEmpty': 0,
      //   'count': res.courts.criminal.length
      // },
      // {
      //   'type': 'bankruptcy',
      //   'name': 'Bankruptcy Filings',
      //   'single': 'Bankruptcy Filing',
      //   'style': ' crim-box',
      //   'weight': 8,
      //   'showIfEmpty': 0,
      //   'count': res.courts.bankruptcy.length
      // },
      {
        'type': 'associates',
        'name': 'Associates & Relatives',
        'single': 'Associates & Relatives',
        'style': '',
        'weight': 7,
        'showIfEmpty': 0,
        'count': res.connections.associates.length + res.connections.relatives.length
      },
      {
        'type': 'emails',
        'name': 'Email Addresses',
        'single': 'Email Address',
        'style': '',
        'weight': 6,
        'showIfEmpty': 0,
        'count': res.emails.length,
        'emailAddress': emailAddresses
      },
      {
        'type': 'phones',
        'name': 'Phone Numbers',
        'single': 'Phone Number',
        'style': ' phone-box',
        'weight': 5,
        'showIfEmpty': 0,
        'count': res.phones.length,
        'phoneNumber': phoneNumbers
      },
      {
        'type': 'social',
        'name': 'Social Media Profiles',
        'single': 'Social Media Profile',
        'style': ' social-box',
        'weight': 4,
        'showIfEmpty': 0,
        'count': res.social.length,
        'socialNetwork': socialNetworks
      },
      {
        'type': 'photos',
        'name': 'Photos',
        'single': 'Photo',
        'style': '',
        'weight': 3,
        'showIfEmpty': 0,
        'count': res.images.length
      },
      {
        'type': 'careers',
        'name': 'Jobs and Education',
        'single': 'Career',
        'style': '',
        'weight': 2,
        'showIfEmpty': 0,
        'count': res.jobs.length + res.educations.length
      },

    ];

    // Booleans for templating & reporting
    // var hasCriminal = _.some(data, function(item) {
    //   if (item && item.type === 'criminal') {
    //     return item.type === 'criminal' && item.count > 0;
    //   } else {
    //     return false;
    //   }
    // });
    // var hasBankruptcy = _.some(data, function(item) {
    //   if (item && item.type === 'bankruptcy') {
    //     return item.type === 'bankruptcy' && item.count > 0;
    //   } else {
    //     return false;
    //   }
    // });
    var hasPhone = _.some(data, function(item){
      if (item && item.type === 'phones') {
        return item.type === 'phones' && item.count > 0;
      } else {
        return false;
      }
    });
    var hasEmail = _.some(data, function(item){
      if (item && item.type === 'emails') {
        return item.type === 'emails' && item.count > 0;
      } else {
        return false;
      }
    });
    var hasSocial = _.some(data, function(item){
      if (item && item.type === 'social') {
        return item.type === 'social' && item.count > 0;
      } else {
        return false;
      }
    });

    var hasPhotos = _.some(data, function(item) {
      if (item && item.type === 'photos') {
        return item.type === 'photos' && item.count > 0;
      } else {
        return false;
      }
    });
    var hasCareers = _.some(data, function(item) {
      if (item && item.type === 'careers') {
        return item.type === 'careers' && item.count > 0;
      } else {
        return false;
      }
    });

    // Reporting
    if (hasPhone) {
      trackNL("Data Modal Viewed Phone");
    }
    if (hasEmail) {
      trackNL("Data Modal Viewed Email");
    }
    if (hasSocial) {
      trackNL("Data Modal Viewed Social");
    }
    if (hasPhotos) {
      trackNL("Data Modal Viewed Photos");
    }

    if (hasCareers) {
      trackNL("Data Modal Viewed Jobs and Education");
    }


    // Force singular name here rather than in template... meh
    data = _.forEach(data, function(item, key) {
      if (item && item.count === 1) {
        item.name = item.single;
      }
    });

    // Scrub data for display
    _.remove(data, function(item) {
      if (item) {
        return item.showIfEmpty === 0 && item.count === 0;
      }
    });
    data = _.sortByOrder(data, ['weight', 'count'], ['desc', 'desc']);

    var teaserDataObj = {
        recordCount: ($.type(res) !== 'array' ? 1 : 0),
        extraData: _(data).omit(_.isUndefined).omit(_.isNull).value(),
        photo: img,
        hasPhone: hasPhone,
        hasEmail: hasEmail,
        hasSocial: hasSocial,
        hasPhotos: hasPhotos,
        hasCareers: hasCareers,
    };

    record.teaserData = teaserDataObj;
    recordsWithTeaser.push(record);
  });
  })

};
  var parseTeaser = function(data) {
    var recordCount = parseInt(data["response"]["RecordCount"]),
        records;

    if (recordCount === 1) {
      records = [data["response"]["Records"]['Record']];
    } else if (recordCount === '0') {
      return [];
    } else {
      records = data["response"]["Records"]['Record'];
    }

    return records;
  }

  var parseEmailTeaser = function(data) {
    var recordCount, records, status = 0;
    if (data.results && typeof data.results.status !== 'undefined') {
      status = parseInt(data.results.status);
    }
    recordCount = (status === 200 ? 1 : 0);

    data.results.emailaddress = data.query.email;
    records = data.results;
    return records;
  }

  var getTeaserData = function(records) {
    records.forEach(function(record, index){

    })
  }

  var prepPhoneData = function (data, phone) {

    var prepped = {
      phone: phone,
      ownersName: "subscribe to see",
      carrier: data.company,
      lineType: (data.nxxusetype == "L") ? "Landline" : "Cellphone",
      city: data.city,
      state: data.state,
      zipCode: "subscribe to see",
      streetAddress: "subscribe to see",
      neighborhood: "subscribe to see",
      elevation: "subscribe to see",
      latitude: data.latitude,
      longitude: data.longitude
    };

  return prepped;
};


// Teaser Data requests

  var getPeople = function(formData){
    var fn = formData.fn.toLowerCase() || "",
        ln = formData.ln.toLowerCase() || "",
        city = formData.city || "",
        state = formData.state || "";

    if (state === "ALL") {
      state = "";
    }
    fn = fn[0].toUpperCase() + fn.slice(1);
    ln = ln[0].toUpperCase() + ln.slice(1);
    searchName = fn + " " + ln;

    var baseUrl = "//www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100";
    var url = baseUrl + "&fn=" + fn + "&ln=" + ln + "&state=" + state + "&city=" + city;

    var xhrData = $.ajax({
      url: url,
      dataType : 'jsonp',
      jsonpCallback: 'parseResults',
      statuscode: {
        503: function () {

        }
      }
    })

    $.when(xhrData).then(function(result){
      var teaserRecords;
        var teaserData;
        var xhrResult = result;
        var status = xhrResult.response.Header.Status;
        peopleRecordCount = xhrResult.response.RecordCount;

        if (status === "0" && peopleRecordCount !== "0") {
          teaserRecords = parseTeaser(xhrResult);
          teaserData = teaserRecords;


          var bestRecords = bestTeaserSorter(teaserData, searchName),
          teaserDataObj = {recordCount : peopleRecordCount, teasers: bestRecords};
          // amplify.store('peopleData', teaserDataObj);
          noResults = false;
          getExtraTeaserData(bestRecords);
        } else {
          noResults = true;
        }
          // trackNL("Refine Modal Final Result Count", {result_count: recordCount});

    });
  }

  var getPhoneData = function(formData){

    var url = 'https://www.beenverified.com/hk/dd/free/phoneinfo?&exporttype=jsonp' + "&phone=" + formData.phone

    var xhrData = $.ajax({
      url: url,
      dataType : 'jsonp',
    })

    $.when(xhrData).then(function(result, status){

        var data = result.results;

        if ((status === "success") && !$.isEmptyObject(data)) {
          noResults = false;
          // latlng.push(data.latitude);
          // latlng.push(data.longitude);

          teaserData = prepPhoneData(data, formData.phone);
          amplify.store('phoneData', teaserData);
        } else {
          noResults = true;
        }
    });
  }

  var getEmailData = function(formData){

    var baseUrl = 'https://www.beenverified.com/hk/dd/source/fxgJg56p?exporttype=jsonp',
        url = baseUrl + "&email=" + formData.email;

    var xhrData = $.ajax({
      url: url,
      dataType : 'jsonp',
    })

    $.when(xhrData).then(function(result){

      var xhrResult = result,
      teaserRecords = [],
      status = 0;

      if (xhrResult.results && typeof xhrResult.results.status !== 'undefined') {
        status = parseInt(xhrResult.results.status);
      }

      if (status === 200 || status === 404 || status === 202) {
        teaserRecords[0] = parseEmailTeaser(xhrResult);

        var recordCount = (status === 200 ? 1 : 0);

        if (recordCount === 0) {
          noResults = true;
        } else {
          noResults = false;
          var teaserDataObj = {
            recordCount: recordCount,
            email: result.query.email,
            teasers: teaserRecords
          };

          amplify.store('emailData', teaserDataObj);
        }
      }
    });
  }

  var getPropertyData = function(formData) {
    var baseUrl = "https://www.beenverified.com/hk/dd/teaser/property?exporttype=jsonp&address=",
        url = baseUrl + encodeURIComponent(formData.address);

    var xhrData = $.ajax({
      url: url,
      dataType: 'jsonp'
    })

    $.when(xhrData).done(function(result){
      var teaserRecords = [],
      xhrResult = result;

      teaserRecords[0] = xhrResult;

      var teaserDataObj = {
        recordCount: _.isEmpty(xhrResult) ? 0 : 1,
        address: formData.address,
        teasers: teaserRecords
      }

      // seems like address request never returns no results, check if there is a mailing address attribute, if no we
      // assume this isnt a real address and set the count to 0
      //
      if (!teaserDataObj.teasers[0].mailing_address.full === "") {
        teaserDataObj['recordCount'] = 0;
      }

      if (teaserDataObj.recordCount === 0) {
        noResults = true;
      } else {
        amplify.store('propertyData', teaserDataObj);
        noResults = false;
      }
    })
  }


  // Form Validations

  $peopleSearchForm = $('#people_search');
  $phoneSearchForm = $('#phone_search');
  $emailSearchForm = $('#email_search');
  $propertySearchForm = $('#property_search');
  $companyForm = $('#company_form');


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
      var formData = serializeToObject(($(form).serializeArray()));
      getPeople(formData);
      hideSearches("people");
    }
  });


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
      var formData = serializeToObject(($(form).serializeArray()));
      getPhoneData(formData);
      hideSearches("phone");
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
        var formData = serializeToObject(($(form).serializeArray()));
        getEmailData(formData);
        hideSearches("email");
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
      var formData = serializeToObject(($(form).serializeArray()));
      getPropertyData(formData);
      hideSearches("property");
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
      $('#company-modal').modal('hide');
    }

  })


  //Transition to loading  animation

  var changeLoadingText = function(searchType) {
    $loadingText = $('.loading-animation h3');
    window.setTimeout(function(){
      $loadingText.hide();
      $loadingText.text('Looking Up Billions of Records...').fadeIn();
      window.setTimeout(function(){
        amplify.store('peopleData', {
          "teasers" : recordsWithTeaser,
          "recordCount" : peopleRecordCount,
          "searchedName" : searchName
        });
        $loadingText.hide();
        $loadingText.text('Building Sample Report...').fadeIn();
        window.setTimeout(function(){
          if (noResults) {
            resetSearch();
          } else {
            showResults(searchType);
          }
        }, 4000)
      }, 4000)
    },4000)
  }
var hideSearches = function(searchType) {
  $('article.contact-panel').hide();
  $('.start-header').hide();
  startLoading(searchType);
}

var showResults = function() {
  window.location.href = "https://www.knowthycustomer.com/lp/b56a8b/3/search-results";
}

var resetSearch = function() {
  $('.loading-headers').addClass('loading-hidden');
  $startHeader = $('.start-header');
  $startHeader.find('h1').text("We Didn't Find a Match. Please Try Again.");
  $startHeader.find('p').text("Check for typos, refine your search, or try a different search input.");
  $('.loading-animation').hide();
  $('article.contact-panel').show();
  $startHeader.show();
}

var startLoading = function(searchType) {
  $('body').scrollTop(0);
  $('.loading-animation').show();

  switch (searchType) {
    case 'people':
    $('#people_loading').removeClass('loading-hidden');
      break;
    case 'phone':
      $('#phone_loading').removeClass('loading-hidden');
      break;
    case 'email':
      $('#email_loading').removeClass('loading-hidden');
      break;
    case 'property':
      $('#property_loading').removeClass('loading-hidden');
      break;
  }
  changeLoadingText(searchType);
}

$addressField = $('#address_field');
// smarty address stuff
var liveaddress = $.LiveAddress({
  debug: false,
  key: "536315927505668",
  addresses: [{
    street: $addressField
  }],
  ambiguousMessage: "Choose the exact address",
  invalidMessage: "We did not find that address in our records<br><span class='line_two'>Be sure to include a building number and leave out resident names</span>",
  stateFilter: "AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY",
  submitVerify: true
});

liveaddress.on("AddressWasAmbiguous", function(event, data, previousHandler) {
  // $('a.smarty-popup-close').html('<span class="glyphicon glyphicon-remove-circle"></span>');
  previousHandler(event, data);
});

// refocus search form if invalid
liveaddress.on("InvalidAddressRejected", function(event, data, previousHandler) {
  $addressField.focus();
});

liveaddress.on("AddressChanged", function(event, data, previousHandler) {
  $addressField.removeClass("success");
  previousHandler(event, data);
});

liveaddress.on("AddressAccepted", function(event, data, previousHandler) {
  var chosen = data.response.chosen;

  if (chosen) {
    amplify.store('searchData', {
      address: chosen.delivery_line_1 + " " + chosen.last_line,
      street: chosen.delivery_line_1 || "",
      last_line: chosen.last_line || "",
      city: chosen.components.city_name || "",
      state: chosen.components.state_abbreviation || "",
      unit: chosen.components.secondary_number || "",
      zip5: chosen.components.zipcode || "",
      zip4: chosen.components.plus4_code || ""
    });

  } else {
    amplify.store('searchData', {
      address: $('#property_search input').val()
    });
  }

  $addressField.addClass("success");
  $addressField.focus();

  previousHandler(event, data);
});

// autofocus the first input on click of box
var clickedPanel;
$('.contact-panel').click(function(e){
  if (clickedPanel) {
    $(clickedPanel).removeClass("focused-panel");
  }

  $(this).addClass("focused-panel");
  clickedPanel = this;

  if ($(e.target).is('#ln') || $(e.target).is('#city') || $(e.target).is('#state') || $(e.target).is('button')){
    return;
  }
  $article = $(e.currentTarget);
  $('article').each(function(i, article){
    if ($article.is($(article))) {
      return;
    }
    var inputs = $(article).find('input');
    inputs.val('');
  });

  $firstInput = $article.find('input:first');
  $firstInput.focus();
});

  var initialize = function () {
    setLastVisit();
    setColumnState();
    /*$('#company-modal').modal('show');*/

  /* initDownsells(); */

  };

  initialize();

}(jQuery));
