import Step from 'components/wizard/step';

function onPreparingMonitoringStart(stepCompleted) {
  $('#ongoing-notifications').on('click', stepCompleted);
}

const preparingMonitoring = Object.assign({}, Step);
preparingMonitoring.init({
  title: 'Preparing Monitoring',
  $elem: $('#gen-report-modal4'),
  onStart: onPreparingMonitoringStart,
});

export { preparingMonitoring };
