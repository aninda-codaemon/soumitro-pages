// import { getTeaserData } from 'api/teaser';
// import { getExtraTeaserData } from 'api/extraTeaser';
// import { initializeBVGO } from 'utils/bvgo';
// import { notifyRecordCount } from 'utils/track/notifyRecordCount';
// import { getBVId, getQueryArgs, isValidPeopleQuery } from 'utils/queryArgs';
// import { nameize } from 'utils/strings';
import * as localStorage from 'utils/localStorage';
// import amplify from 'utils/amplifyStore';
import 'utils/framerida';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/styles.css';

// const queryArgs = getQueryArgs();
// const validQueryArgs = isValidPeopleQuery(queryArgs);
// const bvid = getBVId(queryArgs);
const $toggleSearchBar = $('.search-toggled');
localStorage.isSupported();

const initializeToggleSearch = () => {
  $('.btn-search-bar').click(() => $toggleSearchBar.toggleClass('hidden'));
};

const initialize = () => {
  jQuery.fx.interval = 100;
  window.$ = jQuery;

  initializeToggleSearch();
};

export { initialize };
