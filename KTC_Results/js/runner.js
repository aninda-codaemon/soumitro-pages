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

//sets max-width for api boxes to be neighbor height
var apiBoxHeight = function(){
  $('.results article').each(function(index, article){
    $apiBox = $(article).next();
    // $apiBox.css({'max-height' : $(article).innerHeight()})
    $dataBox = $apiBox.find('.data-box');
    //-20 is for the padding
    $dataBox.css({'max-height' : $(article).innerHeight() - $apiBox.find('h5').outerHeight(true) - 20});
  })
}

window.addEventListener('resize', function(){
  apiBoxHeight();
})

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
  var postLeadForm = function(dataArray) {
    // var formVals = {};
    //   _.forEach(dataArray, function(v, k) {
    //       formVals[v.name] = v.value;
    //   });
    //
    //   var leadData = {};
    //     leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
    //     leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
    //     leadData['lead[email]'] = formVals['user[email]'] || '';
    //     leadData['lead[zip]'] = formVals['account[zip]'] || '';
    //     leadData['lead[state]'] = formVals['account[state]'] || '';
    //     leadData['record_search[first_name]'] = firstName;
    //     leadData['record_search[last_name]'] = lastName;
  }
  $leadForm = $('#leadBox-form');

  $.validator.addMethod("phoneUS", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
  }, "Please specify a valid phone number");

 $leadForm.validate({

    rules: {
      "lead[first_name]": "required",
      "lead[last_name]": "required",
      "lead[email]": {
        required: true,
        email: true
      },
      "lead[phone]": {
        required: true,
        phoneUS: true
      },
      "lead[company]": "required",
      "lead[role]": "required",
      "lead[use]": "required",
      tos: "required"
    },

    messages: {
      "lead[first_name]": "Please enter a first name",
      "lead[last_name]": "Please enter a last name",
      "lead[email]": "Please enter a valid email",
      "lead[phone]": "Please enter a valid phone",
      "lead[company]": "Please enter a company",
      "lead[role]": "Please enter a role",
      "lead[use]": "Please select an option",
      tos: "Please accept our Terms of Service"
    },

    errorPlacement: function(error, element){
      error.insertBefore(element);
    },

    submitHandler: function(form, e) {
      e.preventDefault();
      postLeadForm($(form).serializeArray());
      $leadForm.modal('hide');
    }
  });

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

var showResults = function() {
  var searched,
      data = amplify.store().searchData;

  if (data.fn) {
    $('#people-results').show();
  } else if (data.phone) {
    $('#phone-results').show();
  } else if (data.email){
    $('#email-results').show();
  } else if (data.address) {
    $('#property-results').show();
  }
}

  var initialize = function () {
    showResults();
    apiBoxHeight();
    setLastVisit();
    setColumnState();
    $('#leadBox-modal').modal('show');


  /* initDownsells(); */

  };

  initialize();

}(jQuery));
