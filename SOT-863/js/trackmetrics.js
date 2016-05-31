(function (root) {

  var events = {
    SUCCESSFUL_SUBSCRIPTION: "RPL Successful Subscription",
    SUBMITTED_SUB_FORM: "RPL Submitted Subscription Form",
    NUMBER_NOT_FOUND:  "RPL PhoneNumber not Found",
    NUMBER_FOUND: "RPL PhoneNumber Found",
    NOTFOUND_MODAL_CANCEL: "RPL NotFound Modal Canceled",
    NOTFOUND_MODAL_CONTINUE: "RPL NotFound Modal Continued",
    BUSINESS_SEARCH: "RPL Business Number Searched",
    CONSUMER_SEARCH: "RPL Consumer Number Searched"
  };

  var _trackmetrics = {};


  var trackNL = function (evtName, props) {
    if (typeof nolimit !== 'undefined' && nolimit.track) {
      if (typeof props !== 'undefined') {
        try {
          nolimit.track(evtName, props);
        } catch (err) {}
      } else {
        try {
          nolimit.track(evtName);
        } catch (err) {}
      }
    }
    if (typeof heap !== 'undefined' && heap.track) {
      if (typeof props !== 'undefined') {
        try {
          heap.track(evtName, props);
        } catch (err) {}
      } else {
        try {
          heap.track(evtName);
        } catch (err) {}
      }
    }
  };

  _trackmetrics.submittedSubForm = function () {
    trackNL(events.SUBMITTED_SUB_FORM);
  };

  _trackmetrics.numberNotFound = function (opt) {
    trackNL(events.NUMBER_NOT_FOUND, opt);
  };

  _trackmetrics.numberFound = function (opt) {
    trackNL(events.NUMBER_FOUND, opt);
  };

  _trackmetrics.notFoundModalCancel = function () {
    trackNL(events.NOTFOUND_MODAL_CANCEL);
  };

  _trackmetrics.notFoundModalContinue = function () {
    trackNL(events.NOTFOUND_MODAL_CONTINUE);
  };

  _trackmetrics.successfulSubscription = function (opt) {
    trackNL(events.SUCCESSFUL_SUBSCRIPTION, opt);
  };

  _trackmetrics.businessNumberSearched = function (opt) {
    trackNL(events.BUSINESS_SEARCH, opt);
  };

  _trackmetrics.consumerNumberSearched = function (opt) {
    trackNL(events.CONSUMER_SEARCH, opt);
  };

  root._trackmetrics = _trackmetrics;

}(window));
