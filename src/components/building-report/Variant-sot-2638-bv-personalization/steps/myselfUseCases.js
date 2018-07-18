/* eslint-disable */
import Step from 'components/wizard/step';

const $progressBar = $('#searching-progress-bar-database-myself .progress-bar');
const quotes = $('.speech-bub-wrapper-myself');

const showNextQuote = (duration) => {
  let quotesID;
  let interval = duration / (quotes.length + 1);

  (() => {
    $('#speech-bub-myself-wrapper1').hide().css('visibility', 'visible').fadeIn(1000);
  })();

  let arrCounter = 2;
  const displayText = setInterval(() => {
    quotesID = $(`#speech-bub-myself-wrapper${arrCounter}`);
    arrCounter++;
    quotesID.hide().css('visibility', 'visible').fadeIn(1000);
    if (arrCounter > quotes.length) {
      clearInterval(displayText);
      $('.part1-speech-bub-myself').hide();
      $('#myself-modal-body-header').hide();
      $('.part2-speech-bub-myself').fadeIn(1000);
    }
  }, interval);
};

function onMyselfUseCasesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const myselfUseCases = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'For Monitoring Your Reputation, Associates, & Online Presence',
    $elem: $('#gen-myself-modal1'),
    duration: 35,
    onStart: onMyselfUseCasesStart,
  }, options);
  myselfUseCases.init(newConfig);
  return myselfUseCases;
}

export default createComponent;
