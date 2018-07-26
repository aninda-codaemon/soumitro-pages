/* eslint-disable */
import Step from 'components/wizard/Variant-sot-2638-bv-personalization/step';
import { showExternalLoading, hideExternalLoading } from './shared';
const CONTINUE_SESSION_INDEX = 2;

function onUserFormSubmitStart(stepCompleted) {
  const { headerToDisplay, duration } = this;
  $('#anyThingElse').validate({
    rules: {
      fn: {
        required: false,
      },
      ln: {
        required: false,
      },
    },
    submitHandler: function() { 
      if($('#fn').val() || $('#ln').val() ) {
          showExternalLoading(stepCompleted, duration, CONTINUE_SESSION_INDEX);
       }else{
        stepCompleted();  
      }   
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
    duration: 30,
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
