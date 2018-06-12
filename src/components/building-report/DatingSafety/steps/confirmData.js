import Step from 'components/wizard/step';

function onConfirmDataStart(stepCompleted) {
  $('#confirmData .main-btn').on('click', stepCompleted);
}

function createComponent(options = {}) {
  const confirmData = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Public Records Review',
    $elem: $('#confirmData'),
    onStart: onConfirmDataStart,
  }, options);
  confirmData.init(newConfig);
  return confirmData;
}

export default createComponent;
