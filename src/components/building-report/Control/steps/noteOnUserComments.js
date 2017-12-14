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

const noteOnUserComments = Object.assign({}, Step);
noteOnUserComments.init({
  title: 'Note on User Comments',
  $elem: $('#gen-report-modal3'),
  duration: 20,
  onStart: onNoteOnUserCommentsStart,
});

export { noteOnUserComments };
