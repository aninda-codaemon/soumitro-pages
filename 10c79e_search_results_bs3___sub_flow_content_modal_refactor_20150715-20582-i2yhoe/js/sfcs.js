;(function (window) {

  var timeout,
      interval;

  var checkMobile = function() {
    var check = false;

    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

    return check;
  };

  window.isMobile = checkMobile();
  window.mobileTimeRatio = window.mobileTimeRatio || 0.5;

  var sendToHeap = function (eventName, prop) {
    if (typeof heap !== 'undefined' && _.isFunction(heap.track)) {
      heap.track(eventName, prop);
    }
  };

  // Generating Report
  // ==========================================================================================
  // TODO: Promise is too slow
  // TODO: Close - does not reset, promise never applies

  window.SFC.generating_report = {

    start: function () {
      sendToHeap('Viewed LocatingInfo Modal');

      var $elem = $('#generating_report'),
          splits = [30000, 13000, 17000],
          transitionDelay = 1000;

      var splits = _.shuffle(splits);

      var $progressBars = [
        $('#searching-progress-bar-database .progress-bar'),
        $('#searching-progress-bar-records .progress-bar'),
        $('#searching-progress-bar-datasets .progress-bar')
      ];

      var self = this,
          splits = _.shuffle(splits),
          animations = [];

      if (window.isMobile) {
        splits = _.map(splits, function(t) {
          return t * window.mobileTimeRatio;
        });

        self.transitionDelay *= window.mobileTimeRatio;
      }


      _.forEach( $progressBars, function ($elem, idx) {
        var duration = splits[idx];
        animations.push($elem.animate({'width': '100%'}, {duration: duration}));
      });

      $.when.apply(self, animations).then(function () {
        timeout = window.setTimeout(function () {
          var trigger = $('#searching-progress-bar-datasets .progress-bar'),
              currentSFC = $(trigger).closest('.SFC'),
              nextSFC = trigger.data('goto');

          window.SFC.generating_report.end(currentSFC, nextSFC);
        }, transitionDelay);
      });
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.generating_report.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      if (timeout) { window.clearTimeout(timeout); };

      $('#searching-progress-bar-database .progress-bar').stop().css( {'width': '1%'} );
      $('#searching-progress-bar-records .progress-bar').stop().css( {'width': '1%'} );
      $('#searching-progress-bar-datasets .progress-bar').stop().css( {'width': '1%'} );
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

  // Scanning Social
  // ==========================================================================================

  window.SFC.scanning_social = {
    start: function () {
      sendToHeap('Viewed SocialMedia Modal');

      var $elem = $('#scanning_social'),
          duration = 15000,  
          transitionDelay = 1000;

      if (window.isMobile) {
        duration *= window.mobileTimeRatio;
      }

      var socialPromise = $('#socialmedia-progress .progress-bar').animate(
        {'width': '100%'}, {
          duration: duration,
          progress: function (animation, progress) {
            var progression = Math.ceil(progress * 100);
            $('#socialmedia-progress-percent').html(progression);
          }
        }
      );

      $.when(socialPromise).done( function () { 
        $elem.parent().find('.complete').fadeIn();
      });

      var $lis = $('#social-media-groups li'),
          listLen = $lis.length,
          listIdxs = _.shuffle(_.range(0, listLen)),
          currIdx = 0;

      interval = window.setInterval(function () {

        if (currIdx >= listLen) {
          timeout = window.setTimeout( function () {
            var trigger = $('#socialmedia-progress .progress-bar'),
                currentSFC = $(trigger).closest('.SFC'),
                nextSFC = trigger.data('goto');

            window.SFC.scanning_social.end(currentSFC, nextSFC);
          }, transitionDelay);

          return window.clearInterval(interval);
        };

        var listIdx = listIdxs[currIdx],
            $loadingImg = $($lis[listIdx]).find('.loading');

        $loadingImg.css('opacity', 0);
        $loadingImg.next().fadeIn();

        currIdx += 1;

      }, Math.round(duration / listLen));
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.scanning_social.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      if (interval) { window.clearInterval(interval); };
      if (timeout) { window.clearTimeout(timeout); };

      $('#socialmedia-progress .progress-bar').stop().css( {'width': '1%'} );
      $('#social-media-groups li.loading').css('opacity', 1);
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

  // Report Ready
  // ==========================================================================================

  window.SFC.report_ready = {
    start: function () {
      sendToHeap('Viewed ReadyToDownload Modal');

      var $elem = $('#report_ready'),
          duration = 2000;

      var $lis = $('#gen-list-groups li'),
          listLen = $lis.length,
          listIdxs = _.shuffle(_.range(0, listLen)),
          currIdx = 0;

      interval = window.setInterval(function () {
        if (currIdx >= listLen) {
          var $genReportButton = $('#gen-report-confirm'),
              $downloadNowIcon = $genReportButton.find('.download-now-icon'),
              $genReportMessage = $('#gen-report-message');

          var genEnabledText = $genReportMessage.data('enabled-text');

          $genReportMessage.html(genEnabledText || 'ACCESS THE FULL BACKGROUND REPORT');
          $downloadNowIcon.hide();
          $('#arrowhead-right').fadeIn();
          $genReportButton.removeAttr('disabled');

          return window.clearInterval(interval);
        }

        var listIdx = listIdxs[currIdx];

        $($lis[listIdx]).addClass('success');

        currIdx += 1;

      }, Math.round(duration / listLen));
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.report_ready.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      if (interval) { window.clearInterval(interval); };

      var $genReportButton = $('#gen-report-confirm'),
          $downloadNowIcon = $genReportButton.find('.download-now-icon'),
          $genReportMessage = $('#gen-report-message');

      $('#gen-list-groups li').removeClass('success');

      $genReportButton.attr('disabled', 'disabled');
      $genReportMessage.html('Loading...');
      $downloadNowIcon.show();
      $('#arrowhead-right').hide();
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

  // Processing Request
  // ==========================================================================================

  window.SFC.processing_request = {
    start: function () {
      sendToHeap('Viewed LoggingIn Modal');

      var duration = 10000;

      timeout = window.setTimeout(function () {
        var trigger = $('.load-bar'),
            currentSFC = $(trigger).closest('.SFC'),
            nextSFC = trigger.data('goto');

        window.SFC.processing_request.end(currentSFC, nextSFC);
      }, duration);
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.processing_request.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      if (timeout) { window.clearTimeout(timeout); };
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  }

  // Captcha Modal
  // ========================================================================================== 

  window.SFC.captcha_modal = {
    start: function () {
      sendToHeap('Viewed Captcha Modal');

      var $elem = $('#captcha_modal');

      var selectCaptchaImg = function() {
        var $captchaImgs = $('#bv-captcha-imgs img').removeClass('bv-captcha-selected'),
            captchaImgsLen = $captchaImgs.length,
            selectedIdx = _.random(0, captchaImgsLen - 1),
            $selectedImg = $($captchaImgs[selectedIdx]);

        $('#bv-captcha-imgs img').removeClass('bv-captcha-selected');
        $selectedImg.addClass('bv-captcha-selected');
      };

      var refreshCaptchaState = function() {
        window.SFC.captcha_modal.reset();

        $('#bv-captcha-input').val('');
        $('#bv-captcha-msg').html('');

        selectCaptchaImg();
      };

      var checkCaptcha = function(inputText) {
        var $captchaImg = $('.bv-captcha-selected'),
            textValue = $captchaImg.attr('alt');

        var result = inputText.length > 0;

        if (result) {
          $(this).addClass('bv-captcha-success');
          $('#bv-captcha-msg').html('Great work! Lets continue...');
          $('#bv-captcha-msg').addClass('success');

          return result;
        } else {
          $(this).addClass('bv-captcha-error');
          $('#bv-captcha-msg').html('Nope, not right yet...');
          $('#bv-captcha-msg').addClass('error');
        }
      };

      $('#bv-catpcha-form').on('submit', function(e) {
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;

        var captchaInput = document.getElementById('bv-captcha-input'),
          validCaptcha;

        if (captchaInput) {
          validCaptcha = checkCaptcha.call(captchaInput, captchaInput.value);
        }

        if (validCaptcha) {
          var trigger = $('#bv-captcha-next'),
              currentSFC = $(trigger).closest('.SFC'),
              nextSFC = trigger.data('goto');

          window.SFC.captcha_modal.end(currentSFC, nextSFC);
        }
      });

      $('#bv-captcha-refresh').on('click', function(e) {
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        refreshCaptchaState();
      });

      selectCaptchaImg();
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.captcha_modal.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      $('form').trigger('reset');

      $('#bv-captcha-input')
        .removeClass('bv-captcha-error')
        .removeClass('bv-captcha-success');

      $('#bv-captcha-msg')
        .removeClass('success')
        .removeClass('error');
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

  // Compiling Report
  // ==========================================================================================

  window.SFC.compiling_report = {
    start: function () {
      sendToHeap('Viewed DownloadingReport Modal');

      var $elem = $('#compiling_report'),
          defaultRunningTime = 120,
          countDown = defaultRunningTime,
          runningTime = 0,
          runInterval = 7.5 * 1000,
          completeRun = 45 * 1000;

      var timeRemaining = function() {
        if (countDown <= 15) {
          $('#time-approx').hide();
          $('#finishing-up').show();
        } else {
          countDown -= 20;
          $('#time-remaining').html(countDown);
        }
      };

      var selectNext = function() {
        runningTime += runInterval;

        var currentHeader = $('.modal-body-list li.list-selected'),
            currentContent = $('.modal-body-copy .card-selected'),
            currentMsg = $('.msg-selected'),
            nextHeader = currentHeader.next('li'),
            nextContent = currentContent.next('.card-single'),
            nextMsg = $('.msg-selected').next();

        currentHeader.removeClass('list-selected').addClass('list-completed'); 

        if (nextHeader.length > 0) {
          currentContent.removeClass('card-selected');
          currentMsg.removeClass('msg-selected');

          nextHeader.addClass('list-selected');
          nextContent.addClass('card-selected');
          nextMsg.addClass('msg-selected');
        }

        timeRemaining();

        if (runningTime >= completeRun) {
            window.clearInterval(interval);
        }
      };

      var mainTimer = function() {
        var animateTime = completeRun;

        var progressAnimate = $('#searching-progress-bar .progress-bar').animate(
        {'width': '100%'}, {

          duration: animateTime,
          progress: function(animation, progress, remainingMs) {
            var progression = Math.ceil(progress * 100);
            $('#searching-progress-bar-value').html(progression + '%');
          }
        });

        $.when(progressAnimate).done(function() {
          $('#finishing-up').html('Finished');

          timeout = window.setTimeout(function() {
            var trigger = $('#finishing-up'),
                currentSFC = $(trigger).closest('.SFC'),
                nextSFC = trigger.data('goto');

            window.SFC.captcha_modal.end(currentSFC, nextSFC);
          }, 2000);
        });
      };

      var runSearchProgression = function() {
        mainTimer();
        interval = window.setInterval(selectNext, runInterval);
      };

      runSearchProgression();
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.compiling_report.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      if (interval) { window.clearInterval(interval); };
      if (timeout) { window.clearTimeout(timeout); };

      $('#searching-progress-bar .progress-bar').stop().css('width', '1%');
      $('#time-approx').show();
      $('#finishing-up').hide();

      runningTime = 0;
      countDown = 120;
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

  // Lead Box
  // ==========================================================================================

  window.SFC.lead_box = {
    start: function () {
      sendToHeap('Viewed AccountNeeded Modal');
 
      var validateLeadForm = function() {
        var $signupModalForm = $('#signup-modal-form');
        window.validator = $signupModalForm.validate({
          'account[first_name]': 'required',
          'account[last_name]': 'required',
          'user[email]': {
            required: true,
            email: true
          },
          messages: {
            'account[first_name]': 'Please enter a first name',
            'account[last_name]': 'Please enter a last name',
            'user[email]': 'Please enter a valid email address'
          }
        });
      };

      var reportLeadData = function(dataArray) {
        var formVals = {};
        _.forEach(dataArray, function (v, k) {
          formVals[v.name] = v.value;
        });

        var srchData = amplify.store("searchData"),
            firstName = "",
            lastName = "";

        if (srchData) {
            firstName = srchData.fn || "";
            lastName = srchData.ln || "";
        }

        var leadData = {};
        leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
        leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
        leadData['lead[email]'] = formVals['user[email]'] || '';
        leadData['lead[zip]'] = formVals['account[zip]'] || '';
        leadData['lead[state]'] = formVals['account[state]'] || '';
        leadData['record_search[first_name]'] = firstName;
        leadData['record_search[last_name]'] = lastName;

        var leadQueryArr = [];
        _.forEach(leadData, function (v, k) {
          leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
        });

        var leadQueryString = leadQueryArr.join('&');

        return $.post('/api/3_0_1/leads.json', leadQueryString);
      };

      $('#signup-modal-form').on('submit', function(e) {
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        
        if (window.validator.form()) {
          if (typeof heap !== 'undefined' && heap.track) {
            heap.track('Submitted Lead Form - Success');
          }

          try {
            reportLeadData($(this).serializeArray());
          } catch (err) {}

          timeout = window.setTimeout(function() {
            window.location = $('body').data('next-page');
          }, 300);
        } 
      });  

      validateLeadForm();   
    },
    end: function (currentSFC, nextSFC) {
      window.SFC.lead_box.reset();
      window.sfcEngine.go.change(currentSFC, nextSFC);
    },
    reset: function () {
      $('form').trigger('reset');

      if (timeout) { clearTimeout(timeout); };
    },
    onBeforeStart: function () {},
    onAfterStart: function () {}
  } 

}(window));
