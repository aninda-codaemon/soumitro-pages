import states from 'constants/states';
import { isMobile } from 'utils/browser';

var windowWidth = $(window).width();
var stateConverted = false;

const convertState = (name, to) => {
  var returnthis = false;
  name = name.toUpperCase();
  states.forEach((value) => {
    if (to === 'name') {
      if (value.abbr === name) {
        returnthis = value.name;
        return false;
      }
    } else if (to === 'abbrev') {
      if (value.name.toUpperCase() === name) {
        returnthis = value.abbr;
        return false;
      }
    }
    return true;
  });
  return returnthis;
};

const callToConvertStates = () => {
  $('.fullState').each(function converEachState(i, obj) {
    var abrevState = obj.innerText;
    var fullState = convertState(abrevState, 'name');
    this.innerText = fullState;
  });
};

const updateStates = () => {
  if (isMobile) {
    callToConvertStates();
  }
  stateConverted = true;
};

const initializeResizeHandler = (determineCollapse, determineLayoutState) => {
  determineLayoutState();
  determineCollapse();
  $('[data-toggle="tooltip"]').tooltip();

  $(window).on('resize', function onResize() {
    var currentWidth = $(this).width();
    var resizeHappened = false;
    determineCollapse();

    if (currentWidth !== windowWidth) {
      windowWidth = currentWidth;
      resizeHappened = true;
    }
    // Fix for IE8 reporting fake window resizing when the document dimensions change.
    if (!resizeHappened) return;
    determineLayoutState();
  });

  $(window)
    .on('load resize', () => {
      if ($(window).width() < 767 && stateConverted === false) {
        updateStates();
      }
    })
    .on('gettingResults', () => {
      stateConverted = false;
    })
    .on('newResults', () => {
      updateStates();
    });
};

export { initializeResizeHandler };
