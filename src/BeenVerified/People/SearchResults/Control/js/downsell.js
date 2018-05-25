import { downsell } from 'utils/downsell';
import { track } from 'utils/track';

let shownExitPop = false;
// let shownExitPopSkip = false;

const exitPop = () => {
  if (shownExitPop || window.hasClickedResult || $('#no-results').is(':visible')) {
    return;
  }
  let $refineModal = $('#refine-modal');
  shownExitPop = true;
  track('Viewed Exit Pop Modal');
  // TODO: should do this here?
  // validateRefineForm();

  // Show the modal.
  $refineModal.modal('show');
  $refineModal.find('input[name="fn"]').focus();

  $('#refine-modal .modal-dialog').on('click', () => {
    track('Exit Pop Modal - Clicked');
  });
};

const activateDownsells = () => {
  downsell.init({
    onBack: {
      override: true,
      cb: exitPop,
    },
    onBreakingPlane: {
      override: true,
      cb: exitPop,
    },
  });
};

const initializeDownsells = () => {
  const VWO_CHECK_INTERVAL = 3000;
  const CHECK_TIMEOUT = 5000;
  var timeElapsed = 1000;
  var vwoCode = window._vwo_code; // eslint-disable-line
  var vwoIntervalId;
  var vwoExists = typeof vwoCode !== 'undefined' && typeof vwoCode.finished === 'function'; // eslint-disable-line

  if (!vwoExists) {
    activateDownsells();
    return;
  }
  vwoIntervalId = window.setInterval(() => {
    timeElapsed += VWO_CHECK_INTERVAL;
    if (timeElapsed > CHECK_TIMEOUT || vwoCode.finished()) {
      window.clearInterval(vwoIntervalId);
      activateDownsells();
    }
  }, VWO_CHECK_INTERVAL);
};

export { initializeDownsells };
