import Step from 'components/wizard/step';

const $progressBar = $('#searching-progress-bar-tackling-challenge .progress-bar');
const $quotes = $('.tackling-challenge-speech-bub-sec1');
const $part1 = $('.tackling-challenge-part1-speech-bub');
const $part2 = $('.tackling-challenge-part2-speech-bub');

const showNextQuote = (duration) => {
  let quotesID;
  let interval = duration / ($quotes.length + 1);
  let maxSteps = 0;
  let part1Length = $part1.length;
  
  $part2.hide();  
  $quotes.eq(maxSteps).hide().css('visibility', 'visible').fadeIn(1000);

  const displayText = setInterval(() => {
    maxSteps++;
    if (maxSteps == part1Length) {
      clearInterval(displayText);
      $('.tackling-challenge-top-header').hide();
      $('div#tackling-challenge-section1').removeClass('icons-container');
      $part1.hide();
      $part2.show();
    }    
    $quotes.eq(maxSteps).hide().css('visibility', 'visible').fadeIn(1000);
  }, interval);
};

function onTacklingChallengesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const tacklingChallenges = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Tackling Your Challenges',
    $elem: $('#tacklingChallenges'),
    duration: 40,
    onStart: onTacklingChallengesStart,
  }, options);
  tacklingChallenges.init(newConfig);
  return tacklingChallenges;
}

export default createComponent;
