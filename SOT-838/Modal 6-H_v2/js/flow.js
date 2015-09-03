(function ($, undefined) {

  window.bv = window.bv || {};

  $.fx.interval = 100;

  var checkMobile = function() {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  window.bv.isMobile = checkMobile();
  window.bv.mobileTimeRatio = window.bv.mobileTimeRatio || 0.5;

  var modals = [{

    // Progress Bars.

    $elem: $("#gen-report-modal1"),
    splits: [45000, 20000, 30000], // Progress bar times (these are shuffled)
    transitionDelay: 1000,         // After progress completion, amount of time before moving to next flow.
    animate: function () {
      _.bind(initializingSearchProgress, this)();
    }
  },

    /* SCANNING SOCIAL MEDIA */
  {
    $elem: $("#scanningSocialMedia"),
    duration: 20000,   // Total time to switch spinners. Value is divided by number of items.
    transitionDelay: 1000,   // After progress completion, amount of time before moving to next flow.
    animate: function () {
      _.bind(scanningSocialMedia, this)();
    }
  }, {

    // Report is ready for download.

    $elem: $("#gen-report-modal2"),
    duration: 2000, // Total time to switch spinners for checkmarks. Value is divided by number of items.
    animate: function () {
      _.bind(reportReadyForDownload, this)();
    }
  }, {

    // Logging in.

    $elem: $("#gen-report-modal3"),
    duration: 15000, // Total animation time before moving to next modal.
    animate: function () {
      _.bind(loggingIn, this)();
    }
  },

  {

    // Captcha.

    $elem: $("#gen-report-modal4"),
    animate: function () {
      _.bind(captchaModal, this)();
    }
  }, {

    // Generating report progress.

    $elem: $("#gen-report-modal5"),
    animate: function () {
      _.bind(generatingReport, this)();
    }
  }, {

    // LeadBox

    $elem: $("#gen-report-modal6"),
    animate: function () {
      _.bind(whoopsAccountNeeded, this)();
    }
  }];


/* Helpers for reporting heap events*/

var sendToHeap = function (eventName, prop) {
  if (typeof heap !== 'undefined' && _.isFunction(heap.track)) {
    heap.track(eventName, prop);
  }
};


/* Function statements, I want these hoisted. */

function initializingSearchProgress() {
  sendToHeap('Viewed LocatingInfo Modal');

  var $progessBars = [
    $("#searching-progress-bar-database .progress-bar"),
    $("#searching-progress-bar-records .progress-bar"),
    $("#searching-progress-bar-datasets .progress-bar")
  ];

  var self = this,
      splits = _.shuffle(self.splits),
      animations = [];

  if (window.bv.isMobile) {
    splits = _.map(splits, function(t) {
      return t * window.bv.mobileTimeRatio;
    });
    self.transitionDelay *= window.bv.mobileTimeRatio;
  }

  _.forEach($progessBars, function ($elem, idx) {
    var duration = splits[idx];
    animations.push($elem.animate({'width': '100%'}, {duration: duration}));
  });

  $.when.apply(self, animations).then(function () {
    if (self.$elem.hasClass("in")) {
      window.setTimeout(function () {
        showNextModal();
      }, self.transitionDelay);
    }
  });
}

function reportReadyForDownload() {

  sendToHeap('Viewed ReadyToDownload Modal');

  var $lis = $("#gen-list-groups li"),
      listLen = $lis.length,
      listIdxs = _.shuffle(_.range(0, listLen)),
      currIdx = 0;

  var duration = this.duration;
  if (window.bv.isMobile) {
    duration *= window.bv.mobileTimeRatio;
  }

  intervalId = window.setInterval(function () {
    if (currIdx >= listLen) {
      var $genReportButton = $("#gen-report-confirm");

      var $downloadNowIcon = $genReportButton.find(".download-now-icon");
      var $genReportMessage = $("#gen-report-message");
      var genEnabledText = $genReportMessage.data('enabled-text');
      $genReportMessage.html(genEnabledText || "ACCESS THE FULL BACKGROUND REPORT");
      $downloadNowIcon.hide();
      $("#arrowhead-right").fadeIn();
      $genReportButton.removeAttr('disabled');

      return window.clearInterval(intervalId);
    }
    var listIdx = listIdxs[currIdx];
    $($lis[listIdx]).addClass('success');

    currIdx += 1;

  }, Math.round(duration / listLen));
}

function loggingIn() {

  sendToHeap('Viewed LoggingIn Modal');

  var self = this,
      duration = this.duration;

  if (bv.isMobile) {
    duration *= bv.mobileTimeRatio;
  }

  window.setTimeout(function () {
    showNextModal();
  }, duration);
}

function captchaModal() {
  sendToHeap('Viewed Captcha Modal');
}

function whoopsAccountNeeded() {
  sendToHeap('Viewed AccountNeeded Modal');
}

function generatingReport() {
  sendToHeap('Viewed DownloadingReport Modal');
}


/* Helpers to show/hide modals */

var modalCount = modals.length,
    currModalIdx = -1,
    $prevModal, intervalId;

/*
 * Display the next modal, while making sure to hide the previous modal.
 * Returns false if there is no modal to show next.
 */
var showNextModal = function () {
  currModalIdx += 1;
  if (currModalIdx < modalCount) {
    if (currModalIdx > 0) {
      modals[currModalIdx - 1].$elem.modal('hide');
    }
    var nextModal = modals[currModalIdx];
    nextModal.$elem.modal({
          backdrop: 'static',
          keyboard: false
        });
    nextModal.animate();
    return true;
  } else {
    return false;
  }
};


function scanningSocialMedia() {

  sendToHeap('Viewed SocialMedia Modal');

  var self = this;

  var duration = this.duration;

  if (window.bv.isMobile) {
    duration *= window.bv.mobileTimeRatio;
  }

  var socialPromise = $("#socialmedia-progress .progress-bar").animate(
    {'width': '100%'}, {
      duration: duration,
      progress: function (animation, progress) {
        var progression = Math.ceil(progress * 100);
        $("#socialmedia-progress-percent").html(progression);
      }
    }
  );

  $.when(socialPromise).done(function () {
    self.$elem.parent().find(".complete").fadeIn();
  });

  var $lis = $("#social-media-groups li"),
      listLen = $lis.length,
      listIdxs = _.shuffle(_.range(0, listLen)),
      currIdx = 0;

  intervalId = window.setInterval(function () {
    if (currIdx >= listLen) {

      if (self.$elem.hasClass("in")) {
        window.setTimeout(function () {
          showNextModal();
        }, self.transitionDelay);
      }

      return window.clearInterval(intervalId);
    }
    var listIdx = listIdxs[currIdx],
        $loadingImg = $($lis[listIdx]).find(".loading");
    $loadingImg.css('opacity', 0);
    $loadingImg.next().fadeIn();
    // addClass('success');

    currIdx += 1;
  }, Math.round(duration / listLen));
}


function scanningSocialMediaReset() {
  $("#social-media-groups li.loading").css('opacity', 1);
}


/**
 * Reset the flow to begin at the first modal.
 */
var resetModalFlow = function () {
  window.clearInterval(intervalId);
  currModalIdx = -1;
  $prevModal = undefined;
  $("#gen-list-groups li").removeClass('success');

  var $genReportButton = $("#gen-report-confirm");
  $genReportButton.attr('disabled', 'disabled');

  var $downloadNowIcon = $genReportButton.find(".download-now-icon");
  var $genReportMessage = $("#gen-report-message");
  $genReportMessage.html("Loading...");
  $downloadNowIcon.show();
  $("#arrowhead-right").hide();

  window.resetSearchingState();
  // window.refreshCaptchaState();
  scanningSocialMediaReset();
};


/* Event Handlers */

$('body').on('click', '.close', function () {
  resetModalFlow();
});

$("#modal1Close").on('click', resetModalFlow);
$('.modal-backdrop').on('click', resetModalFlow);

$("#gen-report-confirm").on('click', showNextModal);
$("#signup-modal-form").on('submit', showNextModal);

// Force cache refresh when visiting page by hitting back button.
$(window).on("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload();
    }
});

$('body').on('click', '.modal-backdrop', function() {
  var el = modals[currModalIdx].$elem;

  if ( $(el).hasClass('animated') == true ) {
    $(el).removeClass('animated').removeClass('shake');
  } 

  var timeout = setTimeout(function() {
    $(el).addClass('animated').addClass('shake');
  }, 0);
})

$('body').on('click', '.close', function() {
  $('.modal').removeClass('animated').removeClass('shake');
})

/* Expose */

window.startModalFlow = function () {
  resetModalFlow();
  showNextModal();
};

window.showNextModal = showNextModal;

} (jQuery));