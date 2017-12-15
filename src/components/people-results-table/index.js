import amplify from 'utils/amplifyStore';
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
  $(window).scroll(function onScrolls() {
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

const handleNoResults = () => {
  // if extra teaser data is defined - show refine modal only if not mobile
  if (amplify.store('teaserData') !== undefined && !isMobile) {
    updateRefineModal();
    $refineModal.modal('show');
    validateRefineForm();
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

const showFiltersOnMobile = (recordCount, minimunRecords) =>
  ((recordCount > minimunRecords) ? showFilters() : hideFilters());

const showFiltersOnDesktop = (recordCount, minimunRecords) =>
  ((recordCount > minimunRecords) ? showFilters() : hideFilters());

const showFiltersOnDevice = (recordCount) => {
  const minimumMobileRecords = 20;
  const minimumDesktopRecords = 14;
  if (isMobile) {
    showFiltersOnMobile(recordCount, minimumMobileRecords);
  } else {
    showFiltersOnDesktop(recordCount, minimumDesktopRecords);
  }
};

// TODO: Do we need this?
const hideFiltersOnTwo = () => {
  if (locationStep === '2') {
    hideFilters();
  }
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

const initSearchFilters = () => {
  const recordCount = Number($('.record-count').text());
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
      $('#state-filter option[value=all]').prop('selected', true);

      // reset exact match filter
      $('.exact-match').removeClass('active');

      // @TODO: fix the issue with the age group filter ignoring 96+ age group
      // for now, ignoring the 96+ age group and creating a seperate condition seems to work
      if (selection && selection !== 'all' && selection !== '96-200') {
        searchResultsList.filter(item => (item.values().resultAge >= selection.split('-')[0] && item.values().resultAge <= selection.split('-')[1]));
        updateRecordCount();
      }
      // adding this extra condition as a fix to the above condition
      // above does not filter out the last age group for some reason - need to debug that
      // this else if condition is the solution for filtering ages above 95
      else if (selection && selection === '96-200' && selection !== 'all') {
        searchResultsList.filter(item => (item.values().resultAge > 95));
        updateRecordCount();
      }
      else {
        searchResultsList.filter();
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      }
    });

    // state-filter action
    $('#state-filter').change(function onFilterState() {
      var selection = this.value;

      // reset age filter
      $('#age-filter option[value=all]').prop('selected', true);

      // reset exact match filter
      $('.exact-match').removeClass('active');

      if (selection && selection !== 'all') {
        searchResultsList.filter(item => item.values().resultPlace.split(', ')[1] === selection);
        updateRecordCount();
      } else {
        searchResultsList.filter();
        deprioritizeEmptyAges(emptyAgeList);
        updateRecordCount();
      }
    });

    // define searched name
    var searchedName = '';
    // first check to see if search data exists
    // @TODO: refactor this as a function
    if (amplify.store('searchData')) {
      // define each name var based on search data
      var first = amplify.store('searchData').fn + ' ',
        middle = amplify.store('searchData').mi + ' ',
        last = amplify.store('searchData').ln;

      // check if middle initial is in search data
      // define search name var based on the middle initial condition
      if (amplify.store('searchData').mi !== '') {
        if (amplify.store('searchData').mi !== undefined && amplify.store('searchData').mi !== null) {
          searchedName = first + middle + last;
        } else {
          searchedName = first + last;
        }
        // if user typed in two first names,
        // split the value and combine into one name
      } else if (amplify.store('searchData').fn.split(' ').length === 2) {
        first = amplify.store('searchData').fn.split(' ')[0] + amplify.store('searchData').fn.split(' ')[1].toLowerCase() + ' ';

        searchedName = first + last;
        // if user typed in two first names and a third initial
        // split the value and seperate into first and middle
      } else if (amplify.store('searchData').fn.split(' ').length === 3) {
        first = amplify.store('searchData').fn.split(' ')[0] + amplify.store('searchData').fn.split(' ')[1].toLowerCase() + ' ';
        middle = amplify.store('searchData').fn.split(' ')[2] + ' ';

        searchedName = first + middle + last;
      } else {
        searchedName = first + last;
      }
    }

    // -- Back to Top Button Event Handler ---//
    backTopAnimation();

    // exact match filter action
    $('.exact-match').click(function () {
      $(this).toggleClass('active');

      // reset age filter
      $('#age-filter option[value=all]').prop('selected', true);

      // reset state filter
      $('#state-filter option[value=all]').prop('selected', true);

      if ($(this).hasClass('active')) {

        // @TODO: refactor into function
        searchResultsList.filter(function (item) {
          // check if a middle initial is in the search
          if (searchedName.split(' ').length === 3) {
            // filter only the full result name if it matches both the first and last name from search
            // the first letter of result's middle name must also match the middle initial from search
            if (item.values().resultName.split(' ')[0] === searchedName.split(' ')[0] && item.values().resultName.split(' ')[2] === searchedName.split(' ')[2] && item.values().resultName.split(' ')[1].charAt(0).indexOf(searchedName.split(' ')[1]) > -1) {
              return true;
            } else {
              return false;
            }
          } else {
            // @TODO: refactor these conditions - too much repeating
            // check if result name has a middle name/initial
            if (item.values().resultName.split(' ').length === 3) {
              // filter only the result's first and last name if it matches the first and last name from search
              if (item.values().resultName.split(' ')[0] === searchedName.split(' ')[0] && item.values().resultName.split(' ')[2] === searchedName.split(' ')[1]) {
                return true;
              } else {
                return false;
              }
            } else {
              // filter only the result's first and last name if it matches the first and last name from search
              if (item.values().resultName.split(' ')[0] === searchedName.split(' ')[0] && item.values().resultName.split(' ')[1] === searchedName.split(' ')[1]) {
                return true;
              } else {
                return false;
              }
            }
          }
        });
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
      determineCollapse();
    });
  } else {
    handleNoResults();
  }
};

// keep all filters hidden by default
$resultsFilters.hide();

export { initSearchFilters };
