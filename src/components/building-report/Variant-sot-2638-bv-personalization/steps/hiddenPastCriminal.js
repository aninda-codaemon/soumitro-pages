import Step from 'components/wizard/step';

const $progressBar = $('#searching-progress-bar-hidden-past .progress-bar');
const $quotes = $('.hidden-past-speech-bub-sec1');
const $part1 = $('.hidden-past-part1-speech-bub');
const $part2 = $('.hidden-past-part2-speech-bub');

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
      $('.hidden-past-top-header').hide();
      $('div#hidden-past-section1').removeClass('icons-container');
      $part1.hide();
      $part2.show();
    }

    if (maxSteps < part1Length) {
    $quotes.eq(maxSteps).fadeIn(1000);}
  }, interval);
};

function onContactOldFlamesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const hiddenPast = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'For Knowing If Someone Has A Hidden Past',
    $elem: $('#hidden-criminal-past-modal'),
    duration: 35,
    onStart: onContactOldFlamesStart,
  }, options);
  hiddenPast.init(newConfig);
  return hiddenPast;
}

export default createComponent;
