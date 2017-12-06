import {
  forEach,
} from 'lodash';
import amplify from 'utils/amplifyStore';

function saveLeads(dataArray) {
  var { location: { hostname } } = window;
  var formVals = {};
  var leadData = {};
  var leadQueryArr = [];
  var LEADS_ENDPOINT_URL;
  var LEADS_ENDPOINT;
  var leadQueryString;
  // Does we have a checkbox asking for send emails?
  var hasEmailOption = $('#emailCheckbox').length === 1;
  var srchData = amplify.store('searchData');
  var firstName = '';
  var lastName = '';

  if (hostname && hostname.indexOf('secure.') > -1) {
    hostname = hostname.replace('secure.', 'www.');
    LEADS_ENDPOINT_URL = `https://${hostname}/api/v4/leads.json`;
  }
  LEADS_ENDPOINT = LEADS_ENDPOINT_URL || '/api/v4/leads.json';
  forEach(dataArray, (v) => {
    formVals[v.name] = v.value;
  });

  if (srchData) {
    firstName = srchData.fn || '';
    lastName = srchData.ln || '';
  }

  leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
  leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
  leadData['lead[email]'] = formVals['user[email]'] || '';
  leadData['lead[zip]'] = formVals['account[zip]'] || '';
  leadData['lead[state]'] = formVals['account[state]'] || '';
  leadData['record_search[first_name]'] = firstName;
  leadData['record_search[last_name]'] = lastName;
  if (hasEmailOption) {
    leadData['lead[email_opt_in]'] = !!formVals.email_opt_in;
  }

  amplify.store('leadData', formVals);

  forEach(leadData, (v, k) => {
    leadQueryArr.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });
  leadQueryString = leadQueryArr.join('&');
  return $.post(LEADS_ENDPOINT, leadQueryString);
}

export { saveLeads };
