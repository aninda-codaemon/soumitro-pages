import { SEARCH_QUERY } from 'constants/storage'; 
import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from 'components/wizard/step';
import { criminalScan } from '../../Control/steps/criminalScan';

criminalScan.onBeforeStart = function onBeforeStartCriminalScan() {
  $('.headline').text('Loading Public Records Service');
};

export { criminalScan };
