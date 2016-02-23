(function ($) {
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

  window.onerror = function () {
    try {
      trackNL('JS Error', {data: JSON.stringify(arguments)});
    } catch (err) { /* Suppress any tracking issues. */ }
  };

  /* Make sure the first plan is selected - IE10 fix. */
  var $planRows = $("input[name=subscription_plan_name]");
  if ($planRows.length > 0) {
    $planRows[0].click();
  }

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
  
  // Set current year inside footer
  ;(function ($) {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');
    $currentYear.html(currentYear);
  }(jQuery));

  var $selectionWrap = $('.selection-wrap');

  // Update terms & conditions based on selected plan
  // var updatePlanLegal = function ($selectionSelected) {

  //   var $planPrice = $selectionSelected.find(".plan-price");

  //   var totalPrice = $planPrice.data('plan-price'),
  //       type = $planPrice.data('plan-type'),
  //       monthlyPrice = $planPrice.data('monthly-price'),
  //       termLength = $planPrice.data('term-length');


  //   var $priceHTML = $('#legal-price'),
  //       $typeHTML = $('#legal-type'),
  //       $summaryTermHTML = $('#summary-term'),
  //       $summaryMonthPriceHTML = $('#summary-month-price'),
  //       $summaryTotalPriceHTML = $('.summary-total-price');

  //   $priceHTML.html(totalPrice);
  //   $summaryTotalPriceHTML.html(totalPrice);
  //   $summaryMonthPriceHTML.html(monthlyPrice);
  //   $typeHTML.html(type);
  //   $summaryTermHTML.html(termLength);
  // };

  var highlightSelection = function() {
    $selectionWrap.removeClass('selection-selected');
    $(this).addClass('selection-selected');

    // updatePlanLegal($(this));
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

  // $ccInput.on('keyup' , function () {
  //   var ccInputLength = $ccInput.val().length;

  //   if (ccInputLength === 2) {
  //     console.log('Bang!');
  //   }
  // });

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
      try {
        heap.track(evt, opt);
      } catch (err) { }
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
    trackNL('onBack Modal - Accepted');
    window.location.href = $("body").data("next-page");
  });

  $iModalX.on('click', function() {
    trackNL('onBack Modal - Exited');
  });

   var wrapOnbeforeunload = function () {
       var originalOnbeforeunload = window.onbeforeunload;

       window.onbeforeunload = function () {
         var hours = $("#hours").html(),
             mins = $("#minutes").html(),
             secs = $("#seconds").html();
         amplify.store("countdown", {hours: hours, mins: mins, secs: secs});
         if (typeof originalOnbeforeunload !== "undefined") {
           return originalOnbeforeunload();
         }
       };
   };


  //Countdown Timer
  var $hours   = $("#hours"),
      $minutes = $("#minutes"),
      $seconds = $("#seconds"),
      hours    = 2,
      minutes  = 59,
      seconds  = 59;

  var countingDown = function () {
    var intervalTimer = setInterval(function () {

      //Timer stops
      if (hours === 0 && minutes === 0 && seconds === 0) {
        window.clearInterval(intervalTimer);
        $('#downsell-timer').slideUp();
        trackNL("Downsell Timer Expired");
        return;
      }

      reset = 59;
      seconds -= 1;

      if (seconds < 0) {
        minutes -= 1;
        seconds = reset;
      }

      if (minutes < 0) {
        hours -= 1;
        minutes = reset;
      }

      $hours.html(hours);
      $minutes.html((minutes <= 9) ? ('0' + minutes) : minutes);
      $seconds.html((seconds <= 9) ? ('0' + seconds) : seconds);

    }, 1000);
  };


  var checkCountdownState = function () {
    var countdown = amplify.store("countdown");

    if (countdown) {  // its not undefined, null, "", 0, false
      var hrs = parseInt(countdown.hours, 10),
          mins = parseInt(countdown.mins, 10),
          secs = parseInt(countdown.secs, 10);

      // Set the globals to stored time.
      hours = hrs;
      minutes = mins;
      seconds = secs;
    }
  };

  var initialize = function () {
    verifySeal();
    playVideo();
    checkCountdownState();
    countingDown();

    var selectedPlan = $(".selection-selected");
    // updatePlanLegal(selectedPlan);

    downsell.init({
      onBack: {
        elem: "#iModal-trial",
        cb: function () {}
      }
    });
    wrapOnbeforeunload();
  };

  initialize();

}(jQuery));