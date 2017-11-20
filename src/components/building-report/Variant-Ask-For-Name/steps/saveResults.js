import { SEARCH_QUERY } from 'constants/storage'; 
import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from 'components/wizard/step';
import { saveResults } from '../../Control/steps/saveResults';

saveResults.onBeforeStart = function onDecorateSaveResultsBeforeStart() {
  const query = amplify.store(SEARCH_QUERY) || {};
  const fn = nameize(query.fn);
  const ln = nameize(query.ln);
  const fullName = `${fn} ${ln}`;
  this.title = `Save Your Search On ${fullName}`;
  $('.headline').text(`Building Report: ${fullName}`);
};

export { saveResults };
