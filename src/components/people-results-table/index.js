import List from 'list.js';
import amplify from 'utils/amplifyStore';
import states from 'constants/states';
import { isMobile } from 'utils/browser';

const $topBanner = $('#top-banner');
const $resultsFilter = $('.results-filters');
const $resultsWrapper = $('#results-wrapper');
const $hasFilters = $('.hasFilters');
const $noFilters = $('.noFilters');
const $resultsFilters = $('.results-filters');
const $hasResults = $('.hasResults');
const $noResults = $('.noResults');
const $refineModal = $('#refine-modal');
const locationStep = window.location.pathname.split('/')[3];

const backTopAnimation = () => {
  var offset = 300;
  // browser window scroll (in pixels) after which the "back to top" link opacity is reduced
  var offsetOpacity = 1200;
  // duration of the top scrolling animation (in ms)
  var scrollTopDuration = 700;
  // grab the "back to top" link
  var $backToTop = $('.cd-top');

  // hide or show the "back to top" link
  $(window).scroll(function onScroll() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > offset) {
      $backToTop.addClass('cd-is-visible');
    } else {
      $backToTop.removeClass('cd-is-visible cd-fade-out');
    }
    if ($(this).scrollTop() > offsetOpacity) {
      $backToTop.addClass('cd-fade-out');
    }
  });

  // smooth scroll to top
  $backToTop.on('click', (event) => {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0,
    }, scrollTopDuration);
  });
};

const showNoResults = () => {
  $hasResults.hide();
  $noResults.show();
};

const showResults = () => {
  $noResults.hide();
  $hasResults.show();
};

const showSubHeaderMobile = ($subHeaderDesktop, $subHeaderMobile) => {
  $subHeaderDesktop.hide();
  $subHeaderMobile.show();
};

const showSubheaderDesktop = ($subHeaderDesktop, $subHeaderMobile) => {
  $subHeaderDesktop.show();
  $subHeaderMobile.hide();
};

const showSubHeader = () => {
  const $subHeaderDesktop = $('.subHeadOthers');
  const $subHeaderMobile = $('.subHeadMobile');
  if (isMobile) {
    showSubHeaderMobile($subHeaderDesktop, $subHeaderMobile);
  } else {
    showSubheaderDesktop($subHeaderDesktop, $subHeaderMobile);
  }
};

const updateRefineModal = () => {
  var recordCount = 0;
  if (amplify.store('teaserData') !== undefined) {
    recordCount = Number(amplify.store('teaserData').recordCount);
  }

  if (recordCount < 1) {
    showNoResults();
  } else {
    showResults();
    showSubHeader();
  }
};

const handleNoResults = () => {
  // if extra teaser data is defined - show refine modal only if not mobile
  if (amplify.store('teaserData') !== undefined && !isMobile) {
    updateRefineModal();
    $refineModal.modal('show');
    // TODO - should I have this here?
    // validateRefineForm();
    $hasFilters.hide();
    $noFilters.show();
  }
  updateRefineModal();

  // keep the filters hidden since no search results were found.
  $resultsFilter.hide();
  $hasFilters.hide();
  $noFilters.show();
  // hide entire top banner
  $topBanner.hide();
  // hide results container
  $resultsWrapper.hide();
};

const showFilters = () => {
  $('.results-filters').show();
  $('.hasFilters').show();
  $('.noFilters').hide();
};

const hideFilters = () => {
  $('.results-filters').hide();
  $('.hasFilters').hide();
  $('.noFilters').show();
};

const toggleFilters = (recordCount, minimunRecords) =>
  ((recordCount > minimunRecords) ? showFilters() : hideFilters());

const showFiltersOnDevice = (recordCount) => {
  const minimumMobileRecords = 9;
  const minimumDesktopRecords = 14;
  toggleFilters(recordCount, isMobile ? minimumMobileRecords : minimumDesktopRecords);
};

// TODO: Do we need this?
const hideFiltersOnTwo = () => {
  if (locationStep === '2') {
    hideFilters();
  }
};

// Sends all empty ages to bottom of results
const deprioritizeEmptyAges = (list) => {
  list.forEach((item) => {
    item.hide();
    $('#results').append(item.elm);
  });
};

const setFilterStates = () => {
  let age = $('#age').val();
  let state = $('#search-bar-state').val() || '';

  $('#age-filter').attr('disabled', age !== '');
  $('#state-filter').attr('disabled', state.toLowerCase() !== 'all');
};

const $clonedStateFilter = $('#state-filter').clone();
const $clonedAgeFilter = $('#age-filter').clone();

const updateFilterOptions = (results) => {
  // hide filter options except the all option
  // this makes all options hidden by default so we show only the needed options below
  $('.results-filters select option').remove();

  let $newStateFilter = $clonedStateFilter.clone();
  let $newAgeFilter = $clonedAgeFilter.clone();
  let statesObj = states.reduce((prev, { abbr, name }) => {
    prev[abbr] = {
      abbr,
      name,
      show: false,
    };
    return prev;
  }, {});
  let filteredAges = {
    '18-25': { range: [18, 25], show: false },
    '26-35': { range: [26, 35], show: false },
    '36-45': { range: [36, 45], show: false },
    '46-55': { range: [46, 55], show: false },
    '56-65': { range: [56, 65], show: false },
    '66-75': { range: [66, 75], show: false },
    '76-85': { range: [76, 85], show: false },
    '86-95': { range: [86, 95], show: false },
    '96-200': { range: [96, 200], show: false },
  };

  // loop through results list and only show the matching filters
  for (let item = 0; item < results.length; item++) {
    let currentRecord = results[item]._values; // eslint-disable-line
    // show age filter options that match ages in the results lista
    // refactored into the loop below but has issues with the last age-range option
    if (currentRecord.resultAge >= 18 && currentRecord.resultAge <= 25) {
      filteredAges['18-25'].show = true;
    } else if (currentRecord.resultAge >= 26 && currentRecord.resultAge <= 35) {
      filteredAges['26-35'].show = true;
    } else if (currentRecord.resultAge >= 36 && currentRecord.resultAge <= 45) {
      filteredAges['36-45'].show = true;
    } else if (currentRecord.resultAge >= 46 && currentRecord.resultAge <= 55) {
      filteredAges['46-55'].show = true;
    } else if (currentRecord.resultAge >= 56 && currentRecord.resultAge <= 65) {
      filteredAges['56-65'].show = true;
    } else if (currentRecord.resultAge >= 66 && currentRecord.resultAge <= 75) {
      filteredAges['66-75'].show = true;
    } else if (currentRecord.resultAge >= 76 && currentRecord.resultAge <= 85) {
      filteredAges['76-85'].show = true;
    } else if (currentRecord.resultAge >= 86 && currentRecord.resultAge <= 95) {
      filteredAges['86-95'].show = true;
    } else if (currentRecord.resultAge >= 96 && currentRecord.resultAge <= 200) {
      filteredAges['96-200'].show = true;
    }

    let abbr = currentRecord.resultPlace.split(', ')[1];
    if (statesObj[abbr]) {
      statesObj[abbr].show = true;
    }
  }

  Object.keys(filteredAges).forEach((key) => {
    if (!filteredAges[key].show) {
      $newAgeFilter.find(`option[value="${key}"]`).remove();
    }
  });

  Object.keys(statesObj).forEach((stateAbbr) => {
    if (!statesObj[stateAbbr].show) {
      $newStateFilter.find(`option[value="${stateAbbr}"]`).remove();
    }
  });

  $('#state-filter').append($newStateFilter.find('option'));
  $('#age-filter').append($newAgeFilter.find('option'));
  $('.results-filters select').val('All');
};

// Update the record count - to use when table filters change
const updateRecordCount = () => {
  const resultsRowsCount = $('#results .results-row').length;
  $('.record-count').text(resultsRowsCount);
  const newHeaderTextIndex = resultsRowsCount > 1 ? 0 : 1;
  $('[data-result-header]').each((index, element) => {
    const $elem = $(element);
    $elem.text($elem.data().resultHeader.split('-')[newHeaderTextIndex]);
  });
};

const getSearchName = () => {
  let searchData = amplify.store('searchData');
  if (!searchData) {
    return '';
  }
  // define each name var based on search data
  let { fn, ln, mi } = searchData;
  let searchedName = `${fn} ${ln}`;
  let fnSplit = (fn || '').split(' ');

  // if middle initial is in search data, use it.
  if (mi) {
    searchedName = `${fn} ${mi} ${ln}`;
  } else if (fnSplit.length === 2) {
    // if user typed in two first names, combine the first name
    searchedName = `${fnSplit[0] + fnSplit[1].toLowerCase()} ${ln}`;
  } else if (fnSplit.length === 3) {
    // if user typed in two first names and a third initial, combine it.
    searchedName = `${fnSplit[0] + fnSplit[1].toLowerCase()} ${fnSplit[2]} ${ln}`;
  }
  return searchedName;
};

const filterSearchResults = searchedNameParts => (item) => {
  let resultNameParts = item.values().resultName.split(' ');
  // check if a middle initial is in the search
  if (searchedNameParts.length === 3) {
    // filter only the full result name if it matches both the first and last name
    // the first letter of result's middle name must also match the middle initial
    return (
      resultNameParts[0] === searchedNameParts[0] &&
      resultNameParts[2] === searchedNameParts[2] &&
      resultNameParts[1].charAt(0).indexOf(searchedNameParts[1]) > -1
    );
  }
  // check if result name has a middle name/initial
  if (resultNameParts.length === 3) {
    // filter only the result's first and last name if it matches the first and last name
    return (
      resultNameParts.split(' ')[0] === searchedNameParts[0] &&
      resultNameParts[2] === searchedNameParts[1]
    );
  }
  // filter only the result's first and last name if it matches the first and last name
  return (
    resultNameParts[0] === searchedNameParts[0] &&
    resultNameParts[1] === searchedNameParts[1]
  );
};

const initilizeSearchFilters = ({ onReset, recordCount }) => {
  /*
    Define sort/filter options using the class names of the data elements
    these classes are linked to the table data in index.html
  */
  var options = {
    valueNames: ['resultName', 'resultAge', 'resultPlace'],
  };

  // check if there are results from the search
  if (recordCount > 0) {
    showFiltersOnDevice(recordCount);
    hideFiltersOnTwo();
    // update and hide refine modal
    updateRefineModal();
    $refineModal.modal('hide');

    // define new list using table id (results-table) with filter/sort options (table data classes)
    let searchResultsList = new List('results-table', options);
    let results = searchResultsList.get();
    let emptyAgeList = searchResultsList.get('resultAge', '');

    // update filter options based on results
    updateFilterOptions(results);

    // set filter states
    setFilterStates();

    // custom age sort event so that empty age gets filtered to the bottom of list
    $('#th-age').click(function onSortAge() {
      if ($(this).hasClass('asc')) {
        searchResultsList.sort('resultAge', { order: 'asc' });
        deprioritizeEmptyAges(emptyAgeList);
      } else {
        searchResultsList.sort('resultAge', { order: 'desc' });
      }
    });

    // age-filter action
    $('#age-filter').change(function onFilterAge() {
      var selection = this.value;

      // reset state filter
      $('#state-filter option[value=All]').prop('selected', true);

      // reset exact match filter
      $('.exact-match').removeClass('active');

      // @TODO: fix the issue with the age group filter ignoring 96+ age group
      // for now, ignoring the 96+ age group and creating a seperate condition seems to work
      if (selection && selection !== 'All' && selection !== '96-200') {
        searchResultsList.filter(item => (item.values().resultAge >= selection.split('-')[0] && item.values().resultAge <= selection.split('-')[1]));
        updateRecordCount();
      } else if (selection && selection === '96-200' && selection !== 'All') {
        // adding the above extra condition as a fix to the above condition
        // above does not filter out the last age group for some reason - need to debug that
        // this else if condition is the solution for filtering ages above 95
        searchResultsList.filter(item => (item.values().resultAge > 95));
        updateRecordCount();
      } else {
        searchResultsList.filter();
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      }
    });

    // state-filter action
    $('#state-filter').change(function onFilterState() {
      var selection = this.value;

      // reset age filter
      $('#age-filter option[value=All]').prop('selected', true);

      // reset exact match filter
      $('.exact-match').removeClass('active');

      if (selection && selection !== 'All') {
        searchResultsList.filter(item => item.values().resultPlace.split(', ')[1] === selection);
        updateRecordCount();
      } else {
        searchResultsList.filter();
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      }
    });

    let searchedName = getSearchName();

    // -- Back to Top Button Event Handler ---//
    backTopAnimation();

    // exact match filter action
    $('.exact-match').click(function onExactMatchClick() {
      $(this).toggleClass('active');

      // reset age filter
      $('#age-filter option[value=All]').prop('selected', true);

      // reset state filter
      $('#state-filter option[value=All]').prop('selected', true);

      if ($(this).hasClass('active')) {
        let searchedNameParts = searchedName.split(' ');
        searchResultsList.filter(filterSearchResults(searchedNameParts));
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      } else {
        searchResultsList.filter();
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      }
    });


    // reset filters
    $('.reset-filters').click(() => {
      // set these values to default
      $('#city').val('');
      $('#search-bar-state').val('All');
      $('#age').val('');

      // @TODO: call search function instead of simulating form submit
      $('#search-form').submit();
      onReset();
    });
  } else {
    handleNoResults();
  }
};

// keep all filters hidden by default
$resultsFilters.hide();

export { initilizeSearchFilters };
