import amplify from 'utils/amplifyStore';

function saveLeads(dataArray) {
  var hostname = window.location.hostname;
  if (hostname && hostname.indexOf('secure.') > -1) {
    hostname = hostname.replace('secure.', 'www.');
    var LEADS_ENDPOINT_URL = 'https://' + hostname + '/api/v4/leads.json';
  }
  var LEADS_ENDPOINT = LEADS_ENDPOINT_URL || '/api/v4/leads.json';

  var formVals = {};
  _.forEach(dataArray, function (v, k) {
    formVals[v.name] = v.value;
  });

  var hasEmailOption = formVals.hasOwnProperty('email_opt_in');

  var srchData = amplify.store('searchData'),
    firstName = '',
    lastName = '';

  if (srchData) {
    firstName = srchData.fn || '';
    lastName = srchData.ln || '';
  }

  var leadData = {};
  leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
  leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
  leadData['lead[email]'] = formVals['user[email]'] || '';
  leadData['lead[zip]'] = formVals['account[zip]'] || '';
  leadData['lead[state]'] = formVals['account[state]'] || '';
  leadData['record_search[first_name]'] = firstName;
  leadData['record_search[last_name]'] = lastName;
  if (hasEmailOption) {
    leadData['lead[email_opt_in]'] = formVals['email_opt_in'] ? true : false;
  }

  amplify.store('leadData', formVals);

  var leadQueryArr = [];
  _.forEach(leadData, function (v, k) {
    leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
  });
  var leadQueryString = leadQueryArr.join('&');
  return $.post(LEADS_ENDPOINT, leadQueryString);
};

export { saveLeads };
