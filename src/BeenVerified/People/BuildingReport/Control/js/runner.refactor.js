; (function () {
  jQuery.fx.interval = 100;

  var modalSearchHTML = $('#gen-report-modal5').html();
  var intervalId;
  var defaultRunningTime = 120;
  var runningTime = 0; // current running time
  var completeRun = 120 * 1000;                 // total running time
  var mobileRatio = 0.375;
  var trackNL = window.bv.utils.trackNL;

  if (window.bv.isMobile) {
    defaultRunningTime *= mobileRatio;
    completeRun *= mobileRatio;
  }

  // Test for Safari private browsing mode
  try { localStorage.test = 2; } catch (e) {
    trackNL('Safari Private Browsing');
  }
  
  var recordCounts = {
    LANDING: 'RecordCount UponLanding',
    RESEARCH: 'RecordCount Re-Searching',
    QUERY: 'RecordCount QueryArgs'
  };

  var getTeaserData = function (data, initiator) {
    var xhrData = window.bv.utils.getTeaserData(data);
    $.when(xhrData).done(function (result) {
      var teaserRecords;
      var xhrResult = result;

      teaserRecords = parseTeaser(xhrResult);

      var teaserDataObj = {
        recordCount: xhrResult.response.RecordCount,
        teasers: teaserRecords
      };

      if (!amplify.store('currentRecord')) {	// An user using Safari Incognito.
        var currentRecord = _.find((teaserRecords || []), { bvid: data.bvid });
        var parsedRecord = new TeaserRecord(currentRecord);
        /**
         * Workaround for framerida binding issued, because isn't display the fields (fullName & firstName)
         * Probably because those attributes are functions. 
         */
        currentRecord.fullName = parsedRecord.fullName();
        currentRecord.firstName = parsedRecord.firstName();
        amplify.store('currentRecord', currentRecord);
      }

      amplify.store('teaserData', teaserDataObj);
      window.bv.utils.notifyRecordCount(initiator);
    });
  };

  function initializeTestimonials() {
    //-- Testimonials Switch Anim--//
    var testSwitchNum = 0;
    var numTestimonals = 10;
    var TESTIMONIAL_DURATION = 17000;

    function testimonialsSwitcher() {
      var $item = $('.test-act:first');
      var $nextItem = $('.test-act.hidden:first');
      $item.remove();
      $nextItem.fadeIn('fast').removeClass('hidden');

      if (++testSwitchNum < numTestimonals) {
        setTimeout(testimonialsSwitcher, TESTIMONIAL_DURATION);
      }
    };

    setTimeout(testimonialsSwitcher, TESTIMONIAL_DURATION);
  }

  function initializeQueryArgs() {
    var queryArgs = window.bv.utils.getQueryArgs() || {};
    var validQueryArgs = queryArgs.fn && queryArgs.ln;

    queryArgs.state = queryArgs.state || 'all';

    window.getExtraTeaserData(queryArgs);

    if (validQueryArgs) {
      amplify.store('searchData', queryArgs);
      getTeaserData(queryArgs, recordCounts.QUERY);
    } else {
      window.bv.utils.notifyRecordCount(recordCounts.LANDING);
    }
  }

  function initialize() {
    initializeTestimonials();
    initializeQueryArgs();
  };

  initialize();
}());
