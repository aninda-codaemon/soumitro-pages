import 'imports-loader?this=>window!./js/modernizr.custom';
import store from 'amplify-store';
import _ from 'lodash';
import './js/src/framerida';
import trackNL from './js/src/track';
import cleanQueryData from './js/utils/query-parser';
import downsell from './js/utils/downsell';
import { buildXhrUrl, personQuery, validSearchData } from './js/utils/query';
import { initProgressBar } from './js/src/progress-bar';
import { parseTeaser, TeaserRecord } from './js/src/teaserparser';
import './js/utils/cookie';
import './js/utils/key-map';
import 'bootstrap';
import './css/bootstrap.min.css';
import './css/main.css';

let modalClosed = false;
let modalClosed2 = false;
let hasLS = true;
let excessResults = false;
let userThrottled = false;
let searchData = cleanQueryData(store('query')) || {
  fn: '',
  ln: ''
};
let $headerMessage = $('#header-message');

const setHeaderMessage = msg => $headerMessage.html(msg);

const goToNextPage = () => {
  window.setTimeout(() => (window.location.href = $("body").data("next-page") + personQuery(searchData)), 3000);
};

const getResultCount = (searchData) => {
  var xhrData = $.ajax({
    url: buildXhrUrl(searchData),
    dataType: 'jsonp',
    jsonpCallback: 'parseResults',
    statusCode: {
      503: () => {
        trackNL('Search Throttled');
        userThrottled = true;
      }
    }
  });

  $.when(xhrData).then(function(result){
    var xhrResult = result;
    xhrResult.response = xhrResult.response || {};
    xhrResult.response.Header = xhrResult.response.Header || {};
    var status = xhrResult.response .Header.Status;
    var recordCount = xhrResult.response.RecordCount;

    // add results loaded count into wait modal
    if (recordCount > 10) {
      $('#results-loaded-count').html(recordCount - 10);
    } else {
      if (recordCount == 0) {
        $(".results-loaded-statement").hide();
      } else {
        $('#results-loaded-count').html(recordCount);
      }
    }

    if (status === "0") {
      var recordCount = xhrResult.response.RecordCount;
      if (parseInt(recordCount) >= 50) {
        excessResults = true;
      }

      if (parseInt(recordCount) < 50) {
        excessResults = false;
      }

      trackNL("Refine Modal Initial Result Count", {result_count: recordCount});
    }
  });
};

$.fx.interval = 100;
$.extend($.easing, {
  easeBV: function (x, t, b, c, d) {
    var ts=(t/=d)*t;
    var tc=ts*t;
    return b+c*(18.5*tc*ts + -46.6*ts*ts + 38.9*tc + -11.6*ts + 1.8*t);
  }
});

$('#input-state').on('hide.bs.modal', function () {
  modalClosed = true;
});
$('#fn-modal').on('hide.bs.modal', function () {
  modalClosed2 = true;
});

function onStep(step) {
  var percent = Math.floor(step);
  
  if (percent === 50) {
    $('.progress-text-outer').fadeOut();
    $('.progress-text-inner').fadeIn();
  }
  if (percent === 16 && !_.isUndefined(searchData) && excessResults == true && !validQueryData(searchData.city) && _.isUndefined(searchData.norefine) && !modalClosed) {
    $('#input-state').modal('show');
    trackNL("Show Location Refine Modal");
  }
  if (percent === 14 && !_.isUndefined(searchData) &&
    _.isEmpty(searchData.fn) && !modalClosed2) {
    // Capitalize first letter of last name
    var userLastname = _.capitalize(searchData.ln);

    $('#ln').val(userLastname);
    $('#fn-modal').modal('show');
  }
  if (percent === 15 && !_.isUndefined(searchData) &&
    _.isEmpty(searchData.ln) && !modalClosed2) {
    // Capitalize first letter of First name
    var userFirstname = _.capitalize(searchData.fn);

    $('#fn').val(userFirstname);
    $('#fn-modal').modal('show');
    }

  if (percent === 98) {
    $('#input-state').modal('hide');
    $('#fn-modal').modal('hide');
  }
  if (percent === 42) {
    $('.test1').addClass('hidden-xs hidden-sm');
    $('.test2').removeClass('hidden-xs hidden-sm');
  }
  if (percent === 66) {
    $('.test2').addClass('hidden-xs hidden-sm');
    $('.test3').removeClass('hidden-xs hidden-sm');
  }
}

const progress = initProgressBar(onStep);

if (_.isEmpty(searchData.fn) || _.isEmpty(searchData.ln)) {
  setHeaderMessage(`Searching for people named ${searchData.fn || searchData.ln}`);
}

if (_.isEmpty(searchData) || !validSearchData(searchData)) {
  store('searchData', '');
  store('teaserData', null);
  setHeaderMessage('Searching for your Subject');

  $('.results-loaded-statement').hide();
  $.when(progress).done(function () {
    goToNextPage();
  });
}

$('#refine-modal-form').on('submit', function (evt) {
  evt.preventDefault();
  searchData.city = $(this).find('#city').val();
  searchData.state = $(this).find('#state').val();
  amplify.store("query", searchData);
  $('#input-state').modal('hide');
});

// Event Listner for fn-modal when user submits the fn-modal-form
$('#fn-modal-form').on('submit', function(evt) {
  evt.preventDefault();
  searchData.fn = $('#fn').val().toLowerCase();
  searchData.ln = $('#ln').val().toLowerCase();

  // Determine if the updated name has excessResults
  getResultCount(searchData);

  // If not, then close off the subsequent city refine modal
  if (!excessResults) {
    $('#input-state').modal('hide');
  }

  if (searchData.fn && searchData.ln) {
    amplify.store('query', searchData);
    $('#fn-modal').modal('hide');
  } else {
    $('#fn-error-message').toggleClass('hide', searchData.fn);
    $('#ln-error-message').toggleClass('hide', searchData.ln);
  }
});

setTimeout(function() {
  //added check to disable downsells unless first page in flow
  const locationStep = window.location.pathname.split('/')[3];

  if (locationStep === "1") {
    downsell.init({
      onBack: {
        elem: "#iModal-wait",
        cb: function () {}

      },
      onBreakingPlane: {
        elem: "#iModal-wait",
        cb: function () {}
      }
    });
  }
}, 1000);


getResultCount(searchData);

$.when(progress).done(function () {
  if (userThrottled) {
    goToNextPage();
  }

  window.setTimeout(function() {
    $('#search-main-progress').fadeOut(function(){
      $('#search-continue').show(function() {
        var $btn = $('#search-continue a');
        var href = $btn.attr("href");
        $btn.attr("href", href + "?" + $.param(searchData));
      });
    });
  }, 3000);

  var xhrData = $.ajax({
    url: buildXhrUrl(),
    dataType: 'jsonp',
    jsonpCallback: 'parseResults',
    statusCode: {
      503: function () {
        trackNL("Search Throttled");
        userThrottled = true;
      }
    }
  });

  $.when(xhrData).then(function(result){

    var teaserRecords;
    var teaserData;
    var xhrResult = result;
    xhrResult.response = xhrResult.response || {};
    xhrResult.response.Header = xhrResult.response.Header || {};
    var status = xhrResult.response.Header.Status;

    if (status === "0") {
      teaserRecords = parseTeaser(xhrResult);
      teaserData = teaserRecords;

      var recordCount = xhrResult.response.RecordCount;

      trackNL("Refine Modal Final Result Count", {result_count: recordCount});

      var teaserDataObj = {recordCount: recordCount, teasers: teaserData};
      amplify.store('teaserData', teaserDataObj);

      amplify.store('searchData', {
        fn: searchData.fn || '',
        ln: searchData.ln || '',
        state: searchData.state,
        city: searchData.city || '',
        age: searchData.age || '',
        mi: searchData.mi || ''
      });
      goToNextPage();
    }
  });
});