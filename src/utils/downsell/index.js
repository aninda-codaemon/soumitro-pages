import {
  extend as _extend
} from 'lodash';

import { 
  defaults, 
  determineDurationBucket, 
  isIE 
} from './config';

import { onBack } from './onBack';
import { onUnload } from './onUnload';
import { onIdle } from './onIdle';
import { onBreakingPlane } from './onBreakingPlane';
import { onBlur } from './onBlur';
import { trackNL } from './trackNL';


// General Variables
Date.now = Date.now || function () {
  return +new Date;
};
var opts = {},
  stop = false;

//Modal
var activeModal;
var showModal = function (id, eventType, suppress, durSecs) {
  if (eventType) {
    var props = {};
    props.downsell_id = id;
    if (durSecs) {
      props.duration = determineDurationBucket(durSecs);
    }
    trackNL(eventType + " Modal - Viewed", props);
  }
  $(".modal.in").modal('hide');
  if (stop || activeModal === opts.onBack.elem || activeModal === opts.onUnload.elem) {
    return;
  }
  if (suppress !== true) {
    $(activeModal).modal('hide');
    $(id).modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    activeModal = id;
    stop = true;
  }
};

const downsell = {
  init(options) {
    _extend(opts, defaults, options);
    onBack(opts.onBack, showModal, isIE);
    //onUnload();
    onIdle(opts.onIdle, showModal);
    onBlur(opts.onBlur, showModal);
    onBreakingPlane(opts.onBreakingPlane, showModal);
  },
  stop() {
    $(document).off('mouseleave');
    $(document).off('mouseenter');
    $(window).off('hashchange');
  }
}

export { downsell };
