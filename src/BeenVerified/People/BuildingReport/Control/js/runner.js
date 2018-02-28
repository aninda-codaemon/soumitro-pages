import _get from 'lodash/get';
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
const recordCounts = {
  LANDING: 'RecordCount UponLanding',
  RESEARCH: 'RecordCount Re-Searching',
  QUERY: 'RecordCount QueryArgs',
};
let buildingReport = null; // Injected Dependency.

localStorage.isSupported();

const includeRelativesModal = (shouldDisplayRelatives) => {
  let currentRecord = amplify.store('currentRecord');
  var relatives = _get(currentRecord, 'Relatives.Relative') || [];

  if (shouldDisplayRelatives && relatives.length > 0) {
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

const shouldGetTeaserData = (args) => {
  var searchData = amplify.store('searchData') || {};
  let currentRecord = amplify.store('currentRecord');

  if (currentRecord && args.bvid && args.bvid !== currentRecord.bvid) {
    return true;
  }

  return (
    args.fn !== searchData.fn ||
    args.ln !== searchData.ln ||
    args.mi !== searchData.mi ||
    args.state !== searchData.state ||
    args.city !== searchData.city ||
    (args.age && args.age !== searchData.age)
  );
};

const initializeQueryArgs = (args, validArgs) => {
  args.state = args.state || 'all';
  if (validArgs && shouldGetTeaserData(args)) {
    args.fullName = `${nameize(args.fn)} ${nameize(args.ln)}`;

    amplify.store('searchData', args);
    amplify.store('currentRecord', null);
    getTeaserData(args)
      .then(() => notifyRecordCount(recordCounts.QUERY));
  } else {
    notifyRecordCount(recordCounts.LANDING);
  }
};

const initialize = (
  buildingReportInstance,
  shouldDisplayRelatives = false,
  shouldGetExtraTeaserDataOnLastStep = false,
) => {
  const SECTION_BEFORE_LEADBOX = 1; // zero index based.
  let bvid = getBVId(queryArgs);
  buildingReport = buildingReportInstance;
  jQuery.fx.interval = 100;
  initializeTestimonials();
  initializeQueryArgs(queryArgs, validQueryArgs);

  initializeBVGO(buildingReport.wizard.skipStep);
  if (shouldGetExtraTeaserDataOnLastStep) {
    buildingReport.wizard.subscribeOnLastStepStart(() => {
      getExtraTeaserData(bvid);
    });
  } else {
    buildingReport.wizard.subscribeOnSectionCompleted((sectionIndex) => {
      if (sectionIndex === SECTION_BEFORE_LEADBOX && bvid) {
        getExtraTeaserData(bvid);
      }
    });
  }
  buildingReport.wizard.start();
  includeRelativesModal(shouldDisplayRelatives);
  window.$ = jQuery;
};

export { initialize };
