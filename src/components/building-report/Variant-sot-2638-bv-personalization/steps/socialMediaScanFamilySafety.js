import {
    shuffle,
    range,
  } from 'lodash';
  import Step from 'components/wizard/Variant-sot-2638-bv-personalization/step';
  
  function onScanningSocialMediaStart(stepCompleted) {
    var { duration, footerToDisplay, $elem } = this;
    var $modFooter = $($elem).nextAll('.mod-footer');
    var socialPromise = $('#socialmedia-progress .progress-bar').animate(
      { width: '100%' },
      { duration },
    );
    var $scanContainer = $('.social-media-modal-container');
    var $lis = $('#social-media-groups li');
    var listLen = $lis.length;
    var listIdxs = shuffle(range(0, listLen));
    var currIdx = 0;
  
    var intervalId = window.setInterval(() => {
      var listIdx;
      var $loadingImg;
      if (currIdx >= listLen) {
        return;
      }
      listIdx = listIdxs[currIdx];
      $loadingImg = $($lis[listIdx]).find('.loading');
      $loadingImg.css('opacity', 0);
      $loadingImg.next().fadeIn();
      currIdx += 1;
    }, Math.round(duration / listLen));
    $scanContainer
      .find('#social-scan-default-text').addClass('hidden')
      .end()
      .find('#social-scan-familysafety-text').removeClass('hidden').addClass('text-center');
    $modFooter.hide();
    $modFooter.eq(footerToDisplay).show();
    $.when(socialPromise).done(() => {
      stepCompleted();
      window.clearInterval(intervalId);
    });
  }
  
  function createComponent(options = {}) {
    const socialMediaScan = Object.assign({}, Step);
    let newConfig = Object.assign({
      title: 'Social Media Scan',
      $elem: $('#scanningSocialMedia'),
      duration: 32,
      onStart: onScanningSocialMediaStart,
    }, options);
  
    socialMediaScan.init(newConfig);
    return socialMediaScan;
  }
  
  export default createComponent;
  