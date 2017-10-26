import Step from '../../wizard/step';

function onScanningCriminalDataStart(stepCompleted) {
  var $progessBar = $('#searching-progress-bar-criminal .progress-bar');
  var duration = this.duration;
  var initialProgress = $($progessBar).animate(
    { 'width': '100%' }, {
      duration: duration,
      progress: function (animation, progress) {
        var progression = Math.ceil(progress * 100);
        $('#socialmedia-progress-percent').html(progression);
      }
    }
  );

  var $crimSteps = $('#scanningCriminal li'),
    $crimStepsIco = $('#scanningCriminal li i'),
    currentCrimStep = 0;

  $crimSteps.eq(0).show();

  var stepBoxSection = function () {
    if (currentCrimStep < $crimSteps.length) { // if not past the end then
      $crimSteps.eq(currentCrimStep).delay(duration / ($crimSteps.length + 1)).fadeIn('fast', function () {
        $crimStepsIco.eq(currentCrimStep).removeClass('fa-circle-o-notch fa-spinner fa-pulse fa-3x fa-fw');
        $crimStepsIco.eq(currentCrimStep).addClass('fa-circle');
        $crimStepsIco.eq(currentCrimStep).css('color', '#4A3B8F');
        $crimSteps.eq(currentCrimStep).removeClass('blurryText');
        currentCrimStep++;
        stepBoxSection();
      });
    }
  };
  stepBoxSection();

  $.when(initialProgress).done(stepCompleted);
}

const criminalScan = Object.assign({}, Step);
criminalScan.init({
  title: 'Criminal Database Search',
  $elem: $('#scanningCriminal'),
  duration: 32,
  onStart: onScanningCriminalDataStart
});

export { criminalScan };
