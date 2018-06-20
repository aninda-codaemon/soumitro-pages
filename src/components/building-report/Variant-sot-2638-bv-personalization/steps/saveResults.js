import { validateLeadsForm } from 'components/leads-form';
import Step from 'components/wizard/step';
import { showExternalModal, hideExternalModal } from './shared';

const SAVE_RESULTS_INDEX = 0;

function onSaveResultsStart(stepCompleted) {
  var { duration } = this;
  var $signupModalForm = $('#signup-modal-form');
  var img = $('#crt-acct-load').find('img');
  const onSubmit = () => {
    showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX);
  };
  validateLeadsForm($signupModalForm, onSubmit);
  img.attr('src', img.attr('data-src'));
}

function createComponent(options = {}) {
  const saveResults = Object.assign({}, Step);
  const skipSavingResultModal = true;
  let newConfig = Object.assign({
    title: 'Save Results',
    $elem: $('#gen-report-modal6'),
    duration: 18,
    onStart: onSaveResultsStart,
    $modal: $('#externalModal'),
    openModal: (stepCompleted, duration) =>
      showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX, skipSavingResultModal),
    closeModal: () => hideExternalModal(SAVE_RESULTS_INDEX),
  }, options);
  saveResults.init(newConfig);
  return saveResults;
}
export default createComponent;
