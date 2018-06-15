import Step from 'components/wizard/step';

function onNoteOnUserCommentsStart(stepCompleted) {
  $('#fcraGroup').validate({
    rules: {
      fcraCheckbox: {
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
      fcraCheckbox: 'Please check the box to continue',
    },
    submitHandler() {
      stepCompleted();
    },
  });
}

function createComponent(options = {}) {
  const noteOnUserComments = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Anything Else You Want To Know?',
    $elem: $('#anything-else-datingflow'),
    duration: 20,
    onStart: onNoteOnUserCommentsStart,
  }, options);

  noteOnUserComments.init(newConfig);
  return noteOnUserComments;
}

export default createComponent;
