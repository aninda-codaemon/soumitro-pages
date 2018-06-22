import Step from 'components/wizard/step';

let counter = 1;
function onScanningContactInfoStart(stepCompleted) {
  var { duration } = this;

  var socialPromise = $('#contactinfo-progress .progress-bar').animate(
    { width: '100%' },
    { duration },
  );
  
  let interval = duration / 2;

  (() => {
    $('.spinner1').css('visibility', 'visible');
    $('.spinner2').css('visibility', 'visible');
  })();

  const displayIcon = setInterval(() => {
    $(`.spinner${counter}`).css('visibility', 'hidden');
    $(`.icon${counter}`).css('visibility', 'visible');
    counter++;

    if (counter === 3) {
      clearInterval(displayIcon);
    }
  }, interval);

  $.when(socialPromise).done(() => {
    stepCompleted();
    window.clearInterval(displayIcon);
  });
}

function createComponent(options = {}) {
  const contactInfoScan = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Contact Information Search',
    $elem: $('#scanningContactInfo'),
    duration: 32,
    onStart: onScanningContactInfoStart,
  }, options);

  contactInfoScan.init(newConfig);
  return contactInfoScan;
}

export default createComponent;
