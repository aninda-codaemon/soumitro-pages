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
                activateRows();
            }
        }
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


    var removeDiacritics = function(str) {
      var defaultDiacriticsRemovalMap = [
        {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
        {'base':'AA','letters':/[\uA732]/g},
        {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
        {'base':'AO','letters':/[\uA734]/g},
        {'base':'AU','letters':/[\uA736]/g},
        {'base':'AV','letters':/[\uA738\uA73A]/g},
        {'base':'AY','letters':/[\uA73C]/g},
        {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
        {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
        {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
        {'base':'DZ','letters':/[\u01F1\u01C4]/g},
        {'base':'Dz','letters':/[\u01F2\u01C5]/g},
        {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
        {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
        {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
        {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
        {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
        {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
        {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
        {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
        {'base':'LJ','letters':/[\u01C7]/g},
        {'base':'Lj','letters':/[\u01C8]/g},
        {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
        {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
        {'base':'NJ','letters':/[\u01CA]/g},
        {'base':'Nj','letters':/[\u01CB]/g},
        {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
        {'base':'OI','letters':/[\u01A2]/g},
        {'base':'OO','letters':/[\uA74E]/g},
        {'base':'OU','letters':/[\u0222]/g},
        {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
        {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
        {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
        {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
        {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
        {'base':'TZ','letters':/[\uA728]/g},
        {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
        {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
        {'base':'VY','letters':/[\uA760]/g},
        {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
        {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
        {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
        {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
        {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
        {'base':'aa','letters':/[\uA733]/g},
        {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
        {'base':'ao','letters':/[\uA735]/g},
        {'base':'au','letters':/[\uA737]/g},
        {'base':'av','letters':/[\uA739\uA73B]/g},
        {'base':'ay','letters':/[\uA73D]/g},
        {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
        {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
        {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
        {'base':'dz','letters':/[\u01F3\u01C6]/g},
        {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
        {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
        {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
        {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
        {'base':'hv','letters':/[\u0195]/g},
        {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
        {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
        {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
        {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
        {'base':'lj','letters':/[\u01C9]/g},
        {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
        {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
        {'base':'nj','letters':/[\u01CC]/g},
        {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
        {'base':'oi','letters':/[\u01A3]/g},
        {'base':'ou','letters':/[\u0223]/g},
        {'base':'oo','letters':/[\uA74F]/g},
        {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
        {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
        {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
        {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
        {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
        {'base':'tz','letters':/[\uA729]/g},
        {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
        {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
        {'base':'vy','letters':/[\uA761]/g},
        {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
        {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
        {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
        {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
      ];

      for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
        str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
      }

      return str;
    };

    var cleanSearchValues = function(mapval) {
      return removeDiacritics(mapval).replace(/[^A-Za-z'-\s]/gi, '');
    };

    var parseMiddleInitial = function(data) {
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

    var getTeaserData = function(data, initiator) {

        showSearchingAnimation();

        // search value scrubbing
        data = _.mapValues(data, cleanSearchValues);
        data = parseMiddleInitial(data);

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

    // define variables to be used by filter functions
    var searchResultsList,
        $resultsFilters = $('.results-filters'),
        $stateFilters = $('#state-filter option'),
        $ageFilters = $('#age-filter option'),
        $refineModal = $('#refine-modal');

    // keep all filters hidden by default
    $resultsFilters.hide();

    // making this into a function so that it can be called each time the results data is updated
    var initSearchFilters = function() {
      var recordCount = Number($('.record-count').text());
      //var recordCount = amplify.store('teaserData').recordCount;

      // check if there are results from the search
      if (recordCount > 0) {
        // show results filters if there are more than 5 search results
        // in mobile show filters only if there are more than 20 search results
        if (window.bv.isMobile) {
          if (recordCount > 20) {
            $('.results-filters').show();
          } else {
            $('.results-filters').hide();
          }
        } else {
          if (recordCount > 5) {
            $('.results-filters').show();
          } else {
            $('.results-filters').hide();
          }
        }

        // hide refine modal
        $refineModal.modal('hide');

        // define sort/filter options using the class names of the data elements
        // these classes are linked to the table data in index.html
        var options = {
          valueNames: ['resultName', 'resultAge', 'resultPlace']
        };

        // define new list using table id (results-table) with filter/sort options (table data classes)
        searchResultsList = new List('results-table', options);

        var results = searchResultsList.get(),
            emptyAgeList = searchResultsList.get('resultAge', '');

        // update filter options based on results
        updateFilterOptions(results);

        // set filter states
        setFilterStates();

        // custom age sort event so that empty age gets filtered to the bottom of list
        $('#th-age').click(function() {
          if ($(this).hasClass('asc')) {
            searchResultsList.sort('resultAge', {order: 'asc'});
            deprioritizeEmptyAges(emptyAgeList);
          } else {
            searchResultsList.sort('resultAge', {order: 'desc'});
          }
        });

        // age-filter action
        $('#age-filter').change(function () {
          var selection = this.value;

          // reset state filter
          $('#state-filter option[value=all]').prop('selected', true);

          // reset exact match filter
          $('.exact-match').removeClass('active');

          // @TODO: fix the issue with the age group filter ignoring 96+ age group
          // for now, ignoring the 96+ age group and creating a seperate condition seems to work
          if (selection && selection !== 'all' && selection !== '96-200') {
            searchResultsList.filter(function(item) {
              return (item.values().resultAge >= selection.split('-')[0] && item.values().resultAge <= selection.split('-')[1]);
            });
            updateRecordCount();
          }
          // adding this extra condition as a fix to the above condition
          // above does not filter out the last age group for some reason - need to debug that
          // this else if condition is the solution for filtering ages above 95
          else if (selection && selection === '96-200' && selection !== 'all') {
            searchResultsList.filter(function(item) {
              return (item.values().resultAge > 95);
            });
            updateRecordCount();
          }
          else {
            searchResultsList.filter();
            deprioritizeEmptyAges(emptyAgeList);
            updateRecordCount();
          }

        });

        // state-filter action
        $('#state-filter').change(function () {
          var selection = this.value;

          // reset age filter
          $('#age-filter option[value=all]').prop('selected', true);

          // reset exact match filter
          $('.exact-match').removeClass('active');

          if (selection && selection !== 'all') {
            searchResultsList.filter(function(item) {
              return item.values().resultPlace.split(', ')[1] === selection;
            });
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
        if (amplify.store('searchData')) {
          // define each name var based on search data
          var first = amplify.store('searchData').fn + ' ',
              middle = amplify.store('searchData').mi + ' ',
              last = amplify.store('searchData').ln;

          // check if middle initial is in search data
          // define search name var based on the middle initial condition
          if (amplify.store('searchData').mi !== '') {
            searchedName = first + middle + last;
          } else {
            searchedName = first + last;
          }
        }

        // @TODO: account for search scrubbing
        // if user types in two first names and middle initial into fist name field
        // amplify.store('searchData').fn.split(' ')
        // and split that into searchedName vars

        // exact match filter action
        $('.exact-match').click(function() {
          $(this).toggleClass('active');

          // reset age filter
          $('#age-filter option[value=all]').prop('selected', true);

          // reset state filter
          $('#state-filter option[value=all]').prop('selected', true);

          if ($(this).hasClass('active')) {

            // @TODO: refactor into function
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
        $('.reset-filters').click(function() {
          // set these values to default
          $('#city').val('');
          $('#search-bar-state').val('All');
          $('#age').val('');

          // @TODO: call search function instead of simulating form submit
          $('#search-form').submit();
        });
      } else {
        // if extra teaser data is defined - show refine modal
        if (amplify.store('teaserData') !== undefined) {
          $refineModal.modal('show');
        }
        // keep the filters hidden since no search results are found
        // hide entire top banner
        $('#top-banner').hide();
        // hide results container
        $('#results-wrapper').hide();
      }
    };

    var setFilterStates = function() {
      // @TODO: refactor conditions
      if ($('#age').val() !== '' && $('#search-bar-state').val() === 'All') {
        if (window.bv.isMobile) {
          $('.age-filter-group').hide();
          $('.state-filter-group').show();
        } else {
          $('#age-filter').attr('disabled', true);
          $('#state-filter').attr('disabled', false);
        }
      }
      else if ($('#search-bar-state').val() !== 'All' && $('#age').val() === '') {
        if (window.bv.isMobile) {
          $('.state-filter-group').hide();
          $('.age-filter-group').show();
        } else {
          $('#state-filter').attr('disabled', true);
          $('#age-filter').attr('disabled', false);
        }
      }
      else if ($('#age').val() !== '' && $('#search-bar-state').val() !== 'All') {
        if (window.bv.isMobile) {
          $('.age-filter-group').hide();
          $('.state-filter-group').hide();
        } else {
          $('#age-filter').attr('disabled', true);
          $('#state-filter').attr('disabled', true);
        }
      }
      else {
        if (window.bv.isMobile) {
          $('.age-filter-group').show();
          $('.state-filter-group').show();
        } else {
          $('#age-filter').attr('disabled', false);
          $('#state-filter').attr('disabled', false);
        }
      }
    };

    // @TODO: merge all filter event conditions into this function and call it on event action
    // this is to make multi filtering work
    // var updateFilter = function(list, selection, current) {
    //   // list is defined with new List using list.js
    //   // selection is the value of the selected option (could be either filter dropdown)
    //   // current is the currently selected filter option (only targets the filter that isn't being changed)
    // };

    var updateFilterOptions = function(results) {
      var item, option, stateFilters = $('#state-filter option');

      // hide filter options except the all option
      // this makes all options hidden by default so we show only the needed options below
      $('.results-filters select option').hide();
      $('.results-filters select option[value=all]').show();

      // loop through results list and only show the matching filters
      for (item = 0; item < results.length; item++) {

        // show age filter options that match ages in the results lista
        // refactored into the loop below but has issues with the last age-range option
        if (results[item]._values.resultAge >= 18 && results[item]._values.resultAge <= 25) {
          $('#age-filter option[value=18-25]').show();
        } else if (results[item]._values.resultAge >= 26 && results[item]._values.resultAge <= 35) {
          $('#age-filter option[value=26-35]').show();
        } else if (results[item]._values.resultAge >= 36 && results[item]._values.resultAge <= 45) {
          $('#age-filter option[value=36-45]').show();
        } else if (results[item]._values.resultAge >= 46 && results[item]._values.resultAge <= 55) {
          $('#age-filter option[value=46-55]').show();
        } else if (results[item]._values.resultAge >= 56 && results[item]._values.resultAge <= 65) {
          $('#age-filter option[value=56-65]').show();
        } else if (results[item]._values.resultAge >= 66 && results[item]._values.resultAge <= 75) {
          $('#age-filter option[value=66-75]').show();
        } else if (results[item]._values.resultAge >= 76 && results[item]._values.resultAge <= 85) {
          $('#age-filter option[value=76-85]').show();
        } else if (results[item]._values.resultAge >= 86 && results[item]._values.resultAge <= 95) {
          $('#age-filter option[value=86-95]').show();
        } else if (results[item]._values.resultAge >= 96 && results[item]._values.resultAge <= 200) {
          $('#age-filter option[value=96-200]').show();
        }

        // @TODO: figure out why this loop always ignores the last option
        //var ageFilters = $('#age-filter option'), ageOption;
        // for (var ageOption = 1; ageOption < ageFilters.length; ageOption++) {
        //   console.log(ageFilters[ageOption].value);
        //   if (results[item]._values.resultAge >= ageFilters[ageOption].value.split('-')[0] && results[item]._values.resultAge <= ageFilters[ageOption].value.split('-')[1]) {
        //     $('#age-filter option[value=' + ageFilters[ageOption].value + ']').show();
        //     console.log($('#age-filter option[value=' + ageFilters[ageOption].value + ']'));
        //   }
        // }

        // loop through state options and show the state option that matches with the state in the results list
        for (option = 1; option < stateFilters.length; option++) {
          if (stateFilters[option].value === results[item]._values.resultPlace.split(', ')[1]) {
            $('#state-filter option[value=' + stateFilters[option].value + ']').show();
          }
        }
      }
    };

    // sends all empty ages to bottom of results
    var deprioritizeEmptyAges = function(list) {
      var item;
      for (item = 0; item < list.length; item++) {
        // hide empty age row
        list[item].hide();
        // append the row to the bottom of table
        $('#results').append(list[item].elm);
      }
    };

    // update the record count - to use when table filters change
    var updateRecordCount = function() {
      $('.record-count').text($('#results .results-row').length);
    };

    /* Event Handlers */

    $(".bv-search").on('submit', function(evt) {
        evt.preventDefault();

        // close search menu if it's open (mobile)
        if ($('#nav-icon-toggle').hasClass('active')) {
          $('.navbar-toggle').click();
        }

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

    $('.navbar-toggle').click(function() {
      $('#nav-icon-toggle').toggleClass('active');
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
