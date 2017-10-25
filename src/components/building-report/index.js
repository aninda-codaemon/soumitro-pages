import 'jquery-validation';

import { track } from 'utils/track';
import { nameize } from 'utils/strings';
import amplify from 'utils/amplifyStore';
import Step from 'components/wizard/step';
import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

const second = 1000;

function showSubHeadlines(totalSections) {
  var containerSelector = $(".wizard-content");
  var stepsContainerSelector = $(".wizard-header");
  var stepSelector = $(".wizard-step");
  var sections = $(containerSelector).find(stepSelector);
  var isModal = true;
  var validateNext = function () { return true; };
  var validateFinish = function () { return true; };
  //////////////////////
  var step = 1;
  var container = $(containerSelector).find(stepsContainerSelector);
  sections.hide();
  $(sections[0]).show();
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
  stepsContainerSelector.prepend('<div class="wizard-steps-panel steps-quantity-' + totalSections + '"></div>');
  var stepsPanel = $('#wizModal').find(".wizard-steps-panel");
  for (var s = 1; s <= 4; s++) {
    stepsPanel.append('<div class="step-number step-' + s + '"><div class="number">' + s + '</div></div>');
  }
  $('#wizModal').find(".wizard-steps-panel .step-" + step).toggleClass("doing").find('.number').html('&nbsp;');
}

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
  var duration = this.duration;

  var showNextQuote = function () {
    quoteIndex++;
    if (quoteIndex < 4) {
      var nextQuoteIcon = quotesIco.eq(quoteIndex % quotesIco.length);
      var newIcon = nextQuoteIcon.attr('data-src');
      nextQuoteIcon.attr('src', newIcon);
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
      .text(nameize(fullName))
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
      track('Submitted Lead Form - Success');
      try {
        reportLeadData($(this).serializeArray());
      } catch (err) { }
    }
  }).on('submit', function () {
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

function addRelativesModal() {
  const relativesStep = Object.assign({}, Step);
  relativesStep.init({
    title: 'Choose Relatives',
    $elem: $('#gen-report-modal2'),
    duration: 20 * second,
    onStart: onRelativesModalStart
  });
  section2.steps.splice(2, 0, relativesStep);
}

const popularUseCases = Object.assign({}, Step);
const criminalDatabase = Object.assign({}, Step);
const socialMedia = Object.assign({}, Step);
const chooseRelatives = Object.assign({}, Step);
const noteOnUserComments = Object.assign({}, Step);
const confirmFCRA = Object.assign({}, Step);
const publicRecordsReview = Object.assign({}, Step);
const saveResults = Object.assign({}, Step);
const preparingMonitoring = Object.assign({}, Step);
const completingReport = Object.assign({}, Step);

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

var section1 = Object.assign({}, Section);
var section2 = Object.assign({}, Section);
var section3 = Object.assign({}, Section);
var section4 = Object.assign({}, Section);

section1.init([popularUseCases]);
section2.init([criminalDatabase, socialMedia, /* RELATIVES */ noteOnUserComments, confirmFCRA]);
section3.init([publicRecordsReview]);
section4.init([saveResults, preparingMonitoring, completingReport]);

var wizard = Object.assign({}, WizardManager);
var sections = [section1, section2, section3, section4];

wizard.init(sections).start();
showSubHeadlines(sections.length);

export { wizard, addRelativesModal };
