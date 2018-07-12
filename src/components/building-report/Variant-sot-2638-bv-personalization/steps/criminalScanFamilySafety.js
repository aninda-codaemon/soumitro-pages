import Step from 'components/wizard/Variant-sot-2638-bv-personalization/step';

function onScanningCriminalDataStart(stepCompleted) {
  var $progessBar = $('#searching-progress-bar-criminal .progress-bar');
  var { duration, footerToDisplay, $elem } = this;
  var $modFooter = $($elem).nextAll('.mod-footer');
  var initialProgress = $($progessBar).animate({ width: '100%' }, {
    duration,
    progress(animation, progress) {
      var progression = Math.ceil(progress * 100);
      $('#socialmedia-progress-percent').html(progression);
    },
  });
  var $crimSteps = $('#scanningCriminal li');
  var $crimStepsIco = $('#scanningCriminal li i');

  var $criminalHeader = $('#criminalHeader');
  var $criminalHeaderFamilySafety = $('#criminalHeaderFamilySafety');
  var $criminalContent = $('#criminalContent');
  
  $criminalHeader.addClass('hidden');
  $criminalHeaderFamilySafety.removeClass('hidden');

  $criminalContent.find('.text-center').addClass('hidden').end();
  $criminalHeaderFamilySafety.find('p').addClass('text-center');
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
  $modFooter.hide();
  $modFooter.eq(footerToDisplay).show();
  $crimSteps.eq(0).show();
  stepBoxSection();

  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const criminalScan = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Criminal Record Search',
    $elem: $('#scanningCriminal'),
    duration: 32,
    onStart: onScanningCriminalDataStart,
  }, options);

  criminalScan.init(newConfig);
  return criminalScan;
}

export default createComponent;
