import Step from 'components/wizard/step';

function onConfirmDataStart(stepCompleted) {
  $('#confirmData .main-btn').on('click', stepCompleted);
}

const confirmData = Object.assign({}, Step);
confirmData.init({
  title: 'Public Records Review',
  $elem: $('#confirmData'),
  onStart: onConfirmDataStart
});

export { confirmData };
