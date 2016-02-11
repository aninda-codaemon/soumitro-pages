;
(function($) {
  var trackNL = function(evtName, props) {
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

  // teaser links event
  $('.scroll-to-subscribe').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#subscribe').offset().top
    }, 500);
  });

  // Initialize comments slider
  $('#comments').lightSlider({
    item: 1,
    loop: true,
    controls: false,
    slideMove: 1,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600
  });

  // Initialize cvv popover for Bootstrap 3
  $('.cvv-tip').popover({
    container: 'body',
    trigger: 'hover focus',
    placement: 'auto',
    title: '<p><strong>What is a Security Code?</strong></p>',
    html: true,
    content: function() {
      return '<p><strong>Visa, MasterCard, and Discover</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Back of Card</strong><br>Three digits located on the right of the signature strip.</small></p></div></div><p><strong>American Express</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Front of Card</strong><br>Four digits located on either the left or right side.</small></p></div>';
    }
  });

  // Initialize security popover for Bootstrap 3
  $('.secure').popover({
    container: 'body',
    trigger: 'hover focus',
    placement: 'auto',
    html: true,
    content: function() {
      return '<p><span class="glyphicon glyphicon-lock"></span> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
    }
  });

  var $selectionWrap = $('.package');

  // Update terms & conditions based on selected plan
  var updatePlanLegal = function($selectionSelected) {

    var $planPrice = $selectionSelected.find('.price-label');

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

    $selectionWrap.removeClass('package-selected');
    $selectionSelected.addClass('package-selected');
  };

  var highlightSelection = function() {
    $selectionWrap.removeClass('package-selected');
    $(this).addClass('package-selected');
    $(this).find("input[type=radio].deal-radio").prop("checked", true);
    updatePlanLegal($(this));
  };

  $selectionWrap.on('click', highlightSelection);

  /* Set current year inside footer */
  ;
  (function($) {
    var currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      $currentYear = $('.current-year');

    $currentYear.html(currentYear);
  }(jQuery));

  var verifySeal = function() {
    $('.secure').on('click', function() {
      var left = ($(window).width() / 2) - (900 / 2),
        top = ($(window).height() / 2) - (600 / 2),
        popup = window.open("https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.beenverified.com&lang=en", "popup", "width=900, height=600, top=" + top + ", left=" + left);
    });
  };

  var reportHeap = function(evt, opt) {
    if (typeof window.heap !== "undefined" && heap.track) {
      heap.track(evt, opt);
    }
  };

  var $bounceBackBtn = $('#iModal-back'),
    $bounceExitBtn = $('#iModal-exit'),
    $goToNextPage = $('#show-dollar-trial'),
    $iOSModal = $('#iModal'),
    $iOSModalTrial = $('#iModal-trial'),
    $iModalX = $("#imodal-x");

  var bounceBack = function() {
    trackNL('onBack Modal - Rejected');
    //window.location.href = $("body").data("search-page");
  };

  var bounceExit = function() {
    $iOSModal.modal('hide');
    window.setTimeout(function() {
      $iOSModalTrial.modal('show');
    }, 300);
  };

  $bounceBackBtn.on('click', bounceBack);
  $bounceExitBtn.on('click', bounceExit);
  $goToNextPage.on('click', function() {
    trackNL('onBack Modal - Accepted');
    window.location.href = $("body").data("next-page");
  });

  $iModalX.on('click', function() {
    trackNL('onBack Modal - Exited');
  });


  var initDownsells = function() {

    var VWO_CHECK_INTERVAL = 3000,
      CHECK_TIMEOUT = 5000,
      timeElapsed = 1000;

    var activateDownsells = function() {
      if (typeof downsell !== "undefined" && typeof downsell.init === "function") {
        downsell.init({
          onBack: {
            elem: "#iModal-trial",
            cb: function() {}
          }
        });
      }
    };

    var vwoIntervalId,
      vwoExists = typeof _vwo_code !== "undefined" && typeof _vwo_code.finished === 'function';

    if (vwoExists) {
      vwoIntervalId = window.setInterval(function() {
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

  var initialize = function() {
    verifySeal();
    setLastVisit();

    var selectedPlan = $(".package-selected");
    updatePlanLegal(selectedPlan);

    initDownsells();
  };

  initialize();

}(jQuery));
