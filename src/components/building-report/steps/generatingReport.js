import Step from '../../wizard/step';
import { showExternalModal } from './shared';

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

const generatingReport = Object.assign({}, Step);
generatingReport.init({
  title: 'Completing the Report',
  $elem: $('#gen-report-modal5'),
  duration: 120,
  transitionDelay: 1,
  onStart: generatingReportStart
});

export { generatingReport };
