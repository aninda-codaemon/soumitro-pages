/* eslint-disable */
import Step from 'components/wizard/step';

const $progressBar = $('#searching-progress-bar-database-dating .progress-bar');
const quotes = $('.speech-bub-dating-wrapper');

const showNextQuote = (duration) => {
  let quotesID;
  let interval = duration / (quotes.length + 1);

  (() => {
    $('#speech-bub-dating-wrapper1').hide().css('visibility', 'visible').fadeIn(1000);
  })();

  let arrCounter = 2;
  const displayText = setInterval(() => {
    quotesID = $(`#speech-bub-dating-wrapper${arrCounter}`);
    arrCounter++;
    quotesID.hide().css('visibility', 'visible').fadeIn(1000);
    if (arrCounter > quotes.length) {
      clearInterval(displayText);
      $('div.dating-safety-top-header').hide();
      $('.part1-speech-bub').hide();
      $('.part2-speech-bub').fadeIn(1000);
    }
  }, interval);
};

function onDatingUseCasesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const datingUseCases = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'For Safety, Peace Of Mind, & Finding Love',
    $elem: $('#gen-dating-modal1'),
    duration: 35,
    onStart: onDatingUseCasesStart,
  }, options);
  datingUseCases.init(newConfig);
  return datingUseCases;
}

export default createComponent;
