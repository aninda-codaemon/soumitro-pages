;(function ($) {

  var LOADING_TEXT = {
    "people": "Use our People Search API to validate data, reduce risk, update records, enhance contact lists, and so much more.",
    "phone": "Use our Phone Search API to see the owner's name, validate data, reduce risk, update records, enchance contact lists, and so much more.",
    "email": "Use our Email Search API to validate data, update records, enchance, contact lists, and so much more.",
    "property": "Use our Property Search API to validate data, reduce risk, update your records, enhance contact lists, and so much more."
  }
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

//sets max-width for api boxes to be neighbor height
var apiBoxHeight = function(){
  $('.results article').each(function(index, article){
    $apiBox = $(article).next();
    // $apiBox.css({'max-height' : $(article).innerHeight()})
    $dataBox = $apiBox.find('.data-box');
    $dataBox.css({'max-height' : $(article).innerHeight() - $apiBox.find('h5').outerHeight(true)});
  })
}

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

// Local sotrage object prep functions
  var parseTeaser = function(data) {
    var recordCount = parseInt(data["response"]["RecordCount"]),
        records;

    if (recordCount === 1) {
      records = [data["response"]["Records"]['Record']];
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

  var prepPhoneData = function (data) {

    var prepped = {
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

  // Form Validations

  var hideSearches = function(searchType) {
    $('article.contact-panel').hide();
    $('.start-header').hide();
    startLoading(searchType);
  }

  var getPeople = function(formData){
    var fn = formData.fn || "",
        ln = formData.ln || "",
        city = formData.city || "",
        state = formData.state || "";

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

        if (status === "0") {
          teaserRecords = parseTeaser(xhrResult);
          teaserData = teaserRecords;

          var recordCount = xhrResult.response.RecordCount;

          // trackNL("Refine Modal Final Result Count", {result_count: recordCount});

          var teaserDataObj = {recordCount: recordCount, teasers: teaserData};
          amplify.store('peopleData', teaserDataObj);
        }
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
          // latlng.push(data.latitude);
          // latlng.push(data.longitude);

          teaserData = prepPhoneData(data);
          amplify.store('phoneData', teaserData);
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

        var teaserDataObj = {
          recordCount: recordCount,
          email: result.query.email,
          teasers: teaserRecords
        };

        amplify.store('emailData', teaserDataObj);
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

      amplify.store('propertyData', teaserDataObj);
    })
  }

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

 // $peopleSearchForm.submit(function(e){
 //   e.preventDefault();
 //   var formData = serializeToObject(($(e.target).serializeArray()));
 //    getPeople(formData);
 //    hideSearches("people");
 // })



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
      return false;
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

  //Transition to search animation
var changeLoadingText = function(searchType) {
    $loadingText = $('.loading-animation h3');
    window.setTimeout(function(){
      $loadingText.hide();
      $loadingText.text('Looking Up Billions of Records...').fadeIn();
      window.setTimeout(function(){
        $loadingText.hide()
        $loadingText.text('Building Sample Report...').fadeIn();
        window.setTimeout(function(){
          showResults(searchType);
        }, 7000)
      }, 7000)
    },7000)
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

var clickedPanel;
$('.contact-panel').click(function(){
  if (clickedPanel) {
    $(clickedPanel).removeClass("focused-panel");
  }

  $(this).addClass("focused-panel");
  clickedPanel = this;
})

  var initialize = function () {
    apiBoxHeight();
    setLastVisit();
    setColumnState();


  /* initDownsells(); */

  };

  initialize();

}(jQuery));
