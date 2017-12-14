let lastActive = Date.now();
let onIdleShown = false;

const onIdle = function onIdle(opts, showModal) {
  $(window).on('touchstart', () => {
    lastActive = Date.now();
  });

  $(window).on('click', () => {
    lastActive = Date.now();
  });

  $(window).on('scroll', () => {
    lastActive = Date.now();
  });

  window.setInterval(() => {
    if (onIdleShown) {
      return;
    }
    const timeDelta = Date.now() - lastActive;
    if (timeDelta >= opts.inactiveThreshold) {
      onIdleShown = true;
      showModal(opts.elem, 'onIdle', true);
    }
  }, 1000);
};

export { onIdle };
