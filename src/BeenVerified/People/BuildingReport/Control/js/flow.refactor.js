window.bv = window.bv || {};
window.bv.mobileTimeRatio = window.bv.mobileTimeRatio || 0.5;

(function () {
  $.fx.interval = 100;

  var trackNL = window.bv.utils.trackNL;

  $('#wizModal').modal('show');

  /* =========================================================
     ================ Wizard Modal Functionality =============
     ========================================================= */

  var containerSelector = $(".wizard-content");
  var stepsContainerSelector = $(".wizard-header");
  var stepSelector = $(".wizard-step");
  var steps = $(containerSelector).find(stepSelector);
  var stepCount = 4;//steps.size()-1;
  var isModal = true;
  var validateNext = function () { return true; };
  var validateFinish = function () { return true; };
  //////////////////////
  var step = 1;
  var container = $(containerSelector).find(stepsContainerSelector);
  steps.hide();
  $(steps[0]).show();
  if (isModal) {
    $('#wizModal').on('hidden.bs.modal', function () {
      step = 1;
      $($(containerSelector + " .wizard-steps-panel .step-number")
        .removeClass("done")
        .removeClass("doing")[0])
        .toggleClass("doing");

      $($(containerSelector + " .wizard-step")
        .hide()[0])
        .show();
    });
  }
  $('#wizModal').find(".wizard-steps-panel").remove();
  stepsContainerSelector.prepend('<div class="wizard-steps-panel steps-quantity-' + stepCount + '"></div>');
  var stepsPanel = $('#wizModal').find(".wizard-steps-panel");
  for (s = 1; s <= 4; s++) {
    stepsPanel.append('<div class="step-number step-' + s + '"><div class="number">' + s + '</div></div>');
  }
  $('#wizModal').find(".wizard-steps-panel .step-" + step).toggleClass("doing").find('.number').html('&nbsp;');
  //////////////////////
  var contentForModal = "";
  if (isModal) {
    contentForModal = ' data-dismiss="modal"';
  }

  var nextStepWiz = function () {
    var steps = $(".wizard-step");
    switch (currModalIdx) { //Based on current modal Id - set Step Header status
      case 1:
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 1).toggleClass("doing").toggleClass("done").find('.number').html('&nbsp;');
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 2).toggleClass("doing").contents().find('.number').html('&nbsp;');
        break;
      case 6:
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 2).toggleClass("doing").toggleClass("done").find('.number').html('&nbsp;');
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 3).toggleClass("doing").find('.number').html('&nbsp;');
        break;
      case 7:
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 3).toggleClass("doing").toggleClass("done").find('.number').html('&nbsp;');
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 4).toggleClass("doing").find('.number').html('&nbsp;');
        break;
      case 10:
        $(stepsContainerSelector).find(".wizard-steps-panel .step-" + 4).toggleClass("doing").toggleClass("done").find('.number').html('&nbsp;');
        break;
    }

    step++;
    steps.hide();
    $(steps[step - 1]).show();

    var hasCheckSubHealines = false;

    $(".subHeadline").each(function () {
      if (!hasCheckSubHealines) {
        if (!$(this).hasClass('hidden')) {
          $(this).next().removeClass('hidden');
          $(this).addClass('hidden');
          hasCheckSubHealines = true;
        }
      }
    });
  };
}());


(function () {
  var trackNL = window.bv.utils.trackNL;
  var second = 1000;

  /** STEP METHODS */
  var Step = {
    init: function(options) {
      this.title = options.title;
      this.trackMsg = options.trackMsg;
      this.duration = options.duration;
      this.transitionDelay = options.transitionDelay || 0;
      this.onStart = options.onStart;
      this.$elem = options.$elem;
      this.isCompleted = false;
    },
    start: function(onCompleted) {
      this.setTitle();
      this.track();
      this.onCompleted = onCompleted;
      this.$elem.addClass('active').parent().show();
      this.onStart(this.complete.bind(this));
    },
    skip: function() {
      this.transitionDelay = 0;
      this.complete();
    },
    setTitle: function setTitle() {
      $('.subHeadline').text(this.title);
    },
    track: function track() {
      trackNL('Viewed ' + (this.trackMsg || this.title));
    },
    complete: function() {
      if (!this.isCompleted) {
        setTimeout(function() {
          this.$elem.removeClass('active').parent().hide();
          this.onCompleted();
        }.bind(this), this.transitionDelay);
      }
      this.isCompleted = true;
    }
  };

  /** SECTION METHODS */
  var Section = {
    init: function(steps) {
      this.active = false;
      this.currentStepIndex = 0;
      this.steps = steps;
    },
    start: function (onSectionCompleted) {
      this.active = true;
      this.onSectionCompleted = onSectionCompleted;
      this.startNextStep();
    },
    getCurrentStep: function() {
      return this.steps[this.currentStepIndex];;
    },
    getPreviousStep: function() {
      var previousStepIndex = this.currentStepIndex === 0 ? 0 : this.currentStepIndex - 1;
      return this.steps[previousStepIndex];
    },
    startNextStep: function () {
      var currentStep = this.getCurrentStep();
      var prevStep = this.getPreviousStep();
      currentStep.start(this.onStepCompleted.bind(this));
    },
    onStepCompleted: function () {
      this.currentStepIndex++;
      if (this.currentStepIndex < this.steps.length) {
        this.startNextStep();
        return;
      }
      this.sectionCompleted();
    },
    sectionCompleted: function () {
      this.active = false;
      this.completed = true;
      this.onSectionCompleted();
    },
    skipStep: function () {
      var currentStep = this.getCurrentStep();
      currentStep.skip();
    }
  };

  /** WIZARD MANAGER METHODS */
  var WizardManager = {
    init: function(sections) {
      this.currentSectionIndex = 0;
      this.sections = sections;
      return this;
    },
    getCurrentSection: function () {
      return this.sections[this.currentSectionIndex];
    },
    getCurrentSectionIndex: function () {
      return this.currentSectionIndex;
    },
    start: function () {
      this.startNextSection();
    },
    startNextSection: function () {
      var currentSection = this.getCurrentSection();
      currentSection.start(this.onSectionCompleted.bind(this));
    },
    onSectionCompleted: function () {
      this.currentSectionIndex++;
      this.updateHeadlines();
      if (this.currentSectionIndex < this.sections.length) {
        this.startNextSection();
      }
    },
    getActiveSection: function () {
      return _.find(this.sections, { active: true });
    },
    updateHeadlines: function () {
      var stepsContainerSelector = $('.wizard-header');
      var currentSectionIndex = this.getCurrentSectionIndex();
      stepsContainerSelector.find('.wizard-steps-panel .step-' + currentSectionIndex)
        .toggleClass('doing')
        .toggleClass('done')
        .find('.number')
        .html('&nbsp;');
      stepsContainerSelector.find('.wizard-steps-panel .step-' + (currentSectionIndex + 1))
        .toggleClass('doing')
        .contents()
        .find('.number')
        .html('&nbsp;');
    },
    skipStep: function() {
      var currentSection = this.getCurrentSection();
      currentSection.skipStep();
    }
  };

  /** STEP METHODS */
  function showExternalLoading(stepCompleted, duration, indexModalToDisplay) {
    var loads = $('#loadingModal .progress');
    var modTitles = $('.emdTitle');
    $('#loadingModal').show().removeClass('hidden');
    if (loads[indexModalToDisplay]) {
      $(loads[indexModalToDisplay]).removeClass('hidden');
      $(modTitles[indexModalToDisplay]).removeClass('hidden');
    }

    $('.cont-loading-aditional').toggleClass('hidden', !indexModalToDisplay);

    var progBar = $(loads[indexModalToDisplay]).find('.progress-bar');
    var initProgress = $(progBar).animate(
      { 'width': '100%' }, {
        duration: duration,
        complete: onAnimationComplete
      });

    function onAnimationComplete() {
      hideExternalLoading(indexModalToDisplay);
      stepCompleted();
      $(modTitles[indexModalToDisplay]).addClass('hidden');
      if (!$('.cont-loading-aditional').hasClass('hidden')) {
        $('.cont-loading-aditional').addClass('hidden');
      }
    };
  };

  function hideExternalLoading(indexModalToDisplay) {
    var loads = $('#loadingModal .progress');
    $('#loadingModal').addClass('hidden');
    $(loads[indexModalToDisplay]).addClass('hidden');
  };

  function showExternalModal(stepCompleted, duration, indexModal) {
    var extModals = $('#externalModal .ext-mod');
    var modTitles = $('#externalModal .emdlTitle');

    $('#externalModal').show().removeClass('hidden');
    if (extModals[indexModal]) {
      $(extModals[indexModal]).removeClass('hidden');
      $(modTitles[indexModal]).removeClass('hidden');
      if (indexModal === 1) {
        $('div#externalModal .modal-header').css({
          'background-color': '#DC0216'
        });
      }

      $(extModals[indexModal]).removeClass('hidden');
      setTimeout(function () {
        if (indexModal < 1) {
          hideExternalModal(indexModal);
          stepCompleted();
          $(modTitles[indexModal]).addClass('hidden');
        }
      }, duration);
    }
  };

  function hideExternalModal(indexModal) {
    var extModals = $('#externalModal .ext-mod');
    $('#externalModal').addClass('hidden');
    $(extModals[indexModal]).addClass('hidden');
  };

  function reportLeadData(dataArray) {
    var hostname = window.location.hostname;
    if (hostname && hostname.indexOf('secure.') > -1) {
      hostname = hostname.replace('secure.', 'www.');
      var LEADS_ENDPOINT_URL = 'https://' + hostname + '/api/v4/leads.json';
    }
    var LEADS_ENDPOINT = LEADS_ENDPOINT_URL || '/api/v4/leads.json';

    var formVals = {};
    _.forEach(dataArray, function (v, k) {
      formVals[v.name] = v.value;
    });

    var srchData = amplify.store('searchData'),
      firstName = '',
      lastName = '';

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
    return $.post(LEADS_ENDPOINT, leadQueryString);
  };

  function onPopularUseCasesStart(stepCompleted) {
    var $progressBar = $('#searching-progress-bar-database .progress-bar');
    var quotesIco = $('.speech-bub-ico');
    var quotes = $('.speech-bub');
    var quoteIndex = -1;
    var icons = [
      'img/Self-Color.svg',
      'img/Relatives-Color.svg',
      'img/Significant-Color.svg',
      'img/Misc-Color.svg'
    ];
    var duration = this.duration;

    var showNextQuote = function () {
      quoteIndex++;
      if (quoteIndex < 4) {
        quotesIco.eq(quoteIndex % quotesIco.length).attr("src", icons[quoteIndex]);
        quotes.eq(quoteIndex % quotes.length)
          .fadeIn(1000)
          .delay(duration / (quotes.length + 1))
          .fadeOut(1000, showNextQuote);
      }
    };
    showNextQuote();

    var initialProgress = $($progressBar).animate(
      { 'width': '100%' }, {
        duration: duration
      }
    );

    $.when(initialProgress).done(stepCompleted);
  }

  function onScanningCriminalDataStart(stepCompleted) {
    var $progessBar = $('#searching-progress-bar-criminal .progress-bar');
    var duration = this.duration;
    var initialProgress = $($progessBar).animate(
      { 'width': '100%' }, {
        duration: duration,
        progress: function (animation, progress) {
          var progression = Math.ceil(progress * 100);
          $('#socialmedia-progress-percent').html(progression);
        }
      }
    );

    var $crimSteps = $('#scanningCriminal li'),
      $crimStepsIco = $('#scanningCriminal li i'),
      currentCrimStep = 0;

    $crimSteps.eq(0).show();

    var stepBoxSection = function () {
      if (currentCrimStep < $crimSteps.length) { // if not past the end then
        $crimSteps.eq(currentCrimStep).delay(duration / ($crimSteps.length + 1)).fadeIn('fast', function () {
          $crimStepsIco.eq(currentCrimStep).removeClass('fa-circle-o-notch fa-spinner fa-pulse fa-3x fa-fw');
          $crimStepsIco.eq(currentCrimStep).addClass('fa-circle');
          $crimStepsIco.eq(currentCrimStep).css('color', '#4A3B8F');
          $crimSteps.eq(currentCrimStep).removeClass('blurryText');
          currentCrimStep++;
          stepBoxSection();
        });
      }
    };
    stepBoxSection();

    $.when(initialProgress).done(stepCompleted);
  }

  function onRelativesModalStart(stepCompleted) {
    var duration = this.duration;
    var $lis = $('.report-info-list .report-info-item');
    var listLen = $lis.length;
    var listIdxs = _.shuffle(_.range(0, listLen));
    var currIdx = 0;
    var $btn = $('#gen-report-confirm');
    var rndNamesContiner = $('.rndname');
    var currentRecord = amplify.store('currentRecord');
    var relatives = _.get(currentRecord, 'Relatives.Relative') || [];
    relatives = Array.isArray(relatives) ? relatives : [relatives]
    _.forEach(relatives, function (relative, i) {
      var fullName = relative.First + ' ' + (relative.Middle ? relative.Middle + ' ' : '') + relative.Last;
      $(rndNamesContiner[i])
        .text(fullName.nameize())
        .closest('.hidden')
        .removeClass('hidden');
    });

    $btn.on('click', function () {
      var CHECKING_SESSION = 0;
      showExternalLoading(stepCompleted, duration, CHECKING_SESSION);
      $('.r-arrow').hide();
    });
  }

  function onScanningSocialMediaStart(stepCompleted) {
    var self = this;
    var duration = this.duration;
    
    var socialPromise = $('#socialmedia-progress .progress-bar').animate(
      { 'width': '100%' },
      { duration: duration }
    );

    var $lis = $('#social-media-groups li'),
      listLen = $lis.length,
      listIdxs = _.shuffle(_.range(0, listLen)),
      currIdx = 0;

    var intervalId = window.setInterval(function () {
      if (currIdx >= listLen) {
        return;
      }
      var listIdx = listIdxs[currIdx];
      var $loadingImg = $($lis[listIdx]).find('.loading');
      $loadingImg.css('opacity', 0);
      $loadingImg.next().fadeIn();
      currIdx += 1;
    }, Math.round(duration / listLen));

    $.when(socialPromise).done(function () {
      stepCompleted();
      window.clearInterval(intervalId);
    });
  }

  function onNoteOnUserCommentsStart(stepCompleted) {
    var duration = this.duration;
    var $useCasesModal = $('#gen-report-modal3');

    $('#fcraGroup').validate({
      rules: {
        fcraCheckbox: {
          required: true
        }
      },
      errorPlacement: function (error, element) {
        element.closest('.form-group').addClass('error').append(error);
      },
      success: function (label) {
        label.closest('.form-group').removeClass('error').find('label.error').remove();
      },
      messages: {
        fcraCheckbox: 'Please check the box to continue'
      },
      submitHandler: function (form) {
        stepCompleted();
      }
    });
  }

  function onFcraConfirmationStart(stepCompleted) {
    $('#fcra-confirm').validate({
      rules: {
        fcraCheckbox2: {
          required: true
        }
      },
      errorPlacement: function (error, element) {
        element.closest('.form-group').addClass('error').append(error);
      },
      success: function (label) {
        label.closest('.form-group').removeClass('error').find('label.error').remove();
      },
      messages: {
        fcraCheckbox2: 'Please check the box to continue'
      },
      submitHandler: function (form) {
        var CONTINUE_SESSION_INDEX = 1;
        showExternalLoading(stepCompleted, this.duration, CONTINUE_SESSION_INDEX);
      }.bind(this)
    });
  }

  function onConfirmDataStart(stepCompleted) {
    $('#confirmData .main-btn').on('click', stepCompleted);
  }

  function onSaveResultsStart(stepCompleted) {
    var duration = this.duration;
    var $signupModalForm = $('#signup-modal-form');
    var validator = $signupModalForm.validate({
      'account[first_name]': 'required',
      'account[last_name]': 'required',
      'user[email]': {
        required: true,
        email: true
      },
      messages: {
        'account[first_name]': 'Please enter a first name',
        'account[last_name]': "Please enter a last name",
        'user[email]': 'Please enter a valid email address'
      }
    });
    $('#signup-modal-form').on('submit', function (evt) {
      evt.preventDefault();
      if (validator.form()) {
        trackNL('Submitted Lead Form - Success');
        try {
          reportLeadData($(this).serializeArray());
        } catch (err) { }
      }
    }).on('submit', function() {
      var SAVE_RESULTS_INDEX = 0;
      showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX);
    });
  }

  function onPreparingMonitoringStart(stepCompleted) {
    $('#ongoing-notifications').on('click', function () {
      stepCompleted();
    });
  }

  function selectNextReporting() {
    var currentHeader = $('.modal-body-list li.list-selected'); //selects current tags
    var currentContent = $('.modal-body-copy .card-selected');
    var currentMsg = $('.msg-selected');
    var nextHeader = currentHeader.next('li'); //selects next header li
    var nextContent = currentContent.next('.card-single');
    var nextMsg = currentMsg.next();
    currentHeader.removeClass('list-selected').addClass('list-completed'); //remove selected class
    if (nextHeader.length > 0) {
      currentContent.removeClass('card-selected');
      currentMsg.removeClass('msg-selected');
      nextHeader.addClass('list-selected'); //add selected class
      nextContent.addClass('card-selected');
      nextMsg.addClass('msg-selected');
    }
  };

  function runSearchProgression(stepCompleted, duration) {
    var progressAnimate = $('#searching-progress-bar .progress-bar').animate(
      { width: '100%' }, { duration: duration }
    );
    $.when(progressAnimate).done(function () {
      window.setTimeout(function () {
        var COMPLETING_REPORT_INDEX = 1;
        showExternalModal(stepCompleted, duration, COMPLETING_REPORT_INDEX);
      }, 2000);
    });
  };

  function generatingReportStart(stepCompleted) {
    var progressBar = $("#sub-searching-progress-bar .progress-bar");
    var duration = this.duration;
    var transitionDelay = this.transitionDelay;
    var maxLoop = 6;
    var currentLoop = 0;

    $('#crt-acct-warn-confirm').on('click', function () {
      window.location = $('body').data('next-page');
    });

    function animateProgress() {
      progressBar.animate({ width: '100%' }, duration / maxLoop, 'linear', function () {
        currentLoop++;
        if (currentLoop < maxLoop) {
          setTimeout(function () {
            progressBar.css({ width: '1%' });
            selectNextReporting();
            animateProgress();
          }, transitionDelay);
        }
      });
    }

    runSearchProgression(stepCompleted, duration);
    animateProgress();
  }
  /** END STEP METHODS */

  function reduceExtraTeaserInformation(data) {
    return function (reducedObject, infoType) {
      var capitalizedType = infoType.capitalize();
      reducedObject['has' + capitalizedType] = _.some(data, function (item) {
        if (item && item.type === infoType && item.count > 0) {
          trackNL('Data Modal Viewed ' + capitalizedType);
          return true;
        }
        return false;
      });
      return reducedObject;
    }
  }
 
  function getExtraTeaserData(queryArgs) {
    var xhrData = window.bv.utils.getExtraTeaserData(queryArgs);
    $.when(xhrData).done(function (result) {
      trackNL('Person Data Teaser Called');
      var data = window.bv.utils.parseExtraTeaserData(result);
      var img = _.get(result, 'images[0].url') || '';
      var firstAddress = _.get(result, 'addresses[0]');
      var coordinates = firstAddress ? {
        latitude: firstAddress.latitude,
        longitude: firstAddress.longitude
      } : null;
      var infoTypes = [
        'criminal',
        'bankruptcy',
        'phones',
        'emails',
        'social',
        'photos',
        'careers',
        'associates',
        'relatives',
      ];

      var information = infoTypes.reduce(reduceExtraTeaserInformation(data), {});

      if (information.hasRelatives) {
        addRelativesModal();
      }

      // Store data
      var teaserDataObj = {
        recordCount: ($.type(result) !== 'array' ? 1 : 0),
        extraData: _(data).omit(_.isUndefined).omit(_.isNull).value(),
        photo: img,
        coordinates: coordinates
      };

      _.assign(teaserDataObj, information);
      amplify.store('extraTeaserData', teaserDataObj);
    });
  };

  function addRelativesModal() {
    var relativesStep = Object.assign({}, Step);
    relativesStep.init({
      title: 'Choose Relatives',
      $elem: $('#gen-report-modal2'),
      duration: 20 * second,
      onStart: onRelativesModalStart
    });
    section2.steps.splice(2, 0, relativesStep);
  }

  /** INITIALIZE STEPS */
  var popularUseCases = Object.assign({}, Step);
  var criminalDatabase = Object.assign({}, Step);
  var socialMedia = Object.assign({}, Step);
  var chooseRelatives = Object.assign({}, Step);
  var noteOnUserComments = Object.assign({}, Step);
  var confirmFCRA = Object.assign({}, Step);
  var publicRecordsReview = Object.assign({}, Step);
  var saveResults = Object.assign({}, Step);
  var preparingMonitoring = Object.assign({}, Step);
  var completingReport = Object.assign({}, Step);

  popularUseCases.init({
    title: 'Popular Use Cases',
    $elem: $('#gen-report-modal1'),
    duration: 32 * second,
    onStart: onPopularUseCasesStart,
  });

  criminalDatabase.init({
    title: 'Criminal Database Search',
    $elem: $('#scanningCriminal'),
    duration: 32 * second,
    onStart: onScanningCriminalDataStart
  });

  socialMedia.init({
    title: 'Social Media Scan',
    $elem: $('#scanningSocialMedia'),
    duration: 32 * second,
    onStart: onScanningSocialMediaStart
  });

  noteOnUserComments.init({
    title: 'Note on User Comments',
    $elem: $('#gen-report-modal3'),
    duration: 20 * second,
    onStart: onNoteOnUserCommentsStart
  });

  confirmFCRA.init({
    title: 'Please Confirm',
    trackMsg: 'Viewed FCRA Modal',
    $elem: $('#gen-report-modal11'),
    duration: 32 * second,
    onStart: onFcraConfirmationStart
  });

  publicRecordsReview.init({
    title: 'Public Records Review',
    $elem: $('#confirmData'),
    onStart: onConfirmDataStart
  });

  saveResults.init({
    title: 'Save Results',
    $elem: $('#gen-report-modal6'),
    duration: 18 * second,
    onStart: onSaveResultsStart
  });

  preparingMonitoring.init({
    title: 'Preparing Monitoring',
    $elem: $('#gen-report-modal4'),
    onStart: onPreparingMonitoringStart
  });

  completingReport.init({
    title: 'Completing the Report',
    $elem: $('#gen-report-modal5'),
    duration: 120 * second,
    transitionDelay: second,
    onStart: generatingReportStart
  });
  /** END OF INITIALIZE STEPS */

  var section1 = Object.assign({}, Section);
  var section2 = Object.assign({}, Section);
  var section3 = Object.assign({}, Section);
  var section4 = Object.assign({}, Section);

  section1.init([popularUseCases]);
  section2.init([criminalDatabase, socialMedia, /* RELATIVES */ noteOnUserComments, confirmFCRA]);
  section3.init([publicRecordsReview]);
  section4.init([saveResults, preparingMonitoring, completingReport]);

  var wizard = Object.assign({}, WizardManager);
  wizard.init([section1, section2, section3, section4]).start();

  // Force cache refresh when visiting page by hitting back button.
  $(window).on('pageshow', function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });

  function keyMap() {
    var maxKeyIndex = keys.length - 1;
    if (nextKey > maxKeyIndex) {
      // window.clearInterval(intervalId);
      // window.clearTimeout(timeoutId);
      wizard.skipStep();
      nextKey = 0;
    }
  }
  var keys = [66, 86, 71, 79]
  var nextKey = 0;
  $(window).keydown(function (e) {
    var key = e.which;
    if (key === keys[nextKey]) {
      nextKey++;
    } else {
      nextKey = 0;
    }
    keyMap();
  });

  window.getExtraTeaserData = getExtraTeaserData;
})();

// TODO: Update header icons.
// TODO: Add BVGO.