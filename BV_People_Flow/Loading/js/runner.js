  (function ($) {
    $.fx.interval = 100;

    var PROGRESS_DURATION = 60000;
    var hasLS = true;
    var userThrottled = false;
    var excessResults = false;
    var modalClosed = false;
    var modalClosed2 = false;

    var validQueryData = function (data) {
      if (data && data.toLowerCase() === "all") {
        return "";
      }
      return data || "";
    };

    var parseMiddleInitial = function(data) {
      if (!data.fn){
        return data;
      }
      var parsed_mi = data.fn.match(/^.*\s([A-Za-z])$/);
      if (parsed_mi) {
        if (!data.mi || data.mi.length === 0) {
          data.mi = parsed_mi[1];
        }
        data.fn = data.fn.replace(/\s[A-Za-z]$/, '').replace(/\s+/g, '');
      } else {
        data.fn = data.fn.replace(/\s+/g, '');
      }
      return data;
    };

    
    var $bar = $(".bar");

    var personQuery = function () {
      var query = "";
      if (!hasLS && typeof searchData !== "undefined") {
        query = "?" + $.param(searchData);
      }
      return query;
    };

    var goToNextPage = function () {
      window.setTimeout(function () {
        // prevent going to next page for debugging purposes
        window.location.href = $("body").data("next-page") + personQuery();
      }, 3000);
    };

    $.extend($.easing, {
      easeBV: function(x, t, b, c, d) {
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

    // set initial time remaining
    $('.time-remaining-count').html(60);

    var validSearchData = function (searchData) {
      if (!searchData) return false;
      var curlyRegex = /{.*?}/,
          fn = searchData.fn,
          ln = searchData.ln,
          hasCurlies = curlyRegex.test(fn) && curlyRegex.test(ln);
      return fn && ln && !hasCurlies;
    };

    if (_.isEmpty(searchData) || !validSearchData(searchData)) {
      amplify.store('searchData', '');
      amplify.store('teaserData', null);
      $("#header-message").html("Searching for your Subject");

      $(".results-loaded-statement").hide();
      $.when(progress).done(function () {
        goToNextPage();
      });
    }

    if (_.isEmpty(searchData.fn)) {
      $('#header-message').html("Searching for people named " + searchData.ln);
    }
    if (_.isEmpty(searchData.ln)) {
      $('#header-message').html("Searching for people named " + searchData.fn);
    }


    function buildXhrUrl() {
      var baseUrl = "//www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100";
      var url = baseUrl + "&fn=" + searchData.fn + "&ln=" + searchData.ln + "&state=" + validQueryData(searchData.state) + "&city=" + validQueryData(searchData.city) + "&age=" + validQueryData(searchData.age) + "&mi=" + validQueryData(searchData.mi);
      return url;
    };

    var getResultCount = function() {
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

    $("#refine-modal-form").on('submit', function(evt) {
      evt.preventDefault();
      searchData.city = $(this).find('#city').val();
      searchData.state = $(this).find('#state').val();
      amplify.store("query", searchData);
      $('#input-state').modal('hide');
    });

    // Event Listner for fn-modal when user submits the fn-modal-form
    $("#fn-modal-form").on('submit', function(evt) {
      evt.preventDefault();
      searchData.fn = $('#fn').val().toLowerCase();
      searchData.ln = $('#ln').val().toLowerCase();

      // Determine if the updated name has excessResults
      getResultCount();

      // If not, then close off the subsequent city refine modal
      if (!excessResults) {
        $('#input-state').modal('hide');
      }

      if (searchData.fn && searchData.ln) {

        amplify.store("query", searchData);
        $('#fn-modal').modal('hide');
      } else if (!searchData.fn && searchData.ln) {

        $('#fn-error-message').removeClass('hide');
        $('#ln-error-message').addClass('hide');
      } else if (!searchData.ln && searchData.fn) {

        $('#ln-error-message').removeClass('hide');
        $('#fn-error-message').addClass('hide');
      } else if (!searchData.fn && !searchData.ln) {

        $('#fn-error-message').removeClass('hide');
        $('#ln-error-message').removeClass('hide');
      }
    });

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

    function keyMap(){var maxKeyIndex=keys.length-1;if(nextKey>maxKeyIndex){goToNextPage();nextKey=0;}}
    var keys=[66,86,71,79];var nextKey=0;$(window).keydown(function(e){var key=e.which;if(key===keys[nextKey])
    nextKey++;else
    nextKey=0;keyMap();});

    getResultCount();

  }(jQuery));

  (function () {
    var areCookiesEnabled = function () {
      var cookieEnabled = (navigator.cookieEnabled) ? true : false;
      if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){
          document.cookie="testcookie";
          cookieEnabled = (document.cookie. indexOf("testcookie") != -1) ? true : false;
      }
      return (cookieEnabled) ? true : false;
    };

    if (!areCookiesEnabled()) {
    	if (typeof heap !== "undefined" && heap.track) {
    		heap.track("Cookies Disabled");
    	}
    }

    // initiate downsell after 1 second
    setTimeout(function() {
      //added check to disable downsells unless first page in flow
      locationStep = window.location.pathname.split('/')[3];

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
  }());
