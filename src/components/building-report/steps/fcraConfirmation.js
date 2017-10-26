import Step from '../../wizard/step';
import { showExternalLoading } from './shared';

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

const confirmFCRA = Object.assign({}, Step);
confirmFCRA.init({
  title: 'Please Confirm',
  trackMsg: 'Viewed FCRA Modal',
  $elem: $('#gen-report-modal11'),
  duration: 32,
  onStart: onFcraConfirmationStart
});

export { confirmFCRA };
