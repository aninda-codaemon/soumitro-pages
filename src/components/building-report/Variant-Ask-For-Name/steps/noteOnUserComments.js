import { SEARCH_QUERY } from 'constants/storage'; 
import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from 'components/wizard/step';
import { noteOnUserComments } from '../../Control/steps/noteOnUserComments';

noteOnUserComments.onBeforeStart = function onBeforeStartNoteOnUserComments() {
  $('.headline').text('Important: Real Records Given');
};

export { noteOnUserComments };
