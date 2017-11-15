import { track } from 'utils/track';
import {
  noop,
} from 'lodash';

const beforeUnload = () => {
  track('onBeforeUnload Popup - Viewed');
  // TODO: this stop is referencing the index stop variable, need to pass it as a parameter.
  if (stop) {
    window.onbeforeunload = noop;
    return '';
  }
  stop = true;
  $('.modal.in').modal('hide');

  const $subscribeBounceTB = $('#subscribe_bounce_text');
  let text = null;
  let bounceRedirect = null;

  if ($subscribeBounceTB.length > 0) {
    text = $subscribeBounceTB.text();
    bounceRedirect = $subscribeBounceTB.data('sub-bounce-url');
  }
  const redirectTo = bounceRedirect || 'https://www.beenverified.com/subscribe/view_report_trial';
  window.onbeforeunload = noop;
  window.setTimeout(() => {
    window.setTimeout(() => {
      track('onBeforeUnload Popup - Accepted', {
        redirected_to: redirectTo,
      });
      window.location = redirectTo;
    }, 500);
  }, 5);
  return text || '\n*************************************************\nWANT UNLIMITED REPORTS FOR JUST $1?\n*************************************************\n\n\n*** Please stay on this page for more details. ***\n\n\n\n';
};

const onUnload = () => {
  window.onbeforeunload = beforeUnload;
};

export { onUnload };
