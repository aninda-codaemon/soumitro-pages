import Step from 'components/wizard/step';

function onDatingFcraConfirmationStart(stepCompleted) {
  $('.headline').html('Final Message: Please Read');
  $('.subHeadline').addClass('text-red').html('Important').show();
  $('.wizard-header').hide();
  $('.dating-header').html('<div class="text-center">Your Report is Ready!</div>').show();
  $('#fcra-dating-confirm').validate({
    rules: {
      fcraCheckboxDating: {
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
      fcraCheckboxDating: 'Please check the box to continue',
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
