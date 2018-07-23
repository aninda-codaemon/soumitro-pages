import Step from 'components/wizard/step';
const $progressBar = $('#searching-progress-bar-database-bgsearch .progress-bar');
const quotes = $('.info-list');
const olList = $('.info-list-ol');
let quoteIndex = -1;
let olListCounter = 0;
let liCounter = 0;
let faceId;
faceId = $(`.fim${liCounter}`);

 const showNextListQuote = (duration) => {
  quoteIndex++;
   if (quoteIndex < 7) {
      quotes.eq(quoteIndex % quotes.length)
        .fadeIn(450, function() {
          olList.eq(olListCounter).each(function() {
            $(this).find('li').each(function(i) {
                $(this).delay(1000 * i).show(110,function(){
                  faceId.hide();
                  liCounter++;
                  faceId = $(`.fim${liCounter}`);
                  faceId.show();
                });
              });
            olListCounter++;
          }); 
        })
      .delay(duration / (quotes.length + 1))
      .fadeOut(100, () => showNextListQuote(duration));
    }
  };

function onBgSearchUseCasesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
   showNextListQuote(duration);
  $.when(initialProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const bgSearchUseCases = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Background Search',
    $elem: $('#gen-bgsearch-modal1'),
    duration: 20,
    onStart: onBgSearchUseCasesStart,
  }, options);
  bgSearchUseCases.init(newConfig);
  return bgSearchUseCases;
}

export default createComponent;
