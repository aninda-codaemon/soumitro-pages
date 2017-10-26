import Step from '../../wizard/step';

function onPreparingMonitoringStart(stepCompleted) {
  $('#ongoing-notifications').on('click', function () {
    stepCompleted();
  });
}

const preparingMonitoring = Object.assign({}, Step);
preparingMonitoring.init({
  title: 'Preparing Monitoring',
  $elem: $('#gen-report-modal4'),
  onStart: onPreparingMonitoringStart
});

export { preparingMonitoring };
