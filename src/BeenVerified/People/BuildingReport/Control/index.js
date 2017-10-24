import { getTeaserData } from 'api/teaser';
import { getExtraTeaserData } from 'api/extraTeaser';
import amplify from 'utils/amplifyStore';
import { initializeBVGO } from 'utils/bvgo';
import { getBVId, getQueryArgs, isValidPeopleQuery } from 'utils/queryArgs';
import * as localStorage from 'utils/localStorage';
import { addRelativesModal, wizard } from 'components/building-report';
import 'utils/framerida';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/styles.css';

const isLocalStorageSupported = localStorage.isSupported();
const queryArgs = getQueryArgs();
const validQueryArgs = isValidPeopleQuery(queryArgs);
const bvid = getBVId(queryArgs);

const includeRelativesModal = extraTeaserData => {
  if (extraTeaserData.hasRelatives) {
    addRelativesModal();
  }
}

const initializeTestimonials = () => {
  const TESTIMONIAL_DURATION = 17000;
  const numTestimonals = 10;
  let testSwitchNum = 0;

  const testimonialsSwitcher = () => {
    const $item = $('.test-act:first');
    const $nextItem = $('.test-act.hidden:first');
    $item.remove();
    $nextItem.fadeIn('fast').removeClass('hidden');

    if (++testSwitchNum < numTestimonals) {
      setTimeout(testimonialsSwitcher, TESTIMONIAL_DURATION);
    }
  };
  setTimeout(testimonialsSwitcher, TESTIMONIAL_DURATION);
}

const initializeQueryArgs = (queryArgs, validQueryArgs) => {
  queryArgs.state = queryArgs.state || 'all';
  if (validQueryArgs) {
    amplify.store('searchData', queryArgs);
    getTeaserData(queryArgs, recordCounts.QUERY);
  } else {
    // TODO: rewrite this.
    // window.bv.utils.notifyRecordCount(recordCounts.LANDING);
  }
}

getExtraTeaserData(bvid).then(includeRelativesModal);

jQuery.fx.interval = 100;
initializeTestimonials();
initializeQueryArgs(queryArgs, validQueryArgs);
initializeBVGO(wizard.skipStep);


// TODO: notifyRecordCount
// TODO: getTeaserData