import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from '../../wizard/step';
import { showExternalLoading, hideExternalLoading } from './shared';

const CHECKING_SESSION_INDEX = 0;

function onRelativesModalStart(stepCompleted) {
  var duration = this.duration;
  var $lis = $('.report-info-list .report-info-item');
  var listLen = $lis.length;
  var listIdxs = _.shuffle(_.range(0, listLen));
  var currIdx = 0;
  var $btn = $('#gen-report-confirm');
  var rndNamesContainer = $('.rndname');
  var currentRecord = amplify.store('currentRecord');
  var relatives = _.get(currentRecord, 'Relatives.Relative') || [];
  relatives = Array.isArray(relatives) ? relatives : [relatives]
  _.forEach(relatives, function (relative, i) {
    var fullName = relative.First + ' ' + (relative.Middle ? relative.Middle + ' ' : '') + relative.Last;
    $(rndNamesContainer[i])
      .text(nameize(fullName))
      .closest('.hidden')
      .removeClass('hidden');
  });

  $btn.on('click', function () {
    showExternalLoading(stepCompleted, duration, CHECKING_SESSION_INDEX);
    $('.r-arrow').hide();
  });
}

const relatives = Object.assign({}, Step);
relatives.init({
  title: 'Choose Relatives',
  $elem: $('#gen-report-modal2'),
  duration: 20,
  onStart: onRelativesModalStart,
  $modal: $('#loadingModal'),
  openModal: (stepCompleted, duration) => showExternalLoading(stepCompleted, duration, CHECKING_SESSION_INDEX),
  closeModal: () => hideExternalLoading(CHECKING_SESSION_INDEX)
});

export { relatives };
