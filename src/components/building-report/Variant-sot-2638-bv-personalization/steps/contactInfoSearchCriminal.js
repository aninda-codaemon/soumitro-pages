import Step from 'components/wizard/step';


function onScanningContactInfoStart(stepCompleted) {
  var { duration } = this;
  const $progressBar = $('#contactinfo-criminal-modal-progress .progress-bar');
  const $spinner = $('#contactInfoSearchCriminalModal .loading-spinner');
  const $icon = $('#contactInfoSearchCriminalModal .contact-info-icon-container');
  const interval = duration / ($spinner.length + 1);
  let counter = 0;

  var barProgress = $progressBar.animate(
    { width: '100%' },
    { duration },
  );
  const displayIcon = () => {
    if (counter < $spinner.length) {
      $spinner.eq(counter).delay(interval).fadeIn('fast', () => {
        $icon.eq(counter).css('visibility', 'visible');
        $spinner.eq(counter).css('visibility', 'hidden');
        counter++;
        displayIcon();
      });
    }
  };
  displayIcon();
  $.when(barProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const contactInfoScan = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Contact Information Search',
    $elem: $('#contactInfoSearchCriminalModal'),
    duration: 32,
    onStart: onScanningContactInfoStart,
  }, options);

  contactInfoScan.init(newConfig);
  return contactInfoScan;
}

export default createComponent;
