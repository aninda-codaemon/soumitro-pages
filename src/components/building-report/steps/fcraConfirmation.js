import Step from '../../wizard/step';
import { showExternalLoading, hideExternalLoading } from './shared';

const CONTINUE_SESSION_INDEX = 1;

function onFcraConfirmationStart(stepCompleted) {
  $('#fcra-confirm').validate({
    rules: {
      fcraCheckbox2: {
        required: true,
      },
    },
    errorPlacement(error, element) {
      element.closest('.form-group').addClass('error').append(error);
    },
    success(label) {
      label.closest('.form-group').removeClass('error').find('label.error').remove();
    },
    messages: {
      fcraCheckbox2: 'Please check the box to continue',
    },
    submitHandler() {
      showExternalLoading(stepCompleted, this.duration, CONTINUE_SESSION_INDEX);
    },
  });
}

const confirmFCRA = Object.assign({}, Step);
confirmFCRA.init({
  title: 'Please Confirm',
  trackMsg: 'Viewed FCRA Modal',
  $elem: $('#gen-report-modal11'),
  duration: 32,
  onStart: onFcraConfirmationStart,
  $modal: $('#loadingModal'),
  openModal: (stepCompleted, duration) =>
    showExternalLoading(stepCompleted, duration, CONTINUE_SESSION_INDEX),
  closeModal: () => hideExternalLoading(CONTINUE_SESSION_INDEX),
});

export { confirmFCRA };
