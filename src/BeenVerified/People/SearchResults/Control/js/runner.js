import {
  findIndex,
  isFinite,
} from 'lodash';
import { getTeaserData } from 'api/teaser';
import { recordCounts } from 'constants/recordCounts';
import { notifyRecordCount } from 'utils/track/notifyRecordCount';
import { getQueryArgs, isValidPeopleQuery } from 'utils/queryArgs';
import * as localStorage from 'utils/localStorage';
import amplify from 'utils/amplifyStore';
import { initializeReloadCachedPageHandler } from 'utils/browser';
import { initilizeSearchFilters } from 'components/people-results-table';
import 'utils/framerida';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/styles.css';
import '../css/cheatersbadge.css';
import '../css/refine-modal.scss';

import { initializeDownsells } from './downsell';
import { initializePeopleValidator } from './people-validator';
import { initializeResizeHandler } from './resize-handler';

let activated = false;
const queryArgs = getQueryArgs();
const validQueryArgs = isValidPeopleQuery(queryArgs);
// const bvid = getBVId(queryArgs);
const nextPage = $('body').data('next-page');
const $topBanner = $('#top-banner');
const $toggleSearchBar = $('.search-toggled');
const $searching = $('#results-wrapper-searching');
const $noResults = $('#no-results');
const $dataPanel = $('#data-panel');
const $searchBar = $('#search-bar');
const windowWidth = $(window).width();
const windowSmall = 767;
let skipped = amplify.store('skippedForward') ? amplify.store('skippedForward') : false;
const SKIP_SEG_FILE = '2597_263';
const isSegmentPage = queryArgs.segfid === SKIP_SEG_FILE;

localStorage.isSupported();

const showHeader = () => {
  $searchBar.show();
};

const hideHeader = () => {
  if (!$searchBar.hasClass('no-hide-header')) {
    $searchBar.hide();
  }
};

const determineLayoutState = () => {
  if (windowWidth <= windowSmall) {
    hideHeader();
  } else {
    showHeader();
  }
};

const showSearchingAnimation = () => {
  $noResults.hide();
  $dataPanel.hide();
  $searching.fadeIn();
  $(window).trigger('gettingResults');
};

const hideSearchingAnimation = () => {
  $searching.hide();
};

const determineCollapse = () => {
  let $filters = $('#filters');
  if (window.innerWidth >= 768) {
    $filters.removeClass('collapse');
    return;
  }
  if (!$filters.hasClass('collapse')) {
    $filters.addClass('collapse');
  }
};

const showResultsPanel = () => {
  determineCollapse();
  $topBanner.show();
  $noResults.hide();
  $dataPanel.fadeIn();
};

const showNoResultsPanel = () => {
  $noResults.fadeIn();
  $dataPanel.hide();
};

const activateRows = () => {
  if (activated) {
    return;
  }
  activated = true;
  $dataPanel.on('click', 'tr.results-row', (e) => {
    e.preventDefault();
    // TODO: isn't
    // window.hasClickedResult = true;
    amplify.store('skippedForward', true);
    window.setTimeout(() => {
      var currentRecord = amplify.store('currentRecord') || {};
      var searchData = amplify.store('searchData') || {};
      window.location = `${nextPage}?fn=${(searchData.fn || '')}&ln=${(searchData.ln || '')}&mi=${(searchData.mi || '')}&city=${(searchData.city || '')}&state=${(searchData.state || '')}&bvid=${currentRecord.bvid}`;
    }, 300);
  });
};

const skipToFlow = () => $('a#result0').trigger('click');

const renderResults = () => {
  const teaserData = amplify.store('teaserData');
  const queryData = amplify.store('query');
  const teaserCount = teaserData ? parseInt(teaserData.recordCount, 10) : 0;

  if (!teaserData || teaserCount === 0) {
    showNoResultsPanel();
    return;
  }
  showResultsPanel();
  activateRows();
  if (isSegmentPage && teaserCount === 1) {
    if (skipped !== true) {
      skipToFlow();
    } else {
      amplify.store('skippedForward', false);
      skipped = false;
    }
  }
  $(window).trigger('newResults');
  // bvid param? start the modal flow!
  if (queryData && typeof queryData.bvid !== 'undefined') {
    let resultId = findIndex(teaserData.teasers, t => t.bvid === queryData.bvid);
    if (typeof resultId !== 'undefined' && isFinite(resultId)) {
      $(`a#result${resultId}`).trigger('click');
    }
  }
  initilizeSearchFilters({
    recordCount: teaserCount,
    onReset: () => determineCollapse(),
  });
};

const searchPeople = (query, notificationType) => {
  showSearchingAnimation();
  getTeaserData(query).then(() => notifyRecordCount(notificationType))
    .then(hideSearchingAnimation)
    .then(renderResults);
};

const initializeQueryArgs = (args, validArgs) => {
  args.state = args.state || 'All';
  if (validArgs) {
    amplify.store('searchData', args);
    showSearchingAnimation();
    searchPeople(args, recordCounts.QUERY);
    return;
  }
  hideSearchingAnimation();
  renderResults();
  notifyRecordCount(recordCounts.LANDING);
};

const initializeToggleSearch = () => {
  $('.btn-search-bar').on('click', () => {
    $toggleSearchBar.toggleClass('hidden');
  });
};

const initializeRefine = () => {
  $dataPanel.on('click', '.refine-modal-trigger', (event) => {
    event.preventDefault();
    // TODO - should I have this here?
    // validateRefineForm();
    $('#refine-modal').modal('show');
  });
};

const initialize = () => {
  jQuery.fx.interval = 100;
  window.$ = jQuery;
  showSearchingAnimation();
  initializePeopleValidator({
    onSubmit: (args) => {
      $toggleSearchBar.addClass('hidden');
      searchPeople(args, recordCounts.RESEARCH);
    },
  });
  initializeToggleSearch();
  initializeQueryArgs(queryArgs, validQueryArgs);
  initializeRefine();
  initializeDownsells();
  initializeResizeHandler(determineCollapse, determineLayoutState);
  initializeReloadCachedPageHandler();
};

export { initialize };
