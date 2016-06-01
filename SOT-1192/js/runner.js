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

  /* Initialize cvv popover for Bootstrap 3 */
  $('.cvv-img').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      title:'<p><strong>What is a Security Code?</strong></p>',
      html: true,
      content: function () {
          return '<p><strong>Visa, MasterCard, and Discover</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Back of Card</strong><br>Three digits located on the right of the signature strip.</small></p></div></div><p><strong>American Express</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Front of Card</strong><br>Four digits located on either the left or right side.</small></p></div>';
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

  // when selecting payment option, if paypal is checked then show upsell
  $('.payOptionSelect input').click(function() {
    if ($('#paypal').is(':checked')) {
      $('#upsellJL').show();
    } else {
      $('#upsellJL').hide();
    }
  });

  // when filling out the cc form, if all fields are validated then show upsell
  $('.cc-wrapper .form-control').on('change blur', function() {
    var inputCount = $('.cc-wrapper .form-control').length;
    var verifiedCount = $('.cc-wrapper .form-control.input-success').length;

    if (verifiedCount === inputCount) {
      $('#upsellJL').show();
    } else {
      $('#upsellJL').hide();
    }
  });

  // @TODO: this has bugs that needs fixing
  $('#upsellJL .checkbox').click(function() {
    var currentTotal = $('.summary-total-price').text(),
        upsellPrice = $('#upsellJL .upsell-price').text().slice(1);

    if ($('#upsellCheckbox').is(':checked')) {
      console.log('upsell checked');
      var upsellTotal = Number(currentTotal) + Number(upsellPrice);
      $('.summary-total-price').html(upsellTotal);
    } else {
      console.log('upsell unchecked');
      var defaultTotal = Number(currentTotal) - Number(upsellPrice);
      $('.summary-total-price').html(defaultTotal);
    }
  });

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
    setColumnState();

    var selectedPlan = $(".selection-selected");
    updatePlanLegal(selectedPlan);

  initDownsells();
  };

  initialize();

}(jQuery));
