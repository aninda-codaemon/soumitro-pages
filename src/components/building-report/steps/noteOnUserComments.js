import Step from '../../wizard/step';

function onNoteOnUserCommentsStart(stepCompleted) {
  var duration = this.duration;
  var $useCasesModal = $('#gen-report-modal3');

  $('#fcraGroup').validate({
    rules: {
      fcraCheckbox: {
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
      fcraCheckbox: 'Please check the box to continue'
    },
    submitHandler: function (form) {
      stepCompleted();
    }
  });
}

const noteOnUserComments = Object.assign({}, Step);
noteOnUserComments.init({
  title: 'Note on User Comments',
  $elem: $('#gen-report-modal3'),
  duration: 20,
  onStart: onNoteOnUserCommentsStart
});

export { noteOnUserComments };
