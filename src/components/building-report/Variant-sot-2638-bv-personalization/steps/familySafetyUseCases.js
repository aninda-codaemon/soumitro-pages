import Step from 'components/wizard/step';
const $progressBar = $('#searching-progress-bar-database-familysafety .progress-bar');
const quotes = $('.speech-bub-wrapper-myself');

const showNextQuote = (duration) => {
  let quotesID;
  let interval = duration / (quotes.length + 1);

  (() => {
    $('#speech-bub-familysafety-wrapper1').hide().css('visibility', 'visible').fadeIn(1000);
  })();

  let arrCounter = 2;
  const displayText = setInterval(() => {
    quotesID = $(`#speech-bub-familysafety-wrapper${arrCounter}`);
    arrCounter++;
    quotesID.hide().css('visibility', 'visible').fadeIn(1000);
    if (arrCounter > quotes.length) {
      clearInterval(displayText);
      $('.part1-speech-bub-familysafety').hide();
      $('#familysafety-modal-body-header').hide();
      $('.part2-speech-bub-familysafety').fadeIn(1000);
    }
  }, interval);
};

function onFamilySafetyUseCasesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
  showNextQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const familySafetyUseCases = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'For Keeping Your Family Safe And Staying In The Know',
    $elem: $('#gen-familysafety-modal1'),
    duration: 30,
    onStart: onFamilySafetyUseCasesStart,
  }, options);
  familySafetyUseCases.init(newConfig);
  return familySafetyUseCases;
}

export default createComponent;
