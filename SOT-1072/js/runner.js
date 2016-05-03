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
        var mapUrl = "//maps.googleapis.com/maps/api/staticmap?center=" + address + "&zoom=12&size=304x152&sensor=false";
        mapUrl = encodeURI(mapUrl);
        $("#map").attr("src", mapUrl);
    };

    var getExtraTeaserData = function(ctx) {
        var dataPath = $(ctx).data("fr-bound2"),
            data = framerida.dataFromDataPath(dataPath),
            teaser = new TeaserRecord(data),
            bvid = teaser.bvid;

        var baseUrl = "//www.beenverified.com/hk/dd/teaser/person?exporttype=jsonp",
            url = baseUrl + "&bvid=" + bvid + "&criminal=1&bankruptcy=1",
            xhrData = $.ajax({
                url: url,
                dataType: 'jsonp',
                jsonpCallback: 'parseResults'
            });

        $.when(xhrData).done(function(result) {
            var res = result,
                img = '';

            // Get profile image URL
            if (res.images[0] && typeof(res.images[0].url !== 'undefined')) {
              img = res.images[0].url;
            }

            // Data elements to display - Waterfall controlled here
            var data = [
              { 'type': 'criminal',
                'name': 'Criminal Records',
                'single': 'Criminal Record',
                'style': ' crim-box',
                'weight': 3,
                'showIfEmpty': 0,
                'count': res.courts.criminal.length
              }, {
                'type': 'bankruptcy',
                'name': 'Bankruptcy Filings',
                'single': 'Bankruptcy Filing',
                'style': ' crim-box',
                'weight': 3,
                'showIfEmpty': 0,
                'count': res.courts.bankruptcy.length
              }, {
                'type': 'emails',
                'name': 'Email Addresses',
                'single': 'Email Address',
                'style': '',
                'weight': 2,
                'showIfEmpty': 1,
                'count': res.emails.length
              }, {
                'type': 'phones',
                'name': 'Phone Numbers',
                'single': 'Phone Number',
                'style': ' phone-box',
                'weight': 1,
                'showIfEmpty': 1,
                'count': res.phones.length
              }, {
                'type': 'social',
                'name': 'Social Media Profiles',
                'single': 'Social Media Profile',
                'style': ' social-box',
                'weight': 1,
                'showIfEmpty': 1,
                'count': res.social.length
              }, {
                'type': 'photos',
                'name': 'Photos',
                'single': 'Photo',
                'style': '',
                'weight': 0,
                'showIfEmpty': 0,
                'count': res.images.length
              }, {
                'type': 'associates',
                'name': 'Known Associates',
                'single': 'Known Associate',
                'style': '',
                'weight': 0,
                'showIfEmpty': 1,
                'count': res.connections.associates.length
              }
              /* {
                'type': 'neighbors',
                'name': 'Neighbors',
                'single': 'Neighbor',
                'style': '',
                'weight': 0,
                'showIfEmpty': 1,
                'count': res.connections.neighbors.length
              }, {
                'type': 'contacts',
                'name': 'Contact Info',
                'single': 'Contact Info',
                'style': '',
                'weight': 0,
                'showIfEmpty': 0,
                'count': res.emails.length + res.phones.length
              }, {
                'type': 'addresses',
                'name': 'Address Records',
                'single': 'Address Records',
                'style': '',
                'weight': 0,
                'showIfEmpty': 0,
                'count': res.addresses.length
              }
              */
            ];

            // Booleans for templating & reporting
            var hasCriminal = _.some(data, function(item) {
              return item.type === 'criminal' && item.count > 0;
            });
            var hasBankruptcy = _.some(data, function(item) {
              return item.type === 'bankruptcy' && item.count > 0;
            });
            var hasPhone = _.some(data, function(item){
              return item.type === 'phones' && item.count > 0;
            });
            var hasEmail = _.some(data, function(item){
              return item.type === 'emails' && item.count > 0;
            });
            var hasSocial = _.some(data, function(item){
              return item.type === 'social' && item.count > 0;
            });

            // Report to Heap
            if (hasCriminal) {
              trackNL("Data Modal Viewed Criminal");
            }
            if (hasBankruptcy) {
              trackNL("Data Modal Viewed Bankruptcy");
            }

            data = _.forEach(data, function(item, key) {
              if (item.count === 1) {
                item.name = item.single;
              }
            });

            // Scrub data for display
            _.remove(data, { showIfEmpty: 0, count: 0 });
            data = _.sortByOrder(data, ['weight', 'count'], ['desc', 'desc']);
            data = data.slice(0, 4);
            data3 = data.slice(0, 3);

            // Store data in localStorage
            var teaserDataObj = {
                recordCount: ($.type(res) !== 'array' ? 1 : 0),
                data: data,
                data3: data3,
                photo: img,
                hasCriminal: hasCriminal,
                hasBankruptcy: hasBankruptcy,
                hasPhone: hasPhone,
                hasEmail: hasEmail,
                hasSocial: hasSocial
            };
            amplify.store('extraTeaserData', teaserDataObj);
        });

    };

    var activated = false;

    var activateRows = function() {
        if (activated) return;
        activated = true;
        var $dataPanel = $('#data-panel');
        $dataPanel.on("click", 'tr.results-row', function(e) {
            e.preventDefault();
            generateMapLink(this);
            //getExtraTeaserData(this);
            window.startModalFlow();
        });
    };

    var renderResults = function(teaserData) {
        if (teaserData) {
            hideSearchingAnimation();
            if (teaserData.recordCount == 0) { //coerce
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

    var validateNoResultsForm = function() {
        $("#no-results-form").validate(searchRules);
    };

    var validateLeadForm = function() {
        var $signupModalForm = $("#signup-modal-form");
        window.validator = $signupModalForm.validate({
            "account[first_name]": "required",
            "account[last_name]": "required",
            "user[email]": {
                required: true,
                email: true
            },
            messages: {
                "account[first_name]": "Please enter a first name",
                "account[last_name]": "Please enter a last name",
                "user[email]": "Please enter a valid email address"
            }
        });
    };



    var reportLeadData = function(dataArray) {
        var formVals = {};
        _.forEach(dataArray, function(v, k) {
            formVals[v.name] = v.value;
        });

        var srchData = amplify.store("searchData"),
            firstName = "",
            lastName = "";

        if (srchData) {
            firstName = srchData.fn || "";
            lastName = srchData.ln || "";
        }

        var leadData = {};
        leadData['lead[first_name]'] = formVals['account[first_name]'] || '';
        leadData['lead[last_name]'] = formVals['account[last_name]'] || '';
        leadData['lead[email]'] = formVals['user[email]'] || '';
        leadData['lead[zip]'] = formVals['account[zip]'] || '';
        leadData['lead[state]'] = formVals['account[state]'] || '';
        leadData['record_search[first_name]'] = firstName;
        leadData['record_search[last_name]'] = lastName;

        var leadQueryArr = [];
        _.forEach(leadData, function(v, k) {
            leadQueryArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
        });
        var leadQueryString = leadQueryArr.join('&');
        return $.post('/api/3_0_1/leads.json', leadQueryString);
    };


    $("#signup-modal-form").on('submit', function(evt) {
        evt.preventDefault();
        if (window.validator.form()) {
            if (typeof heap !== "undefined" && heap.track) {
                heap.track("Submitted Lead Form - Success");
            }

            try {
                reportLeadData($(this).serializeArray());
            } catch (err) {}

            window.setTimeout(function() {
                window.location = $("body").data("next-page");
            }, 300);
        }
    });





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

    $("#gen-report-confirm").on('click', function(evt) {
        evt.preventDefault();
        validateLeadForm();
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
            validateLeadForm();
            validateSearchForm();
            validateNoResultsForm();

            hideSearchingAnimation();

            if (!teaserData || teaserData.recordCount == 0) { //coerce
                showNoResultsPanel();
            } else {
                activateRows();
            }
        }
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
