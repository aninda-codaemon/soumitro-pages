import amplify from 'utils/amplifyStore';
import Step from '../../wizard/step';
import { showExternalLoading } from './shared';

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

const relatives = Object.assign({}, Step);
relatives.init({
  title: 'Choose Relatives',
  $elem: $('#gen-report-modal2'),
  duration: 20,
  onStart: onRelativesModalStart
});

export { relatives };
