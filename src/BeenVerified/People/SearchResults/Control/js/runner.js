import {
  findIndex,
  isFinite,
} from 'lodash';
import { getTeaserData } from 'api/teaser';
// import { getExtraTeaserData } from 'api/extraTeaser';
import { recordCounts } from 'constants/recordCounts';
// import { initializeBVGO } from 'utils/bvgo';
import { notifyRecordCount } from 'utils/track/notifyRecordCount';
import { getQueryArgs, isValidPeopleQuery } from 'utils/queryArgs';
// import { nameize } from 'utils/strings';
import * as localStorage from 'utils/localStorage';
import amplify from 'utils/amplifyStore';
import 'utils/framerida';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/styles.css';

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
const $filters = $('#filters');
localStorage.isSupported();

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
    window.hasClickedResult = true;
    window.setTimeout(() => {
      var currentRecord = amplify.store('currentRecord') || {};
      var searchData = amplify.store('searchData') || {};
      window.location = `${nextPage}?fn=${(searchData.fn || '')}&ln=${(searchData.ln || '')}&mi=${(searchData.mi || '')}&city=${(searchData.city || '')}&state=${(searchData.state || '')}'&bvid=${currentRecord.bvid}`;
    }, 300);
  });
};

const renderResults = (teaserData, queryData) => {
  if (teaserData && teaserData.recordCount === 0) {
    showNoResultsPanel();
    return;
  }
  showResultsPanel();
  activateRows();
  // bvid param? start the modal flow!
  if (typeof queryData.bvid !== 'undefined') {
    let resultId = findIndex(teaserData.teasers, t => t.bvid === queryData.bvid);
    if (typeof resultId !== 'undefined' && isFinite(resultId)) {
      $(`a#result${resultId}`).trigger('click');
    }
  }
  // initSearchFilters();
};

const initializeQueryArgs = (args, validArgs) => {
  args.state = args.state || 'all';
  if (validArgs) {
    amplify.store('searchData', args);
    showSearchingAnimation();
    getTeaserData(args)
      .then(() => notifyRecordCount(recordCounts.QUERY))
      .then(hideSearchingAnimation)
      .then(renderResults);
  } else {
    notifyRecordCount(recordCounts.LANDING);
  }
};

const initializeToggleSearch = () => {
  $('.btn-search-bar').click(() => $toggleSearchBar.toggleClass('hidden'));
};

const initializeRefine = () => {
  $dataPanel.on('click', '.refine-modal-trigger', (event) => {
    event.preventDefault();
    validateRefineForm();
    $('#refine-modal').modal('show');
  });
};

const initialize = () => {
  jQuery.fx.interval = 100;
  window.$ = jQuery;

  initializeToggleSearch();
  initializeQueryArgs(queryArgs, validQueryArgs);
  initializeRefine();
};

export { initialize };
