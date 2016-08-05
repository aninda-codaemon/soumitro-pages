;(function(w) {
  var trackNL = function(evtName, props) {
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
  };
  
  w.reportLeadData = function(dataArray) {
    var formVals = {};

    _.forEach(dataArray, function(v, k) {
      formVals[v.name] = v.value;
    });

    var srchData = amplify.store("searchData"),
        firstName = "",
        lastName = "";

    if (srchData) {
      firstName = srchData.fn || "";
      lastName = srchData.ln || "";
    }

    var leadData = {};
    leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
    leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
    leadData['lead[email]'] = formVals['user[email]'] || '';
    leadData['lead[zip]'] = formVals['account[zip]'] || '';
    leadData['lead[state]'] = formVals['account[state]'] || '';
    leadData['record_search[first_name]'] = firstName;
    leadData['record_search[last_name]'] = lastName;

    var leadQueryArr = [];

    _.forEach(leadData, function(v, k) {
      leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });

    var leadQueryString = leadQueryArr.join('&');

    return $.post('/api/v4/leads.json', leadQueryString);
  };

  $("#signup-modal-form").on('submit', function(evt) {
    evt.preventDefault();

    if (window.validator.form()) {
	  trackNL("Submitted Lead Form - Success");
      
      try {
        w.reportLeadData($(this).serializeArray());
      } catch (err) {}
    }
  });
}(window));
