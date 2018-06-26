import Step from 'components/wizard/step';

const CONTINUE_SESSION_INDEX = 1;

function onDatingFcraConfirmationStart(stepCompleted) {
  var self = this;
  $('#fcra-dating-confirm').validate({
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
      stepCompleted();
    },
  });
}

function createComponent(options = {}) {
  const confirmDatingFCRA = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Your Report Is Ready!',
    trackMsg: 'Viewed Dating FCRA Modal',
    $elem: $('#fcraDatingModal'),
    duration: 32,
    onStart: onDatingFcraConfirmationStart,
  }, options);
  confirmDatingFCRA.init(newConfig);
  return confirmDatingFCRA;
}

export default createComponent;
