import { getTeaserData } from 'api/teaser';
import { getExtraTeaserData } from 'api/extraTeaser';
import { initializeBVGO } from 'utils/bvgo';
import { notifyRecordCount } from 'utils/track/notifyRecordCount';
import { getBVId, getQueryArgs, isValidPeopleQuery } from 'utils/queryArgs';
import { nameize } from 'utils/strings';
import * as localStorage from 'utils/localStorage';
import amplify from 'utils/amplifyStore';
import 'utils/framerida';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/styles.css';


const queryArgs = getQueryArgs();
const validQueryArgs = isValidPeopleQuery(queryArgs);
const bvid = getBVId(queryArgs);
const recordCounts = {
  LANDING: 'RecordCount UponLanding',
  RESEARCH: 'RecordCount Re-Searching',
  QUERY: 'RecordCount QueryArgs',
};
let buildingReport = null;  // Injected Dependency.

localStorage.isSupported();

const includeRelativesModal = shouldDisplayRelatives => (extraTeaserData) => {
  if (shouldDisplayRelatives && extraTeaserData.hasRelatives) {
    buildingReport.addRelativesModal();
  }
};

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
};

const initializeQueryArgs = (args, validArgs) => {
  args.state = args.state || 'all';
  if (validArgs) {
    amplify.store('searchData', args);
    getTeaserData(args)
      .then(() => notifyRecordCount(recordCounts.QUERY));
  } else {
    notifyRecordCount(recordCounts.LANDING);
  }
};

const initialize = (buildingReportInstance, shouldDisplayRelatives = false) => {
  buildingReport = buildingReportInstance;
  jQuery.fx.interval = 100;
  initializeTestimonials();
  initializeQueryArgs(queryArgs, validQueryArgs);

  if (bvid && queryArgs.bvid) {
    getExtraTeaserData(bvid).then(includeRelativesModal(shouldDisplayRelatives));
  } else {
    const searchData = amplify.store('searchData') || {};
    searchData.fullName = `${nameize(searchData.fn)} ${nameize(searchData.ln)}`;
    amplify.store('searchData', searchData);
    amplify.store('currentRecord', null);
  }
  initializeBVGO(buildingReport.wizard.skipStep);
  buildingReport.wizard.start();
  window.$ = jQuery;
};

export { initialize };
