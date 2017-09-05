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

  var facadeLocalStorage = {
    getKey: function(key) {
      return '__amplify__' + key;
    },
    getItem: function(key) {
      var item = localStorage.getItem(this.getKey(key));
      return JSON.parse(item);
    },
    setItem: function(key, value) {
      var itemValue = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), itemValue);
    }
  };

  var initialPropertySearchData = {
    street: '',
    address: '',
    last_line: ''
  };

  var initialPropertyTeaserData = {
    teasers:
      {
        parcel_address: {
          parsed: {
            primary_address_number: '',
            pre_direction: '',
            street_name: '',
            street_type: '',
            post_direciton: '',
            unit_number: '',
            city: '',
            state: '',
            zip: ''
          }
        }
      }
  };

  leadData = localStorage.getItem('__amplify__leadData') ? JSON.parse(localStorage.getItem('__amplify__leadData')) : {};

  var teaserData = facadeLocalStorage.getItem('propertyTeaserData') || {},
      propertyTeaserData;

  // added this to account for the various ways propertyTeaserData has been stored.
  // It now is soterd under namespace 'data' but used to be in teasers array.
  // his should make everything backwards compatible

  if (teaserData.teasers && typeof teaserData.teasers === "object") {
    propertyTeaserData = teaserData;
  } else if (Array.isArray(teaserData.teasers) && teaserData.teasers[0]){
    propertyTeaserData = teaserData.teasers[0];
    propertyTeaserData.teasers = teaserData.teasers[0];
  }

  var applicationState = {
    ownerName: '',
    propertySearchData: facadeLocalStorage.getItem('propertySearchData') || initialPropertySearchData,
    propertyCurrentRecord: facadeLocalStorage.getItem('propertyCurrentRecord') || {},
    propertyTeaserData: propertyTeaserData || initialPropertyTeaserData,
    displayOwner: false,
    first_name: leadData['account[first_name]'],
    last_name : leadData['account[last_name]'],
    email: leadData['user[email]'],
    ccNum: '',
    cvv: '',
    address_zip: '',
    tosChecked: false,
    ccFields: true
  };

  Vue.use(window.vuelidate.default);
  var required = window.validators.required,
      email = window.validators.email,
      requiredIf = window.validators.requiredIf,
      minLength = window.validators.minLength,
      maxLength = window.validators.maxLength,
      numeric = window.validators.numeric,
      isCC = function(){
        return true;
      }

  var propertyInfo = new Vue({
    el: '#wrapper',
    data: applicationState,
    computed: {
      street: function() {
        var pre_dir = (_.trim(this.propertyTeaserData.teasers.parcel_address.parsed.pre_direction)) ? this.propertyTeaserData.parcel_address.parsed.pre_direction + " " : "";
        var post_dir = (_.trim(this.propertyTeaserData.teasers.parcel_address.parsed.post_direction)) ? this.propertyTeaserData.parcel_address.parsed.pre_direction + " " : "";
        var address = (this.propertyTeaserData.teasers.parcel_address.parsed.primary_address_number ? this.propertyTeaserData.teasers.parcel_address.parsed.primary_address_number : "") + " " + pre_dir + this.propertyTeaserData.teasers.parcel_address.parsed.street_name + " " + this.propertyTeaserData.teasers.parcel_address.parsed.street_type.capitalize() + post_dir + (this.propertyTeaserData.teasers.parcel_address.parsed.unit_number ? this.propertyTeaserData.teasers.parcel_address.parsed.unit_number : "");

        return address.addressize();
      },
      city: function() {
        return this.propertyTeaserData.teasers.parcel_address.parsed.city;
      },
      state: function() {
        return this.propertyTeaserData.teasers.parcel_address.parsed.state;
      },
      zip: function() {
        return this.propertyTeaserData.teasers.parcel_address.parsed.zip;
      },
    },

    methods: {

      submitHandler: function(e){
        debugger

        if (this.$v.$invalid) {
          e.preventDefault();
        } else {
          // this.postLead();
        }
      },

      togglePayment: function(e) {
        if (e.target.id === 'credit') {
          this.ccFields = true;
        } else if (e.target.id === "paypal-radio-button"){
          this.ccFields = false;
        }
      }
    },

    validations: {
      first_name: {
        required
      },

      last_name: {
        required
      },
      email: {
        required,
        email
      },
      ccNum: {
        requiredIf: requiredIf(function(){ return this.ccFields; }),
        isCC: isCC(),
        numeric
      },
      cvv: {
        requiredIf: requiredIf(function(){ return this.ccFields; }),
        minLength: minLength(3),
        maxLength: maxLength(4),
        numeric
      },
      address_zip: {
        requiredIf: requiredIf(function(){ return this.ccFields; }),
        minLength: minLength(5),
        numeric
      },
      tosChecked: {
        required: required
      }
    }
  });

  window.$v = propertyInfo.$v;

  /* Initialize cvv popover for Bootstrap 3 */
  $('.cvv-img').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      title:'<p><strong>What is a Security Code?</strong></p>',
      html: true,
      content: function () {
          return '<p><strong>Visa, MasterCard, and Discover</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//cdn1.beenverified.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Back of Card</strong><br>Three digits located on the right of the signature strip.</small></p></div></div><p><strong>American Express</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//cdn1.beenverified.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Front of Card</strong><br>Four digits located on either the left or right side.</small></p></div>';
      }
  });
  /* Initialize security popover for Bootstrap 3 */
  $('#secure-lock').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      html: true,
      content: function () {
          return '<p><span class="glyphicon glyphicon-lock"></span> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
      }
  });
  $('#secure-text').on('hover' , function () {
    $('#secure-lock').popover('toggle');
  });

  var $selectionWrap = $('.selection-wrap');

  // Update terms & conditions based on selected plan
  var updatePlanLegal = function ($selectionSelected) {

    var $planPrice = $selectionSelected.find(".plan-price");

    var totalPrice = $planPrice.data('plan-price'),
        type = $planPrice.data('plan-type'),
        monthlyPrice = $planPrice.data('monthly-price'),
        termLength = $planPrice.data('term-length');


    var $priceHTML = $('#legal-price'),
        $typeHTML = $('#legal-type'),
        $summaryTermHTML = $('#summary-term'),
        $summaryMonthPriceHTML = $('#summary-month-price'),
        $summaryTotalPriceHTML = $('.summary-total-price');

    $priceHTML.html(totalPrice);
    $summaryTotalPriceHTML.html(totalPrice);
    $summaryMonthPriceHTML.html(monthlyPrice);
    $typeHTML.html(type);
    $summaryTermHTML.html(termLength);

    $selectionWrap.removeClass('selection-selected');
    $selectionSelected.addClass('selection-selected');
  };

  var highlightSelection = function() {
    $selectionWrap.removeClass('selection-selected');
    $(this).addClass('selection-selected');
  $(this).find("input[type=radio].plan_name_radio").prop("checked", true);
    updatePlanLegal($(this));
  };

  $selectionWrap.on('click', highlightSelection);

  // Secure Credit Card lock animation
  var $secureLockIcon = $('#secure-lock'),
      $ccInput = $('#credit_card_card_number'),
      $secureText = $('#secure-text');

      // $secureText.hide();

  $ccInput.on('focus' , function () {
      $secureLockIcon.addClass('secure-this');
      $secureText.fadeIn();
  });

  $ccInput.on('change blur' , function () {
    var ccInputLength = $ccInput.val().length;

    if (!ccInputLength) {
      $secureText.hide();
      $secureLockIcon.removeClass('secure-this');
    }
  });

  /* Set current year inside footer */
  ;(function ($) {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');

    $currentYear.html(currentYear);
  }(jQuery));

  // Clicking Credit Card logo will focus on input field
  var $ccAccept = $('.cc-accept');

  $ccAccept.on('click' , function () {
    $ccInput.focus();
  });

  var verifySeal = function () {
    $(".verify-seal").on("click", function () {
      var left  = ($(window).width()/2)-(900/2),
          top   = ($(window).height()/2)-(600/2),
          popup = window.open ("https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.beenverified.com&lang=en", "popup", "width=900, height=600, top="+top+", left="+left);
    });
  };

  var playVideo = function () {
    $('#youtube').click(function(){
        var video = '<iframe src="'+ $(this).attr('data-video') +'"></iframe>';
        $(this).replaceWith(video);
    });
  };

  var reportHeap = function (evt, opt) {
    if (typeof window.heap !== "undefined" && heap.track) {
      heap.track(evt, opt);
    }
  };

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


  var initDownsells = function () {

    var VWO_CHECK_INTERVAL = 3000,
        CHECK_TIMEOUT = 5000,
        timeElapsed = 1000;

    var activateDownsells = function () {
      if (typeof downsell !== "undefined" && typeof downsell.init === "function") {
        downsell.init({
          onBack: {
            elem: "#iModal-trial",
            cb: function () {}
          }
        });
      }
    };

    var vwoIntervalId,
        vwoExists = typeof _vwo_code !== "undefined" && typeof _vwo_code.finished === 'function';

    if (vwoExists) {
      vwoIntervalId = window.setInterval(function () {
        timeElapsed += VWO_CHECK_INTERVAL;
        if (timeElapsed > CHECK_TIMEOUT || _vwo_code.finished()) {
          window.clearInterval(vwoIntervalId);
          activateDownsells();
        }
      }, VWO_CHECK_INTERVAL);
    } else {
      activateDownsells();
    }
  };

  var setLastVisit = function() {
    Cookie.create("lastVisit", Date.now(), 30);
    trackNL('lastVisit Cookie Set');
    //amplify.store("lastVisit", Date.now());
  }

  var initialize = function () {
    verifySeal();
    playVideo();
    setLastVisit();

    var selectedPlan = $(".selection-selected");
    updatePlanLegal(selectedPlan);

  initDownsells();
  };

  initialize();

}(jQuery));
