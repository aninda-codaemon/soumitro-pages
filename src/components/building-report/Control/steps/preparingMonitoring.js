import Step from 'components/wizard/step';

function onPreparingMonitoringStart(stepCompleted) {
  $('#ongoing-notifications').on('click', stepCompleted);
}

function createComponent(options = {}) {
  const preparingMonitoring = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Preparing Monitoring',
    $elem: $('#gen-report-modal4'),
    onStart: onPreparingMonitoringStart,
  }, options);

  preparingMonitoring.init(newConfig);
  return preparingMonitoring;
}

export default createComponent;
