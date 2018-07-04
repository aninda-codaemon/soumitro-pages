import Step from 'components/wizard/step';

const $progressBar = $('#searching-progress-bar-old-flame-contact .progress-bar');
const $quotes = $('.old-flame-speech-bub-sec1');
const $part1 = $('.old-flame-part1-speech-bub');
const $part2 = $('.old-flame-part2-speech-bub');

const showNextQuote = (duration) => {
  let quotesID;
  let interval = duration / ($quotes.length + 1);
  let maxSteps = 0;
  let part1Length = $part1.length;

  $part2.hide();
  $quotes.hide();
  $quotes.eq(maxSteps).fadeIn(1000);

  const displayText = setInterval(() => {
    maxSteps++;
    if (maxSteps == part1Length) {
      clearInterval(displayText);
      $('.old-flames-top-header').hide();
      $('div.icons-container').removeClass('icons-container');
      $part1.hide();
      $part2.show();
    }
    $quotes.eq(maxSteps).fadeIn(1000);
  }, interval);
};

function onContactOldFlamesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const oldFlameContact = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'For Finding Old Flames, Former Classmates, & Lost Loved Ones',
    $elem: $('#oldFlamesContactModal'),
    duration: 30,
    onStart: onContactOldFlamesStart,
  }, options);
  oldFlameContact.init(newConfig);
  return oldFlameContact;
}

export default createComponent;
