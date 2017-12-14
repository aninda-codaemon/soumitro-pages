let blurTime;
let onBlurShown = false;

const onBlur = (opts, showModal) => {
  $(window).on('blur', () => {
    if (onBlurShown) {
      return;
    }
    blurTime = Date.now();
  });
  $(window).on('focus', () => {
    if (onBlurShown) {
      return;
    }
    const timeNow = Date.now();
    const outOfFocusDuration = timeNow - blurTime;

    if (outOfFocusDuration > opts.outOfFocusDuration) {
      onBlurShown = true;
      showModal(opts.elem, 'onBlur', true, (outOfFocusDuration / 1000));
    }
  });
};

export { onBlur };
