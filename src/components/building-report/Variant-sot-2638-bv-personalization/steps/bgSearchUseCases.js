/* eslint-disable */
import Step from 'components/wizard/step';
const $progressBar = $('#searching-progress-bar-database-bgsearch .progress-bar');
const quotes = $('.info-list');
const olList = $('.info-list-ol');
const faceImgList = $('.contact-info-image');
let $next = 1;
let $current = 0;
let $interval = 1950;
let $fadeTime = 0;
let $imgNum = 13;
let quoteIndex = -1;
let olListCounter = 0;

const showNextListQuote = (duration) => {
  quoteIndex++;
   if (quoteIndex < 7) {
    quotes.eq(quoteIndex % quotes.length)
     .fadeIn(800, function() {
        olList.eq(olListCounter).each(function() {
           $(this).find('li').each(function(i) {
            $(this).delay(1600 * i).show(110);
            });
           olListCounter++;
        }); 
       })
    .delay(duration / (quotes.length + 1))
  .fadeOut(100, () => showNextListQuote(duration));
  }
};

const loadFaceImg = (duration) => {
  loopShowHideFaceImg();
};

function onBgSearchUseCasesStart(stepCompleted) {
  var { duration } = this;
  var initialProgress = $($progressBar).animate({ width: '100%' }, { duration });
   $.when(loadFaceImg(duration)).then(showNextListQuote(duration));
   $.when(initialProgress).done(stepCompleted);
}

function loopShowHideFaceImg(){
  faceImgList.eq($current).delay($interval).hide($fadeTime)
  .end().eq($next).delay($interval).hide().show($fadeTime, loopShowHideFaceImg);

  if($next < $imgNum-1){ $next++; } else { $next = 0;}
  if($current < $imgNum-1){ $current++; } else { $current =0; }
};

function createComponent(options = {}) {
  const bgSearchUseCases = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Background Search',
    $elem: $('#gen-bgsearch-modal1'),
    duration: 25,
    onStart: onBgSearchUseCasesStart,
  }, options);
  bgSearchUseCases.init(newConfig);
  return bgSearchUseCases;
}

export default createComponent;
