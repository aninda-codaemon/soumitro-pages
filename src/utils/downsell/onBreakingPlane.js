import { track } from 'utils/track';

const onBreakingPlane = function (opts, showModal) {
  var elem = opts.elem, 
    cb = opts.cb, 
    override = opts.override, 
    sensitivity = 20, 
    delayBeforeFiring = 0, 
    delayTimer, 
    firedBreakingPlaneAlready = false;
    
  const fireBounce = function () {
    if (firedBreakingPlaneAlready)
      return;
    firedBreakingPlaneAlready = true;
    if (override) {
      cb();
      track("onBreakingPlane Modal - Viewed");
    } else {
      showModal(elem, "onBreakingPlane");
    }
  };

  $(document).on('mouseleave', function (evt) {
    if (evt.clientY > sensitivity)
      return;
    delayTimer = setTimeout(fireBounce, delayBeforeFiring);
  });

  $(document).on('mouseenter', function (evt) {
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
  });
};

export { onBreakingPlane };
