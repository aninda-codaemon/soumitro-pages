import {
  forEach as _forEach,
  noop as _noop
} from 'lodash';

const defaults = {
  onBlur: {
    elem: "#downsell-blur",
    override: false,
    cb: _noop,
    outOfFocusDuration: 60 * 1000
  },
  onBack: {
    elem: "#downsell-back",
    override: false,
    cb: _noop
  },
  onIdle: {
    elem: "#downsell-idle",
    override: false,
    cb: _noop,
    inactiveThreshold: 30 * 1000
  },
  onUnload: {
    elem: "#downsell-unload",
    override: false,
    cb: _noop
  },
  onBreakingPlane: {
    elem: "#downsell-breaking",
    override: false,
    cb: _noop,
  }
};


const determineDurationBucket = function (duration) {
  const buckets = {
    30: "30s - 44s",
    45: "45s - 59s",
    60: "60s - 74s",
    75: "75s - 89s",
    90: "90s - 104s",
    105: "105s - 119s",
    120: "120s - 134s",
    135: "135s - 149s",
    150: "150s - 164s"
  };
  if (duration < 30) {
    return "Less than 30s";
  }
  if (duration > 165) {
    return "More than 165s";
  }
  var msg = ""
    , found = false;
  _forEach(buckets, function (v, k) {
    var nextVal = (parseInt(k, 10) + 15);
    if (!found && duration >= parseInt(k, 10) && duration < nextVal) {
      found = true;
      msg = v;
    }
  });
  return msg;
};

const isIE = navigator.userAgent.toLowerCase().indexOf('msie') > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./),
  isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
  isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1,
  isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;


export {
  defaults,
  determineDurationBucket,
  isIE,
  isFF,
  isAndroid,
  isIOS
}
