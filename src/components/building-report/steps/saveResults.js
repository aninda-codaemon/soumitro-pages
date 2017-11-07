import { track } from 'utils/track';
import amplify from 'utils/amplifyStore';
import { validateLeadsForm } from 'components/leads-form';
import Step from '../../wizard/step';
import { showExternalModal, hideExternalModal } from './shared';

const SAVE_RESULTS_INDEX = 0;

function onSaveResultsStart(stepCompleted) {
  var duration = this.duration;
  var $signupModalForm = $('#signup-modal-form');
  
  validateLeadsForm($signupModalForm);
  $signupModalForm.on('submit', function () {
    showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX);
  });
}

const saveResults = Object.assign({}, Step);
const skipSavingResultModal = true;
saveResults.init({
  title: 'Save Results',
  $elem: $('#gen-report-modal6'),
  duration: 18,
  onStart: onSaveResultsStart,
  $modal: $('#externalModal'),
  openModal: (stepCompleted, duration) => showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX, skipSavingResultModal),
  closeModal: () => hideExternalModal(SAVE_RESULTS_INDEX)
});

export { saveResults };
