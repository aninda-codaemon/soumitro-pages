import { track } from 'utils/track';

const markHash = (cb) => {
  window.location.hash = '';

  window.setTimeout(() => {
    window.location.hash = '.';
    cb();
  }, 3000);
};

const pollForHashChange = (opts, showModal) => {
  const { elem, cb, override } = opts;
  window.setInterval(() => {
    if (window.location.hash === '#') {
      if (override) {
        cb();
        track('onBack Modal - Viewed');
      } else {
        showModal(elem, 'onBack');
      }
    }
  }, 400);
};

const listenToHashChanges = (opts, showModal, isIE) => {
  const { elem, cb, override } = opts;
  if (isIE) {
    pollForHashChange(opts, showModal);
    return;
  }
  $(window).on('hashchange', () => {
    const { hash } = window.location;
    if (!hash || hash === '#') {
      if (override) {
        cb();
        track('onBack Modal - Viewed');
      } else {
        showModal(elem, 'onBack');
        $('body').click();
      }
    }
  });
};

const onBack = (opts, showModal, isIE) => {
  markHash(() => {
    listenToHashChanges(opts, showModal, isIE);
  });
};

export { onBack };
