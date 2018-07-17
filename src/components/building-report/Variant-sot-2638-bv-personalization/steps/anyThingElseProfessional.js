/* eslint-disable */
import Step from 'components/wizard/Variant-sot-2638-bv-personalization/step';
import { showExternalLoading, hideExternalLoading } from './shared';
const CONTINUE_SESSION_INDEX = 2;

function onUserFormSubmitStart(stepCompleted) {
  const { headerToDisplay } = this;
  $('#anyThingElse').validate({
    rules: {
      fn: {
        required: true,
      },
      ln: {
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
      fn: 'Please enter a first name',
      ln: 'Please enter a last name',
    },
    submitHandler() {
      showExternalLoading(stepCompleted, self.duration, CONTINUE_SESSION_INDEX);
    },
  });
  
  $(`#anyThingElse-header${headerToDisplay}`).removeClass('hidden');
  $('#skip-anyThingElse-step').on('click', stepCompleted);
}

function createComponent(options = {}) {
  const onUserFormSubmit = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Anything Else You Want To Know?',
    $elem: $('#gen-myself-modal3'),
    duration: 25,
    onStart: onUserFormSubmitStart,
    $modal: $('#loadingModal'),
    openModal: (stepCompleted, duration) =>
    showExternalLoading(stepCompleted, duration, CONTINUE_SESSION_INDEX),
    closeModal: () => hideExternalLoading(CONTINUE_SESSION_INDEX),
  }, options);

  onUserFormSubmit.init(newConfig);
  return onUserFormSubmit;
}

export default createComponent;
