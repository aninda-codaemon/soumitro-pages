// TODO: Use track/index.js instead.
const _get = 'lodash/get';

const trackGA = (eventName, props) => {
  if (typeof window.dataLayer !== 'undefined') {
    var gaData = {
      event: 'flowrida_visitor_event',
      eventLabel: eventName,
    };
    if (props) {
      gaData.visitorEventInfo = JSON.stringify(props)
    }

    window.dataLayer.push(gaData);
  }
};

/**
 * @param { eventName, props } args 
 */
const track = (...args) => {
  const trackingFunctions = [
    _.get(window, 'nolimit.track'),
    _.get(window, 'heap.track'),
    trackGA
  ];

  trackingFunctions.forEach(trackingFn => trackingFn && trackingFn(...args));
};

export { track };
