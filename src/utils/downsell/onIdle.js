var lastActive = Date.now(), onIdleShown = false;

const onIdle = function (opts, showModal) {
  $(window).on("touchstart", function () {
    lastActive = Date.now();
  });

  $(window).on("click", function () {
    lastActive = Date.now();
  });

  $(window).on('scroll', function () {
    lastActive = Date.now();
  });

  window.setInterval(function () {
    if (onIdleShown)
      return;
    var timeDelta = Date.now() - lastActive;
    if (timeDelta >= opts.inactiveThreshold) {
      onIdleShown = true;
      showModal(opts.elem, "onIdle", true);
    }
  }, 1000);
};

export { onIdle };
