import { validateLeadsForm } from 'components/leads-form';
import Step from 'components/wizard/step';

function onSaveResultsStart(stepCompleted) {
  var $signupModalForm = $('#signup-modal-form');
  var img = $('#crt-acct-load').find('img');
  const onSubmit = () => {
    $('.dating-header').html('').hide();
    $('.wizard-header').show();
    $('.subHeadline').show();
    stepCompleted();
  };
  $('.headline-text').html('Save Your Report: ');
  $('.wizard-header').hide();
  $('.dating-header').html('<div class="text-center">Your Report is Ready!</div>').show();
  $('.subHeadline').hide();
  validateLeadsForm($signupModalForm, onSubmit);
  img.attr('src', img.attr('data-src'));
}

function createComponent(options = {}) {
  const saveResults = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Save Results',
    $elem: $('#gen-report-modal6'),
    duration: 18,
    onStart: onSaveResultsStart,
  }, options);
  saveResults.init(newConfig);
  return saveResults;
}
export default createComponent;
