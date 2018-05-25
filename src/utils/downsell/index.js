import { extend } from 'lodash';
import { track } from 'utils/track';
import { defaults, determineDurationBucket, isIE } from './config';
import { onBack } from './onBack';
import { onBlur } from './onBlur';
import { onBreakingPlane } from './onBreakingPlane';
import { onIdle } from './onIdle';

const opts = {};
let stop = false;

// TODO: Investigate how this works. Maybe this active Modal looks like prevents to display a modal?
let activeModal;
const showModal = function showModal(id, eventType, suppress, durSecs) {
  if (eventType) {
    const props = {};
    props.downsell_id = id;
    if (durSecs) {
      props.duration = determineDurationBucket(durSecs);
    }
    track(`${eventType} Modal - Viewed`, props);
  }
  $('.modal.in').modal('hide');
  if (stop || activeModal === opts.onBack.elem || activeModal === opts.onUnload.elem) {
    return;
  }
  if (suppress !== true) {
    $(activeModal).modal('hide');
    $(id).modal({
      backdrop: 'static',
      keyboard: false,
      show: true,
    });
    activeModal = id;
    stop = true;
  }
};

const downsell = {
  init(options) {
    extend(opts, defaults, options);
    onBack(opts.onBack, showModal, isIE);
    onIdle(opts.onIdle, showModal);
    onBlur(opts.onBlur, showModal);
    onBreakingPlane(opts.onBreakingPlane, showModal);
  },
  stop() {
    $(document).off('mouseleave');
    $(document).off('mouseenter');
    $(window).off('hashchange');
  },
};

export { downsell };
