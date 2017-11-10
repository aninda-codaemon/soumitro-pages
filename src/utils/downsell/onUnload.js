import { track } from 'utils/track';
import {
  noop as _noop
} from 'lodash';

var beforeUnload = function () {
  track("onBeforeUnload Popup - Viewed");
  //TODO: this stop is referencing the index stop variable, need to pass it as a parameter.
  if (stop) {
    window.onbeforeunload = _noop;
    return;
  }
  stop = true;
  $('.modal.in').modal('hide');
  
  var $subscribeBounceTB = $("#subscribe_bounce_text"), 
    text = null, 
    bounceRedirect = null,
    redirectTo;

  if ($subscribeBounceTB.length > 0) {
    text = $subscribeBounceTB.text();
    bounceRedirect = $subscribeBounceTB.data('sub-bounce-url');
  }
  redirectTo = bounceRedirect || "https://www.beenverified.com/subscribe/view_report_trial";
  window.onbeforeunload = _noop;
  window.setTimeout(function () {
    window.setTimeout(function () {
      track("onBeforeUnload Popup - Accepted", {
        redirected_to: redirectTo
      });
      window.location = redirectTo;
    }, 500);
  }, 5);
  return text || '\n*************************************************\nWANT UNLIMITED REPORTS FOR JUST $1?\n*************************************************\n\n\n*** Please stay on this page for more details. ***\n\n\n\n';
};

var onUnload = function () {
  window.onbeforeunload = beforeUnload;
};

export { onUnload };
