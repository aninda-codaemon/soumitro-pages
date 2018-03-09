import { SEARCH_QUERY } from 'constants/storage';
import { nameize } from 'utils/strings';
import { validateLeadsForm } from 'components/leads-form';
import Step from 'components/wizard/step';
import amplify from 'utils/amplifyStore';

function onSaveResultsStart(stepCompleted) {
  const $signupModalForm = $('#signup-modal-form');
  const onSubmit = () => {
    stepCompleted();
  };
  validateLeadsForm($signupModalForm, onSubmit);
}

function onBeforeStartSaveResults() {
  const query = amplify.store(SEARCH_QUERY) || {};
  const fn = nameize(query.fn);
  const ln = nameize(query.ln);
  const fullName = `${fn} ${ln}`;
  $('.headline').text(`Building Report: ${fullName}`);
}

function createComponent(options = {}) {
  const saveResults = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Save Your Search',
    $elem: $('#gen-report-modal6'),
    onStart: onSaveResultsStart,
    onBeforeStart: onBeforeStartSaveResults,
  }, options);
  saveResults.init(newConfig);

  return saveResults;
}

export default createComponent;