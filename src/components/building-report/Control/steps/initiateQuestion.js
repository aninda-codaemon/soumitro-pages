import Step from 'components/wizard/step';

function showSubHeadlines(totalSections) {
  var containerSelector = $('.wizard-content');
  var stepsContainerSelector = $('.wizard-header');
  var stepSelector = $('.wizard-step');
  var sections = $(containerSelector).find(stepSelector);
  var isModal = true;
  var step = 1;
  sections.hide();
  $(sections[0]).show();
  if (isModal) {
    $('#wizModal').on('hidden.bs.modal', () => {
      step = 1;
      $($(`${containerSelector} .wizard-steps-panel .step-number`)
        .removeClass('done')
        .removeClass('doing')[0])
        .toggleClass('doing');

      $($(`${containerSelector} .wizard-step`)
        .hide()[0])
        .show();
    });
  }
  $('#wizModal').find('.wizard-steps-panel').remove();
  stepsContainerSelector.prepend(`<div class="wizard-steps-panel steps-quantity-${totalSections}"></div>`);
  let stepsPanel = $('#wizModal').find('.wizard-steps-panel');
  for (let s = 1; s <= 4; s++) {
    stepsPanel.append(`<div class="step-number step-${s}"><div class="number">${s}</div></div>`);
  }
  $('#wizModal')
    .find(`.wizard-steps-panel .step-${step}`)
    .toggleClass('doing')
    .find('.number')
    .html('&nbsp;');
}

function onInitiateQuestion() {
  $('.icon-text-wrapper').click(() => {
    showSubHeadlines(4);
  });
}

function createComponent(options = {}) {
  const initiateQuestion = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'What Are You Most Interested In?',
    $elem: $('#initiate-report'),
    onStart: onInitiateQuestion,
  }, options);

  initiateQuestion.init(newConfig);
  return initiateQuestion;
}

export default createComponent;
