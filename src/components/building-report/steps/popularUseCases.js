import Step from '../../wizard/step';

const $progressBar = $('#searching-progress-bar-database .progress-bar');
const quotesIco = $('.speech-bub-ico');
const quotes = $('.speech-bub');
let quoteIndex = -1;

const showNextQuote = duration => {
  quoteIndex++;
  if (quoteIndex < 4) {
    var nextQuoteIcon = quotesIco.eq(quoteIndex % quotesIco.length);
    var newIcon = nextQuoteIcon.attr('data-src');
    nextQuoteIcon.attr('src', newIcon);
    quotes.eq(quoteIndex % quotes.length)
      .fadeIn(1000)
      .delay(duration / (quotes.length + 1))
      .fadeOut(1000, () => showNextQuote(duration));
  }
};

function onPopularUseCasesStart(stepCompleted) {
  const duration = this.duration;
  showNextQuote(duration);

  var initialProgress = $($progressBar).animate(
    { 'width': '100%' }, {
      duration: duration
    }
  );

  $.when(initialProgress).done(stepCompleted);
}

const popularUseCases = Object.assign({}, Step);
popularUseCases.init({
  title: 'Popular Use Cases',
  $elem: $('#gen-report-modal1'),
  duration: 32,
  onStart: onPopularUseCasesStart,
});

export { popularUseCases };