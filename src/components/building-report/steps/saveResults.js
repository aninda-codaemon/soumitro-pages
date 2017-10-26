import Step from '../../wizard/step';
import { showExternalModal } from './shared';

function reportLeadData(dataArray) {
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

  var srchData = amplify.store('searchData'),
    firstName = '',
    lastName = '';

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
  _.forEach(leadData, function (v, k) {
    leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
  });
  var leadQueryString = leadQueryArr.join('&');
  return $.post(LEADS_ENDPOINT, leadQueryString);
};

function onSaveResultsStart(stepCompleted) {
  var duration = this.duration;
  var $signupModalForm = $('#signup-modal-form');
  var validator = $signupModalForm.validate({
    'account[first_name]': 'required',
    'account[last_name]': 'required',
    'user[email]': {
      required: true,
      email: true
    },
    messages: {
      'account[first_name]': 'Please enter a first name',
      'account[last_name]': "Please enter a last name",
      'user[email]': 'Please enter a valid email address'
    }
  });
  $('#signup-modal-form').on('submit', function (evt) {
    evt.preventDefault();
    if (validator.form()) {
      track('Submitted Lead Form - Success');
      try {
        reportLeadData($(this).serializeArray());
      } catch (err) { }
    }
  }).on('submit', function () {
    var SAVE_RESULTS_INDEX = 0;
    showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX);
  });
}

const saveResults = Object.assign({}, Step);
saveResults.init({
  title: 'Save Results',
  $elem: $('#gen-report-modal6'),
  duration: 18,
  onStart: onSaveResultsStart
});

export { saveResults };
