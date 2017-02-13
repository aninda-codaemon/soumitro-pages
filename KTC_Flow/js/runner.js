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

  var hideSearches = function() {
    $('article.contact-panel').hide();
    startLoading();
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
      jsonpCallback: 'parseEmailTeaser'
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
      hideSearches();
      var formData = serializeToObject(($(form).serializeArray()));
      getPeople(formData);
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
        var formData = serializeToObject(($(form).serializeArray()));
        getEmailData(formData);
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
      $('#company-modal').modal('hide');
    }

  })

  //Transition to search animation

var startLoading = function() {
  $('.loading-animation').show();
}

var clickedPanel;
$('.contact-panel').click(function(){
  if (clickedPanel) {
    $(clickedPanel).removeClass("focused-panel");
  }
  // $(this).find('button').show();
  $(this).addClass("focused-panel");
  clickedPanel = this;
})




  var initialize = function () {
    setLastVisit();
    setColumnState();
    // $('#company-modal').modal('show');

  /* initDownsells(); */

  };

  initialize();

}(jQuery));
