;(function ($) {
  // NoLimit/Heap init
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

  var reportHeap = function (evt, opt) {
    if (typeof window.heap !== "undefined" && heap.track) {
      heap.track(evt, opt);
    }
  };

  // Test for Safari private browsing mode
  try {
    localStorage.test = 2;
  } catch (e) {
    trackNL('Safari Private Browsing');
  }

  // Initialize cvv popover for Bootstrap 3
  $('.img-cards').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      title:'<h6 class="title">What is a Security Code?</h6>',
      html: true,
      content: function () {
        return '<p class="sub-title">Visa, MasterCard, and Discover</p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6"><p class="popover-text"><strong class="text-break">Back of Card</strong>Three digits located on the right of the signature strip.</p></div></div><p class="sub-title">American Express</p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6"><p class="popover-text"><strong class="text-break">Front of Card</strong>Four digits located on either the left or right side.</p></div>';
      }
  });

  // Initialize security popover for Bootstrap 3
  $('.img-secure').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      html: true,
      content: function () {
        return '<p class="popover-text"><i class="fa fa-lock icon"></i> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
      }
  });

  var verifySeal = function () {
    $('.img-secure').on('click', function () {
      var left  = ($(window).width()/2)-(900/2),
          top   = ($(window).height()/2)-(600/2),
          popup = window.open ("https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.beenverified.com&lang=en", "popup", "width=900, height=600, top="+top+", left="+left);
    });
  };

  // Set current year inside footer
  ;(function ($) {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');
    $currentYear.html(currentYear);
  }(jQuery));

  // downsells
  var $bounceBackBtn = $('#iModal-back'),
      $bounceExitBtn = $('#iModal-exit'),
      $goToNextPage  = $('#show-dollar-trial'),
      $iOSModal      = $('#iModal'),
      $iOSModalTrial = $('#iModal-trial'),
      $iModalX       = $("#imodal-x");

  var bounceBack = function () {
    reportHeap('onBack Modal - Rejected');
    window.location.href = $("body").data("search-page");
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
    reportHeap('onBack Modal - Accepted');
    window.location.href = $("body").data("next-page");
  });

  $iModalX.on('click', function() {
    reportHeap('onBack Modal - Exited');
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
    //amplify.store("lastVisit", Date.now());
  };

  var init = function() {
    verifySeal();
    setLastVisit();
    initDownsells();

    $('.focus-on').focus();
  };

  init();
}(jQuery));
