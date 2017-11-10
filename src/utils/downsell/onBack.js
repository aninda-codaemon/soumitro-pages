import { trackNL } from './trackNL';

const markHash = function (cb) {
  window.location.hash = "";

  window.setTimeout(function () {
    window.location.hash = ".";
    cb();
  }, 3000);
};

var pollForHashChange = function (opts, showModal) {
  var elem = opts.elem
    , cb = opts.cb
    , override = opts.override;
  window.setInterval(function () {
    if (window.location.hash === "#") {
      if (override) {
        cb();
        trackNL("onBack Modal - Viewed");
      } else {
        showModal(elem, "onBack");
      }
    }
  }, 400);
};

const listenToHashChanges = function (opts, showModal, isIE) {
  var elem = opts.elem
    , cb = opts.cb
    , override = opts.override;
  if (isIE) {
    pollForHashChange(opts, showModal);
    return;
  }
  $(window).on("hashchange", function () {
    var hash = window.location.hash;
    if (!hash || hash === "#") {
      if (override) {
        cb();
        trackNL("onBack Modal - Viewed");
      } else {
        showModal(elem, "onBack");
        $("body").click();
      }
    }
  });
};

const onBack = function (opts, showModal, isIE) {
  markHash(function () {
    listenToHashChanges(opts, showModal, isIE);
  });
};

export { onBack };