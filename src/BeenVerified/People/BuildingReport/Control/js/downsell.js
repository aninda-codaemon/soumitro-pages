/*
 * Downsell.js - Modified to add onBreakingPlane.
 * NOTE: This version hides any existing modal at the moment that a downsell modal is triggered.
 * Beware!
 */
;(function ($, _) {

  var noop = function () {};
  Date.now = Date.now || function() { return +new Date; };

  var defaults = {
    onBlur: {
      elem: "#downsell-blur",
      override: false,
      cb: noop,
      outOfFocusDuration: 60 * 1000
    },
    onBack: {
      elem: "#downsell-back",
      override: false,
      cb: noop
    },
    onIdle: {
      elem: "#downsell-idle",
      override: false,
      cb: noop,
      inactiveThreshold: 30 * 1000
    },
    onUnload: {
      elem: "#downsell-unload",
      override: false,
      cb: noop
    },
    onBreakingPlane: {
      elem: "#downsell-breaking",
      override: false,
      cb: noop,
    }
  };

  var isIE = navigator.userAgent.toLowerCase().indexOf('msie') > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./),
      isFF = navigator.userAgent.toLowerCase().indexOf ('firefox') > -1,
      isAndroid = navigator.userAgent.toLowerCase().indexOf ('android') > -1,
      isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  var downsell = {},
      opts = {},
      stop = false; // stops triggering downsells.

  var activeModal;

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
    if (typeof dataLayer !== 'undefined') {
      var event = { event: 'flowrida_visitor_event' };
      var eventLabel = { eventLabel: evtName };
      var gaData;
      if (props) {
        gaData = Object.assign(event, eventLabel, props); 
        dataLayer.push(gaData);
      } else {
        gaData = Object.assign(event, eventLabel); 
        dataLayer.push(gaData);
      }
    }
  };

  var showModal = function (id, eventType, suppress, durSecs) {

    if (eventType) {
      var props = {};
      props.downsell_id = id;
      if (durSecs) {
        props.duration = determineDurationBucket(durSecs);
      }
      trackNL(eventType + " Modal - Viewed", props);
    }

    // Don't show any other modal. BEWARE!
    $(".modal.in").modal('hide');

    // Don't show any other downsell if back/unload modals are already shown.
    if (stop ||
        activeModal === opts.onBack.elem ||
        activeModal === opts.onUnload.elem) {
      return;
    }

    if (suppress !== true) {
      $(activeModal).modal('hide');

      $(id).modal({
        backdrop:'static',
        keyboard:false,
        show:true
      });

      activeModal = id;
      stop = true;
    }
  };

  var determineDurationBucket = function (duration) {
    var buckets = {
      30: "30s - 44s",
      45: "45s - 59s",
      60: "60s - 74s",
      75: "75s - 89s",
      90: "90s - 104s",
      105: "105s - 119s",
      120: "120s - 134s",
      135: "135s - 149s",
      150: "150s - 164s"
    };

    if (duration < 30) {
      return "Less than 30s";
    }

    if (duration > 165) {
      return "More than 165s";
    }

    var msg = "", found = false;
    _.forEach(buckets, function (v, k) {
      var nextVal = (parseInt(k, 10) + 15);
      if (!found && duration >= parseInt(k, 10) && duration < nextVal) {
        found = true;
        msg = v;
      }
    });
    return msg;
  };

  /* OnBlur - Fired when the user returns to window after X amount of time. */

  var blurTime,
      onBlurShown = false;

  var onBlur = function () {

    $(window).on("blur", function () {
      if (onBlurShown) return;
      blurTime = Date.now();
    });

    $(window).on("focus", function () {
      if (onBlurShown) return;
      var timeNow = Date.now(),
          outOfFocusDuration = timeNow - blurTime;
      if (outOfFocusDuration > opts.onBlur.outOfFocusDuration) {
        onBlurShown = true;
        showModal(opts.onBlur.elem, "onBlur", true, (outOfFocusDuration / 1000));
      }
    });
  };

  /* OnBack - Fired when the user hits the back button. */

  var markHash = function (cb) {
    window.location.hash = "";
    $("#mark-hash").click();
    window.setTimeout(function () {
     window.location.hash = ".";
      cb();
    }, 3000);
  };

  /* Poll for hash changes on IE. */
  var pollForHashChange = function () {
    var elem = opts.onBack.elem,
        cb = opts.onBack.cb,
        override = opts.onBack.override;

    window.setInterval(function () {
      if (window.location.hash === "#") {
        if (override) {
          cb();
          trackNL("onBack Modal - Viewed");
        } else {
          showModal(elem, "onBack");
        }
      }
    }, 400);
  };

  var listenToHashChanges = function () {
    var elem = opts.onBack.elem,
        cb = opts.onBack.cb,
        override = opts.onBack.override;

    if (isIE) {
      pollForHashChange();
      return;
    }
    $(window).on("hashchange", function () {
      var hash = window.location.hash;
      if (!hash || hash === "#") {
        if (override) {
          cb();
          trackNL("onBack Modal - Viewed");
        } else {
          showModal(elem, "onBack");
          $("body").click();
        }
      }
    });
  };

  var onBack = function () {
    markHash(function () {
      listenToHashChanges();
    });
  };

  /* OnIdle - Fired when a user scrolls and then idles for X amount of time. */
  var lastActive = Date.now(),
      onIdleShown = false;

  var onIdle = function () {

    $(window).on("touchstart", function () {
      lastActive = Date.now();
    });

    $(window).on("click", function () {
      lastActive = Date.now();
    });

    $(window).on('scroll', function () {
      lastActive = Date.now();
    });

    window.setInterval(function () {
      if (onIdleShown) return;
      var timeDelta = Date.now() - lastActive;
      if (timeDelta >= opts.onIdle.inactiveThreshold) {
        onIdleShown = true;
        showModal(opts.onIdle.elem, "onIdle", true);
      }
    }, 1000);

  };

  /* OnUnload */

  var beforeUnload = function () {
    trackNL("onBeforeUnload Popup - Viewed");
    if (stop) {
      window.onbeforeunload = function () {};
      return;
    }
    stop = true;
    $('.modal.in').modal('hide') ;
    // $(opts.onUnload.elem).addClass("force-show");

    var $subscribeBounceTB = $("#subscribe_bounce_text"),
        text = null,
        bounceRedirect = null;

    if ($subscribeBounceTB.length > 0) {
      text = $subscribeBounceTB.text();
      bounceRedirect = $subscribeBounceTB.data('sub-bounce-url');
    }

    redirectTo = bounceRedirect || "https://www.beenverified.com/subscribe/view_report_trial";

    window.onbeforeunload = noop;

    window.setTimeout(function () {
      window.setTimeout(function () {
        trackNL("onBeforeUnload Popup - Accepted", {redirected_to: redirectTo});
        window.location = redirectTo;
      }, 500);
    }, 5);

    return text || '\n*************************************************\nWANT UNLIMITED REPORTS FOR JUST $1?\n*************************************************\n\n\n*** Please stay on this page for more details. ***\n\n\n\n';
  };

  var onUnload = function () {
    window.onbeforeunload = beforeUnload;
  };

  var onBreakingPlane = function () {
    var elem = opts.onBreakingPlane.elem,
        cb = opts.onBreakingPlane.cb,
        override = opts.onBreakingPlane.override,
        sensitivity = 20, // pixels from the top
        threshold = 500,
        thresholdId = null,
        delayBeforeFiring = 0,
        delayTimer,
        firedBreakingPlaneAlready = false;

    var mouseleaveY,
        mouseenterY;

    var fireBounce = function () {
      if (firedBreakingPlaneAlready) return;
      firedBreakingPlaneAlready = true;

      if (override) {
        cb();
        trackNL("onBreakingPlane Modal - Viewed");
      } else {
        showModal(elem, "onBreakingPlane");
      }
    };

    $(document).on('mouseleave', function (evt) {
      if (evt.clientY > sensitivity) return;
      delayTimer = setTimeout(fireBounce, delayBeforeFiring);
    });

    $(document).on('mouseenter', function (evt) {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    });
  };

  downsell.stop = function() {
    $(document).off('mouseleave');
    $(document).off('mouseenter');
    $(window).off('hashchange');
  };


  /* Initialize */

  downsell.init = function (options) {
    _.extend(opts, defaults, options);
    onBack();
    //onUnload();
    //onIdle();
    //onBlur();
    onBreakingPlane();
  };

  // Expose downsell as a global.
  window.downsell = downsell;

}(jQuery, _));
