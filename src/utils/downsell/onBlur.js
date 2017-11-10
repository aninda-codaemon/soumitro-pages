var blurTime, onBlurShown = false;

const onBlur = function (opts, showModal) {
  $(window).on("blur", function () {
    if (onBlurShown)
      return;
    blurTime = Date.now();
  });
  $(window).on("focus", function () {
    if (onBlurShown)
      return;
    var timeNow = Date.now(), 
      outOfFocusDuration = timeNow - blurTime;

    if (outOfFocusDuration > opts.outOfFocusDuration) {
      onBlurShown = true;
      showModal(opts.elem, "onBlur", true, (outOfFocusDuration / 1000));
    }
  });
};

export { onBlur };