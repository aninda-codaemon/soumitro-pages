import { track } from 'utils/track';

const onBreakingPlane = function onBreakingPlane(opts, showModal) {
  const { elem, cb, override } = opts;
  const sensitivity = 20;
  const delayBeforeFiring = 0;
  let delayTimer;
  let firedBreakingPlaneAlready = false;
  const fireBounce = function fireBounce() {
    if (firedBreakingPlaneAlready) {
      return;
    }
    firedBreakingPlaneAlready = true;
    if (override) {
      cb();
      track('onBreakingPlane Modal - Viewed');
    } else {
      showModal(elem, 'onBreakingPlane');
    }
  };

  $(document).on('mouseleave', (evt) => {
    const tagName = evt.target.tagName || '';
    if (evt.clientY > sensitivity || tagName.toLowerCase() === 'select') {
      return;
    }
    delayTimer = setTimeout(fireBounce, delayBeforeFiring);
  });

  $(document).on('mouseenter', () => {
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
  });
};

export { onBreakingPlane };
