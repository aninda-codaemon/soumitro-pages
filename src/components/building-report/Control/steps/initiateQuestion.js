import Step from 'components/wizard/step';

function onInitiateQuestion() {
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
