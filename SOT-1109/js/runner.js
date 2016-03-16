  (function ($) {

    $.fx.interval = 100;

    var PROGRESS_DURATION = 60000;
    var hasLS = true;
    var userThrottled = false;
    var excessResults = false;
    var modalClosed = false;

    var trackNL = function(evtName, props) {
      if (typeof nolimit !== 'undefined' && nolimit.track) {
        if (props) {
          nolimit.track(evtName, props);
        } else {
          nolimit.track(evtName);
        }
      }
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
      trackNL("Safari Private Browsing");
      hasLS = false;
    }

    var validQueryData = function (data) {
      if (data && data.toLowerCase() === "all") {
        return "";
      }
      return data || "";
    };

    var searchData = amplify.store('query');
    var $bar = $(".bar");

    var personQuery = function() {
      var query = "";
      if (!hasLS) {
        query = "?" + $.param(searchData);
      }
      return query;
    };

    var goToNextPage = function () {
      window.setTimeout(function () {
        window.location.href = $("body").data("next-page") + personQuery();
      }, 1000);
    };

    $.extend($.easing, {
      easeBV: function(x, t, b, c, d) {
      	var ts=(t/=d)*t;
      	var tc=ts*t;
      	//return b+c*(24.045*tc*ts + -62.59*ts*ts + 56.395*tc + -20.2*ts + 3.35*t);
        //return b+c*(15.545*tc*ts + -32.14*ts*ts + 19.195*tc + -2*ts + 0.4*t);
        //return b+c*(14.545*tc*ts + -33.39*ts*ts + 23.595*tc + -4.4*ts + 0.65*t);
        return b+c*(18.5*tc*ts + -46.6*ts*ts + 38.9*tc + -11.6*ts + 1.8*t);
        //return b+c*(22.645*tc*ts + -59.29*ts*ts + 54.895*tc + -21.3*ts + 4.05*t);
      }
    });

    $('#input-state').on('hide.bs.modal', function () {
      modalClosed = true;
    });

    $('.progress-text-inner').hide();
    var progress = $bar.animate({
        width: "100%"
      }, {
        duration: PROGRESS_DURATION,
        easing: 'easeBV',
        step: function(step) {
          var percent = Math.floor(step);
          $('.progress-text-inner').html(percent.toString() + "%");
          $('.progress-text-outer').html("&nbsp; " + percent.toString() + "%");

          var percentRemain = 100 - percent.toString(),
              durationRemain = PROGRESS_DURATION * percentRemain / 100,
              humanizeDurationRemain = Math.floor((durationRemain / 1000) % 60);

          $('.time-remaining-count').html(humanizeDurationRemain);

          if (percent === 50) {
            $('.progress-text-outer').fadeOut();
            $('.progress-text-inner').fadeIn();
          }
          if (percent === 15 && !_.isUndefined(searchData) && excessResults == true && !validQueryData(searchData.city) && _.isUndefined(searchData.norefine) && !modalClosed) {
            $('#input-state').modal('show');
            trackNL("Show Location Refine Modal");
          }
          if (percent === 98) {
            $('#input-state').modal('hide');
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
    });

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
      $.when(progress).done(function () {
        goToNextPage();
      });
      return;
    }

    $("#refine-modal-form").on('submit', function(evt) {
      evt.preventDefault();
      searchData.city = $(this).find('#city').val();
      searchData.state = $(this).find('#state').val();
      amplify.store("query", searchData);
      $('#input-state').modal('hide' );
    });


    var buildXhrUrl = function() {
      var baseUrl = "//www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100";
      var url = baseUrl + "&fn=" + searchData.fn + "&ln=" + searchData.ln + "&state=" + validQueryData(searchData.state) + "&city=" + validQueryData(searchData.city) + "&age=" + validQueryData(searchData.age);
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

        var status = xhrResult.response.Header.Status;

        if (status === "0") {
          var recordCount = xhrResult.response.RecordCount;
          if (parseInt(recordCount) >= 50) {
            excessResults = true;
          }
          trackNL("Refine Modal Initial Result Count", {result_count: recordCount});
        }
      });
    };


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
        var status = xhrResult.response.Header.Status;

        if (status === "0") {
          teaserRecords = parseTeaser(xhrResult);
          teaserData = teaserRecords;

          var recordCount = xhrResult.response.RecordCount;

          trackNL("Refine Modal Final Result Count", {result_count: recordCount});

          var teaserDataObj = {recordCount: recordCount, teasers: teaserData};
          amplify.store('teaserData', teaserDataObj);

          // var queryData = amplify.store('query') || {};
          //
          // if (queryData && !queryData.state) {
          //   queryData.state = "all";
          // }
          //
          amplify.store('searchData', {
            fn: searchData.fn || '',
            ln: searchData.ln || '',
            state: searchData.state,
            city: searchData.city || '',
            age: searchData.age || ''
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
  }());
