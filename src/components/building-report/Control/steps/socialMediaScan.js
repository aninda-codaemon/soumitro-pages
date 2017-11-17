import Step from 'components/wizard/step';

function onScanningSocialMediaStart(stepCompleted) {
  var self = this;
  var duration = this.duration;

  var socialPromise = $('#socialmedia-progress .progress-bar').animate(
    { 'width': '100%' },
    { duration: duration }
  );

  var $lis = $('#social-media-groups li'),
    listLen = $lis.length,
    listIdxs = _.shuffle(_.range(0, listLen)),
    currIdx = 0;

  var intervalId = window.setInterval(function () {
    if (currIdx >= listLen) {
      return;
    }
    var listIdx = listIdxs[currIdx];
    var $loadingImg = $($lis[listIdx]).find('.loading');
    $loadingImg.css('opacity', 0);
    $loadingImg.next().fadeIn();
    currIdx += 1;
  }, Math.round(duration / listLen));

  $.when(socialPromise).done(function () {
    stepCompleted();
    window.clearInterval(intervalId);
  });
}

const socialMediaScan = Object.assign({}, Step);
socialMediaScan.init({
  title: 'Social Media Scan',
  $elem: $('#scanningSocialMedia'),
  duration: 32,
  onStart: onScanningSocialMediaStart
});

export { socialMediaScan };
