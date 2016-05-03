(function() {
    jQuery.fx.interval = 100;

    /* Vars */

    // Search Progression and Time Remaining

    var modalSearchHTML = $("#gen-report-modal5").html();
    var intervalId;
    var defaultRunningTime = 120;
    var countDown = defaultRunningTime; // beginning count time
    var runningTime = 0; // current running time
    var runInterval = 20 * 1000;                 // header interval time (defaultRunningTime / number of Steps (6))
    var completeRun = 120 * 1000;                 // total running time
    var mobileRatio = 0.375;

    if (window.bv.isMobile) {
        defaultRunningTime *= mobileRatio;
        countDown *= mobileRatio;
        runInterval *= mobileRatio;
        completeRun *= mobileRatio;
    }

    window.hasClickedResult = false;
    window.shownExitPopSkip = false;
    var shownExitPop = false;
    var registeredAdjustments = true;
    var hasScrolled = false;
    $(window).on('scroll' , function () {
      hasScrolled = true;
    });

    /* Fns */

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
    }

    /* Search Count Reporting */

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
        trackNL(eventName);
    };

    /* Check for query arguments. If present, do an initial search. */
    var getQueryArgs = function() {
        var query = window.location.search.substring(1); // drop '?' char
        if (!query) {
            return false;
        }
        var args = _
            .chain(query.split('&'))
            .map(function(params) {
                var p = params.split('=');
                var key = p[0];
                var val = window.decodeURIComponent(p[1] || '');
                val = val.replace(/\/+$/, ""); // clean up trailing slash
                return [key, val];
            })
            .object()
            .value();

        if (args.state === 'All') {
            args.state = '';
        }

        return args;
    };

    var timeRemaining = function() {
        if (countDown <= 40) {
            $('#time-approx').hide();
            $('#finishing-up').show();
        } else {
            countDown -= 20;
            $('#time-remaining').html(countDown);
        }
    };

    var resetSearchingState = function() {
        $('#gen-loading-modal').modal('hide');
        $("#gen-loading-modal").html(modalSearchHTML); // Reset li and content loading cycle
        $('#time-approx').show();
        $('#finishing-up').hide();
        runningTime = 0; // reset the current running time.
        countDown = defaultRunningTime;
        $('#searching-progress-bar .progress-bar').css("width", "1%");
    };

    window.resetSearchingState = resetSearchingState;

    var selectNext = function() {
        runningTime += runInterval;

        var currentHeader = $('.modal-body-list li.list-selected'); //selects current tags
        var currentContent = $('.modal-body-copy .card-selected');
        var currentMsg = $(".msg-selected");
        var nextHeader = currentHeader.next('li'); //selects next header li
        var nextContent = currentContent.next('.card-single');
        var nextMsg = $(".msg-selected").next();

        currentHeader.removeClass('list-selected').addClass('list-completed'); //remove selected class

        if (nextHeader.length > 0) {
            currentContent.removeClass('card-selected');
            currentMsg.removeClass('msg-selected');

            nextHeader.addClass('list-selected'); //add selected class
            nextContent.addClass('card-selected');
            nextMsg.addClass('msg-selected');
        }

        timeRemaining();

        if (runningTime >= completeRun) {
            window.clearInterval(intervalId);
        }

    };

    var mainTimer = function() {
        animateTime = completeRun;
        var progressAnimate = $('#searching-progress-bar .progress-bar').animate({
            width: '100%'
        }, {
            duration: animateTime,
            progress: function(animation, progress, remainingMs) {
                var progression = Math.ceil(progress * 100);
                $("#searching-progress-bar-value").html(progression + '%');
            }
        });
        $.when(progressAnimate).done(function() {
            $("#finishing-up").html("Finished");
            window.setTimeout(function() {
                window.showNextModal();
            }, 2000);
        });
    };

    var runSearchProgression = function() {
        mainTimer();
        intervalId = window.setInterval(selectNext, runInterval);
    };

    window.runSearchProgression = runSearchProgression;

    var generateMapLink = function(ctx) {
        var dataPath = $(ctx).data("fr-bound2"),
            data = framerida.dataFromDataPath(dataPath),
            teaser = new TeaserRecord(data),
            addresses = teaser.addresses(),
            address = addresses[0] || "";

      	var geoJSON = $.getJSON("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?country=us&access_token=pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw").done(function(response) {

        var lon = response.features[0].center[0] || -98.583333;
        var lat = response.features[0].center[1] || 39.833333;

      	var mapUrl = "https://api.tiles.mapbox.com/v4/beenverified.lnhdcee8/" + lon + "," + lat + ",14/345x148@2x.jpg?access_token=pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw";

      	$("#map").attr("src", mapUrl);
      });
    };

    var activated = false;

    var activateRows = function() {
        if (activated) return;
        activated = true;
        var $dataPanel = $('#data-panel');
        $dataPanel.on("click", 'tr.results-row', function(e) {
            e.preventDefault();
            window.hasClickedResult = true;
            generateMapLink(this);
            window.startModalFlow(this);
        });
    };

    var renderResults = function(teaserData) {
        if (teaserData) {
            hideSearchingAnimation();
            if (teaserData.recordCount === 0) { //coerce
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

            initSearchFilters();
        });
    };

    /* Validations */

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

    var validateRefineForm = function() {
        $("#refine-modal-form").validate(searchRules);
    };

    var validateExitRefineForm = function() {
        $("#exit-refine-modal-form").validate(searchRules);
    };

    var validateNoResultsForm = function() {
        $("#no-results-form").validate(searchRules);
    };

    // list.js - sort and filter table data
    // docs: http://www.listjs.com/docs/

    var searchResultsList;

    var initSearchFilters = function() {
      // define sort/filter options using the class names of the data elements
      // these classes are linked to the table data in index.html
      var options = {
        valueNames: ['resultName', 'resultAge', 'resultPlace']
      };

      // define new list using table id (results-table) with filter/sort options (table data classes)
      searchResultsList = new List('results-table', options);

      // @TODO: refactor both loops into one function since they are very similar
      // pass methods into the getFilterCounts function and use one loop

      // define variables for ages loop
      var ages = $('#age-filter option'),
          ageGroup = {},
          n;

      // for each age, set count from search results list
      for (n = 1; n < ages.length; n++) {
        ageGroup = {
          name: ages[n].text,
          value: ages[n].value,
          low: ages[n].value.split('-')[0], // get low value by getting the first split
          high: ages[n].value.split('-')[1] // get high value by getting the second split
        };

        // pass each ageGroup name, value, along with the low and high values of the age group into ageFilterCounts()
        ageFilterCounts(ageGroup.name, ageGroup.value, ageGroup.low, ageGroup.high);
      }

      // define variables for states loop
      var states = $('#state-filter option'),
          state = {},
          i;

      // for each state, set count from search results list
      for (i = 1; i < states.length; i++) {
        state = {
          name: states[i].text,
          value: states[i].value
        };

        // pass each state name and value into stateFilterCounts()
        stateFilterCounts(state.name, state.value);
      }

      // set default filter
      searchResultsList.filter();

      // set filter states
      setFilterStates();

      // age-filter action
      $('#age-filter').change(function () {
        var selection = this.value;

        // reset state filter
        $('#state-filter option[value=all]').prop('selected', true);

        // @TODO: refactor this (too many conditions and repeating patterns)
        if (selection === '18-25' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge <= 25);
          });
          updateRecordCount();
        }
        else if (selection === '26-35' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 25 && item.values().resultAge <= 35);
          });
          updateRecordCount();
        }
        else if (selection === '36-45' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 35 && item.values().resultAge <= 45);
          });
          updateRecordCount();
        }
        else if (selection === '46-55' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 45 && item.values().resultAge <= 55);
          });
          updateRecordCount();
        }
        else if (selection === '56-65' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 55 && item.values().resultAge <= 65);
          });
          updateRecordCount();
        }
        else if (selection === '66-75' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 65 && item.values().resultAge <= 75);
          });
          updateRecordCount();
        }
        else if (selection === '76-85' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 75 && item.values().resultAge <= 85);
          });
          updateRecordCount();
        }
        else if (selection === '86-95' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 85 && item.values().resultAge <= 95);
          });
          updateRecordCount();
        }
        else if (selection === '96-200' && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return (item.values().resultAge > 95);
          });
          updateRecordCount();
        } else {
          searchResultsList.filter();
          updateRecordCount();
        }
      });

      // state-filter action
      $('#state-filter').change(function () {
        var selection = this.value;

        // reset age filter
        $('#age-filter option[value=all]').prop('selected', true);

        if (selection && selection !== 'all') {
          searchResultsList.filter(function(item) {
            return item.values().resultPlace.includes(selection);
          });
          updateRecordCount();
        } else {
          searchResultsList.filter();
          updateRecordCount();
        }
      });

      var searchedName = '';
      if (amplify.store('searchData')) {
        var first = amplify.store('searchData').fn + ' ',
            middle = amplify.store('searchData').mi + ' ',
            last = amplify.store('searchData').ln;

        if (amplify.store('searchData').mi !== '') {
          searchedName = first + middle + last;
        } else {
          searchedName = first + last;
        }
      }

      // exact match filter action
      $('.exact-match-checkbox').click(function() {

        if ($(this).is(':checked')) {
          searchResultsList.filter(function(item) {
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
              // filter only the result's first and last name if it matches the first and last name from search
              if (item.values().resultName.split(' ')[0] === searchedName.split(' ')[0] && item.values().resultName.split(' ')[2] === searchedName.split(' ')[1]) {
                return true;
              } else {
                return false;
              }
            }
          });
          updateRecordCount();
        } else {
          searchResultsList.filter();
          updateRecordCount();
        }
      });

      // reset filters
      $('.reset-filters').click(function() {
        // set these values to default
        $('#city').val('');
        $('#search-bar-state').val('All');
        $('#age').val('');

        // @TODO: call search function instead of simulating form submit
        $('#search-form').submit();
      });
    };

    // @TODO: refactor conditions
    var setFilterStates = function() {
      if ($('#age').val() !== '' && $('#search-bar-state').val() === 'All') {
        $('#age-filter').attr('disabled', true);
        $('#state-filter').attr('disabled', false);
      }
      else if ($('#search-bar-state').val() !== 'All' && $('#age').val() === '') {
        $('#state-filter').attr('disabled', true);
        $('#age-filter').attr('disabled', false);
      }
      else if ($('#age').val() !== '' && $('#search-bar-state').val() !== 'All') {
        $('#age-filter').attr('disabled', true);
        $('#state-filter').attr('disabled', true);
        //$('.results-filters').hide();
      }
      else {
        $('#age-filter').attr('disabled', false);
        $('#state-filter').attr('disabled', false);
        //$('.results-filters').show();
      }
    };

    // update the record count - to use when table filters change
    var updateRecordCount = function() {
      $('.record-count').text($('#results .results-row').length);
    };

    // @TODO: refactor both stateFilterCounts and ageFilterCounts functions into one since they're similar

    // filters the searchResultsList using state name and state value
    var stateFilterCounts = function(name, value) {
      // start with default count of 0
      var count = 0;

      // filtering each item in the searchResultsList
      searchResultsList.filter(function(item) {
        // if the place in the item includes the state value
        if (item.values().resultPlace.includes(value)) {
          // increase the count by 1
          count += 1;
          // add the new count into the option label of the appropriate state value
          $('#state-filter option[value=' + value + ']').text(name + ' (' + count + ')');
        }
        // if count is 0 hide this state option (dont need filters that show no results)
        else if (count === 0) {
          $('#state-filter option[value=' + value + ']').hide();
        // else show this state option (need this condition otherwise it will hide all the options)
        } else {
          $('#state-filter option[value=' + value + ']').show();
        }
      });
    };

    var ageFilterCounts = function(name, value, low, high) {
      // start with default count of 0
      var count = 0;

      // filtering each item in the searchResultsList
      searchResultsList.filter(function(item) {
        // if the age in the item is between the low and high age group values
        if (item.values().resultAge >= low && item.values().resultAge <= high) {
          // increase the count by 1
          count += 1;
          // add the new count into the option label of the appropriate age group value
          $('#age-filter option[value=' + value + ']').text(name + ' (' + count + ')');
        }
        // if count is 0 hide this age group option (dont need filters that show no results)
        else if (count === 0) {
          $('#age-filter option[value=' + value + ']').hide();
        // else show this age group option (need this condition otherwise it will hide all the options)
        } else {
          $('#age-filter option[value=' + value + ']').show();
        }

        // @TODO: find out why age group of 96-200 doesnt pass as true sometimes
        // console.log('age of person: ' + item.values().resultAge);
        // console.log('age range value: ' + value);
        // console.log('count of value matching age: ' + count);
      });
    };

    /* Event Handlers */

    $(".bv-search").on('submit', function(evt) {
        evt.preventDefault();
        var formVals = {},
            serialArray = $(this).serializeArray();
        _.forEach(serialArray, function(obj) {
            formVals[obj.name] = obj.value;
        });
        trackNL("Searched");
        getTeaserData(formVals, recordCounts.RESEARCH);
    });

    $('#data-panel').on('click', '.refine-modal-trigger', function(evt) {
        evt.preventDefault();
        validateRefineForm();
        $('#refine-modal').modal('show');
    });

    $("#refine-modal-form").on('submit', function(evt) {
        $('#refine-modal').modal('hide');
    });

    $("#exit-refine-modal-form").on('submit', function(evt) {
        trackNL("Searched - Exit Pop");
        $('#exitPopRefine').modal('hide');
    });

    $("#gen-report-confirm").on('click', function(evt) {
        evt.preventDefault();
        //validateLeadForm();
    });

    // exitPop
    var exitPop = function () {
      if (shownExitPop || window.hasClickedResult || $('#no-results').is(':visible')) {
        return;
      }
      shownExitPop = true;
      trackNL('Viewed Exit Pop Modal');
      validateExitRefineForm();

      if ($('#city').val() !== '') {
        $('.tip3').show();
      }
      if ($('#search-bar-state').val() !== "All") {
        $('.tip4').show();
      }
      if ($('#city').val() === '' && $('#search-bar-state').val() !== "All") {
        $('.tip5').show();
      }
      if ($('#search-bar-state').val() === "All") {
        $('.tip6').show();
      }

      // Add clear button to input field
      $("#exitPopRefine input[name=city]").keyup(function () {
        $(this).next().toggle(Boolean($(this).val()));
      });
      $(".searchclear").toggle(Boolean($("#exitPopRefine input[name=city]").val()));
      $(".searchclear").click(function () {
          $(this).prev().val('').focus();
          $(this).hide();
      });

      // Show the modal.
      $('#exitPopRefine').modal('show');

      // Disable the pop downsell onbeforeunload.
      //window.onbeforeunload = function () {};

      $('#exitPopRefine .modal-dialog').on('click', function (e) {
        trackNL('Exit Pop Modal - Clicked');
      });
    };

    var initDownsells = function () {

      var VWO_CHECK_INTERVAL = 3000,
          CHECK_TIMEOUT = 5000,
          timeElapsed = 1000;

      var activateDownsells = function () {
        if (typeof downsell !== "undefined" && typeof downsell.init === "function") {
          downsell.init({
            onBack: {
              override: true,
              // elem: "#exitPopRefine",
              cb: exitPop
            },
            onBreakingPlane: {
              override: true,
              // elem: "#exitPopRefine",
              cb: exitPop
            }
          });
        }
      };

      var vwoIntervalId,
          vwoExists = typeof _vwo_code !== "undefined" && typeof _vwo_code.finished === 'function';

      if (vwoExists) {
        vwoIntervalId = window.setInterval(function () {
          timeElapsed += VWO_CHECK_INTERVAL;
          if (timeElapsed > CHECK_TIMEOUT || _vwo_code.finished()) {
            window.clearInterval(vwoIntervalId);
            activateDownsells();
          }
        }, VWO_CHECK_INTERVAL);
      } else {
        activateDownsells();
      }
    };

    $('.navbar-toggle').click(function() {
      $('#nav-icon-closed').toggleClass('active');
    });

    /* Init */

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

            if (!teaserData || teaserData.recordCount === 0) { //coerce
                showNoResultsPanel();
            } else {
                activateRows();
            }
        }

        initSearchFilters();
        initDownsells();
    };

    initialize();
}());

// Set current year in footer
(function() {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');

    $currentYear.html(currentYear);

}());

/* Captcha */

(function() {
    var $menuDropdown = $('#menu-dropdown'),
        $linkWrap = $('#link-wrap');

    /* Fns */

    var resetCaptchaStyles = function() {
        $("#bv-captcha-input")
            .removeClass("bv-captcha-error")
            .removeClass("bv-captcha-success");

        $("#bv-captcha-msg")
            .removeClass('success')
            .removeClass('error');
    };

    var checkCaptcha = function(inputText) {
        var $captchaImg = $(".bv-captcha-selected"),
            textValue = $captchaImg.attr('alt');
        //result = inputText.toLowerCase() === textValue.toLowerCase();
        result = inputText.length > 0;

        resetCaptchaStyles();

        if (result) {
            $(this).addClass("bv-captcha-success");
            $("#bv-captcha-msg").html("Great work! Lets continue...");
            $("#bv-captcha-msg").addClass('success');
        } else {
            $(this).addClass("bv-captcha-error");
            $("#bv-captcha-msg").html("Nope, not right yet...");
            $("#bv-captcha-msg").addClass('error');
        }
        return result;
    };

    var selectCaptchaImg = function() {
        var $captchaImgs = $("#bv-captcha-imgs img").removeClass("bv-captcha-selected"),
            captchaImgsLen = $captchaImgs.length,
            selectedIdx = _.random(0, captchaImgsLen - 1),
            $selectedImg = $($captchaImgs[selectedIdx]);

        $("#bv-captcha-imgs img").removeClass("bv-captcha-selected");
        $selectedImg.addClass("bv-captcha-selected");
    };


    var refreshCaptchaState = function() {
        resetCaptchaStyles();
        $("#bv-captcha-input").val("");
        $("#bv-captcha-msg").html("");
        selectCaptchaImg();
    };

    window.refreshCaptchaState = refreshCaptchaState;

    /* Handlers */

    /*$("#bv-captcha-input").on("keyup", function (evt) {
      checkCaptcha.call(this, $(this).val());
    });*/

    $("#bv-catpcha-form").on('submit', function(evt) {
        evt.preventDefault();

        var captchaInput = document.getElementById("bv-captcha-input"),
            validCaptcha;
        if (captchaInput) {
            validCaptcha = checkCaptcha.call(captchaInput, captchaInput.value);
        }
        if (validCaptcha) {
            window.showNextModal();
            window.runSearchProgression();
        }
    });

    $("#captcha-success").on('click', function() {
      window.showNextModal();
      window.runSearchProgression();
    });

    $("#bv-captcha-refresh").on('click', function(evt) {
        evt.preventDefault();
        refreshCaptchaState();
    });

    // New search results stuff
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        windowSmall = 767,
        windowMedium = 992,
        $searchBar = $('#search-bar'),
        $btnSearchDropdown = $('#btn-search-dropdown');

    var showHeader = function() {
        $linkWrap.show();
        $searchBar.show();
    };

    var hideHeader = function() {
        $linkWrap.hide();

        if (!$searchBar.hasClass('no-hide-header')) {
            $searchBar.hide();
        }
    };

    var determineLayoutState = function() {
        if (windowWidth <= windowSmall) {
            hideHeader();
        } else {
            showHeader();
        }
    };

    /* Dropdown menu */
    $menuDropdown.on('click' , function (evt) {
        evt.preventDefault();
        $linkWrap.slideToggle();
    });

    $(window).on('resize' , function () {
        var currentWidth = $(this).width();
        var resizeHappened = false;

        if (currentWidth !== windowWidth) {
            windowWidth = currentWidth;
            resizeHappened = true;
        }

        // Fix for IE8 reporting fake window resizing when the document dimensions change.

        if (!resizeHappened) return;
        determineLayoutState();
    });

    $btnSearchDropdown.on('click', function(evt) {
        evt.preventDefault();
        $searchBar.slideToggle();
    });

    var initialize = function() {
        determineLayoutState();
        selectCaptchaImg();
        $('[data-toggle="tooltip"]').tooltip();
        //determineLayoutState();

    };

    initialize();

}());
