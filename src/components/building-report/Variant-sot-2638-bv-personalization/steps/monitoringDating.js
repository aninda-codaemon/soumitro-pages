import Step from 'components/wizard/step';

function onMonitoringDatingStart(stepCompleted) {
  var { duration } = this;
  const $progressBar = $('#preparing-monitoring-dating .progress-bar');

  var barProgress = $progressBar.animate(
    { width: '100%' },
    { duration },
  );
  $('.headline-text').html('Finalizing Report on ');
  $.when(barProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const preparingMonitoring = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Preparing Monitoring',
    $elem: $('#monitoringDatingModal'),
    onStart: onMonitoringDatingStart,
    duration: 30,
  }, options);

  preparingMonitoring.init(newConfig);
  return preparingMonitoring;
}

export default createComponent;
