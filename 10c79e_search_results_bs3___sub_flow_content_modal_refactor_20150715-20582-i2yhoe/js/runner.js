(function() {

  var reportHeap = function(evtName, props) {
    if (typeof heap !== 'undefined' && heap.track) {
      if (props) {
        heap.track(evtName, props);
      } else {
        heap.track(evtName);
      }
    }
  };
  
  // Test for Safari private browsing mode
  try { localStorage.test = 2; } catch (e) {
    reportHeap("Safari Private Browsing");
  }

  var recordCounts = {
    LANDING: "RecordCount UponLanding",
    RESEARCH: "RecordCount Re-Searching",
    QUERY: "RecordCount QueryArgs"
  };

  var getRecordCountBucket = function(count) {
    count = parseInt(count, 10);

    if (count === 0) return "0";
    else if (count === 1) return "1";
    else if (count === 100) return "100";
    else if (count >= 1 && count <= 20) return "2-20";
    else if (count >= 21 && count <= 50) return "21-50";
    else if (count >= 51 && count <= 75) return "51-75";
    else if (count >= 76 && count <= 99) return "76-99";
    else return "No Data";
  };

  var notifyRecordCount = function(eventType) {
    var teaserData = amplify.store("teaserData"),
        count = teaserData && teaserData.recordCount || "No Count";

    bucket = getRecordCountBucket(count);
    eventName = eventType + ": " + bucket;
    reportHeap(eventName);
  };

  var getQueryArgs = function() {
    var query = window.location.search.substring(1);
    
    if (!query) {
      return false;
    }
    
    var args = _
        .chain(query.split('&'))
        .map(function(params) {
          var p = params.split('=');
          var key = p[0];
          var val = window.decodeURIComponent(p[1] || '');
          val = val.replace(/\/+$/, "");
          
          return [key, val];
        })
        .object()
        .value();

    if (args.state === 'All') {
      args.state = '';
    }

    return args;
  };

  var generateMapLink = function(ctx) {
    var dataPath = $(ctx).data("fr-bound2"),
        data = framerida.dataFromDataPath(dataPath),
        teaser = new TeaserRecord(data),
        addresses = teaser.addresses(),
        address = addresses[0] || "";

    var mapUrl = "//maps.googleapis.com/maps/api/staticmap?center=" + address + "&zoom=12&size=304x152&sensor=false";

    mapUrl = encodeURI(mapUrl);
    $("#map").attr("src", mapUrl);
  };

  var activated = false;

  var activateRows = function() {
    if (activated) return;

    activated = true;

    var $dataPanel = $('#data-panel');

    $dataPanel.on("click", 'tr.results-row', function(e) {
      if (e.preventDefault) e.preventDefault(); else e.returnValue = false;

      generateMapLink(this);

      var trigger = $(this),
          currentSFC = $(trigger).closest('.SFC'),
          nextSFC = trigger.data('goto');

      window.sfcEngine.go.change(currentSFC, nextSFC);
    });
  };

  var renderResults = function(teaserData) {
    if (teaserData) {
      hideSearchingAnimation();
      if (teaserData.recordCount == 0) { 
        showNoResultsPanel();
      } else {
        showResultsPanel();
      }
    }

    activateRows();
  };

  var validState = function(state) {
    if (state && state.toLowerCase() === "all") {
      return "";
    }
    return state;
  };

  var showNoResultsPanel = function() {
    $("#no-results").fadeIn();
    $("#data-panel").hide();
  };

  var showResultsPanel = function() {
    $('#top-banner').show();
    $("#data-panel").fadeIn();
    $("#no-results").hide();
  };

  var hideSearchingAnimation = function() {
    $("#results-wrapper-searching").hide();
  };

  var showSearchingAnimation = function() {
    $('#no-results').hide();
    $("#data-panel").hide();
    $("#results-wrapper-searching").fadeIn();
  };

  var getTeaserData = function(data, initiator) {

    showSearchingAnimation();

    var baseUrl = "//www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100",
    url = baseUrl + "&fn=" + data.fn + "&ln=" + data.ln + "&state=" + validState(data.state) + "&city=" + data.city + "&age=" + data.age + "&mi=" + data.mi,
    xhrData = $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'parseResults'
    });

    $.when(xhrData).done(function(result) {
      var teaserRecords,
      xhrResult = result;

      teaserRecords = parseTeaser(xhrResult);

      var teaserDataObj = {
        recordCount: xhrResult.response.RecordCount,
        teasers: teaserRecords
      };

      amplify.store('teaserData', teaserDataObj);
      renderResults(teaserDataObj);
      notifyRecordCount(initiator);
    });
  };

  var searchRules = {
    rules: {
      fn: "required",
      ln: "required"
    },
    messages: {
      fn: "Please enter a first name",
      ln: "Please enter a last name"
    },
    onkeyup: false,
    onclick: false,
    focusInvalid: false
  };

  var validateLoginForm = function() {
    $("#login-form").validate({
      'email': 'required',
      'password': 'required'
    });
  };

  var validateSearchForm = function() {
    $('#search-form').validate(searchRules);
  };

  var validateRefineForm = function () {
    $("#refine-modal-form").validate(searchRules);
  };

  var validateNoResultsForm = function() {
    $("#no-results-form").validate(searchRules);
  };

  $(".bv-search").on('submit', function(e) {
    if (e.preventDefault) e.preventDefault(); else e.returnValue = false;

    var formVals = {},

    serialArray = $(this).serializeArray();

    _.forEach(serialArray, function(obj) {
      formVals[obj.name] = obj.value;
    });

    reportHeap("Searched");

    getTeaserData(formVals, recordCounts.RESEARCH);
  });

  $("#search_bar").on('click', "#refine-search-trigger", function (evt) {
    evt.preventDefault();
    $('.search-filter').slideToggle();
  });

  $('#data-panel').on('click', '.refine-modal-trigger', function (evt) {
    evt.preventDefault();
    validateRefineForm();
    $('#refine-modal').modal('show');
  });

  $("#refine-modal-form").on('submit', function (evt) {
    $('#refine-modal').modal('hide');
  });


  var initialize = function() {
    var queryArgs = getQueryArgs(),
        validQueryArgs = false;

    if (queryArgs) {
      validQueryArgs = queryArgs.fn && queryArgs.ln;
      if (!queryArgs.state) {
        queryArgs.state = "all";
      }
    }

    if (validQueryArgs) {
      amplify.store('searchData', queryArgs);
      getTeaserData(queryArgs, recordCounts.QUERY);
    } else {
      notifyRecordCount(recordCounts.LANDING);
      var teaserData = amplify.store('teaserData');

      validateLoginForm();
      validateSearchForm();
      validateNoResultsForm();

      hideSearchingAnimation();

      if (!teaserData || teaserData.recordCount == 0) {
        showNoResultsPanel();
      } else {
        activateRows();
      }
    }
  };

  initialize();
}());

(function() {
  var currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      $currentYear = $('.current-year');

  $currentYear.html(currentYear);
}());

(function() {
  var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      windowSmall = 767,
      $searchBar = $('#search-bar'),
      $btnSearchDropdown = $('#btn-search-dropdown');

  var showHeader = function() {
    $searchBar.show();
  };

  var hideHeader = function() {
    if (!$searchBar.hasClass('no-hide-header')) {
      $searchBar.hide();
    };
  };

  var determineLayoutState = function() {
    if (windowWidth <= windowSmall) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  $btnSearchDropdown.on('click', function(e) {
    if (e.preventDefault) e.preventDefault(); else e.returnValue = false;

    $searchBar.slideToggle();
  });
}());