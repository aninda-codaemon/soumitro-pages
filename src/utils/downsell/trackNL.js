//Tracker
const trackNL = function (evtName, props) {
  if (typeof nolimit !== 'undefined' && nolimit.track) {
    if (props) {
      nolimit.track(evtName, props);
    } else {
      nolimit.track(evtName);
    }
  }
  if (typeof heap !== 'undefined' && heap.track) {
    if (props) {
      heap.track(evtName, props);
    } else {
      heap.track(evtName);
    }
  }
  if (typeof dataLayer !== 'undefined') {
    var gaData;
    if (props) {
      gaData = {
        event: 'flowrida_visitor_event',
        eventLabel: evtName,
        visitorEventInfo: JSON.stringify(props)
      };
      dataLayer.push(gaData);
    } else {
      gaData = {
        event: 'flowrida_visitor_event',
        eventLabel: evtName
      };
      dataLayer.push(gaData);
    }
  }
};

export { trackNL };