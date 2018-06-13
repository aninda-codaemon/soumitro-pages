import Step from 'components/wizard/step';

function onScanningCriminalDataStart(stepCompleted) {
  var $progessBar = $('#searching-progress-bar-criminal-dating .progress-bar');
  var { duration } = this;
  var initialProgress = $($progessBar).animate({ width: '100%' }, {
    duration,
    progress(animation, progress) {
      var progression = Math.ceil(progress * 100);
      $('#socialmedia-progress-percent-dating').html(progression);
    },
  });
  var $crimSteps = $('#scanningCriminal-dating li');
  var $crimStepsIco = $('#scanningCriminal-dating li i');
  var currentCrimStep = 0;
  var stepBoxSection = () => {
    if (currentCrimStep < $crimSteps.length) { // if not past the end then
      $crimSteps.eq(currentCrimStep).delay(duration / ($crimSteps.length + 1)).fadeIn('fast', () => {
        $crimStepsIco.eq(currentCrimStep).removeClass('fa-circle-o-notch fa-spinner fa-pulse fa-3x fa-fw');
        $crimStepsIco.eq(currentCrimStep).addClass('fa-circle');
        $crimStepsIco.eq(currentCrimStep).css('color', '#4A3B8F');
        $crimSteps.eq(currentCrimStep).removeClass('blurryText');
        currentCrimStep++;
        stepBoxSection();
      });
    }
  };
  $crimSteps.eq(0).show();
  stepBoxSection();

  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const criminalScan = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Criminal Record Search',
    $elem: $('#scanningCriminal-dating'),
    duration: 1,
    onStart: onScanningCriminalDataStart,
  }, options);

  criminalScan.init(newConfig);
  return criminalScan;
}

export default createComponent;
