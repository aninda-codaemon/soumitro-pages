(function ($, undefined) {

  window.bv = window.bv || {};

  $.fx.interval = 100;

  var checkMobile = function() {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  window.bv.isMobile = checkMobile();
  window.bv.mobileTimeRatio = window.bv.mobileTimeRatio || 0.5;


  // Helpers for reporting events

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

  var modalCtx;

  var getExtraTeaserData = function(ctx) {
    var dataPath = $(ctx).data("fr-bound2");
    var data = framerida.dataFromDataPath(dataPath);
    var teaser = new TeaserRecord(data);
    var bvid = teaser.bvid;

    var baseUrl = "//www.beenverified.com/hk/dd/teaser/person?exporttype=jsonp";
    var url = baseUrl + "&bvid=" + bvid + "&criminal=1&bankruptcy=1";
    var xhrData = $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'parseResults'
    });

    $.when(xhrData).done(function(result) {
      trackNL("Person Data Teaser Called");

      var res = result;
      var img = '';

      // Get profile image URL
      if (res.images[0] && typeof(res.images[0].url !== 'undefined')) {
        img = res.images[0].url;
      }

      var phoneNumbers = $.map(res.phones, function(item){
        return item.number.formatPhone();
      });
      var emailAddresses = $.map(res.emails, function(item){
        return item.email_address.formatEmail().toLowerCase();
      });
      var socialNetworks = $.map(res.social, function(item){
        return item.type.nameize();
      });


      // Data elements to display - Waterfall controlled here
      var data = [
        {
          'type': 'criminal',
          'name': 'Criminal or Traffic*',
          'single': 'Criminal or Traffic*',
          'style': ' crim-box',
          'weight': 3,
          'showIfEmpty': 0,
          'count': res.courts.criminal.length
        },
        {
          'type': 'bankruptcy',
          'name': 'Bankruptcy Filings',
          'single': 'Bankruptcy Filing',
          'style': ' crim-box',
          'weight': 3,
          'showIfEmpty': 0,
          'count': res.courts.bankruptcy.length
        },
        {
          'type': 'emails',
          'name': 'Email Addresses',
          'single': 'Email Address',
          'style': '',
          'weight': 2,
          'showIfEmpty': 0,
          'count': res.emails.length,
          'emailAddress': emailAddresses
        },
        {
          'type': 'phones',
          'name': 'Phone Numbers',
          'single': 'Phone Number',
          'style': ' phone-box',
          'weight': 1,
          'showIfEmpty': 0,
          'count': res.phones.length,
          'phoneNumber': phoneNumbers
        },
        {
          'type': 'social',
          'name': 'Social Media Profiles',
          'single': 'Social Media Profile',
          'style': ' social-box',
          'weight': 1,
          'showIfEmpty': 0,
          'count': res.social.length,
          'socialNetwork': socialNetworks
        },
        // {
        //   'type': 'photos',
        //   'name': 'Photos',
        //   'single': 'Photo',
        //   'style': '',
        //   'weight': 0,
        //   'showIfEmpty': 0,
        //   'count': res.images.length
        // },
        {
          'type': 'associates',
          'name': 'Associates & Relatives',
          'single': 'Associates & Relatives',
          'style': '',
          'weight': 0,
          'showIfEmpty': 0,
          'count': res.connections.associates.length + res.connections.relatives.length
        }
        /*
        {
          'type': 'neighbors',
          'name': 'Neighbors',
          'single': 'Neighbor',
          'style': '',
          'weight': 0,
          'showIfEmpty': 1,
          'count': res.connections.neighbors.length
        },
        {
          'type': 'contacts',
          'name': 'Contact Info',
          'single': 'Contact Info',
          'style': '',
          'weight': 0,
          'showIfEmpty': 0,
          'count': res.emails.length + res.phones.length
        },
        {
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
      var hasProperty = _.some(data, function(item){
        return (item.type === 'addresses' && item.count > 0) || (item.type === 'neighbors' && item.count > 0);
      });


      if (!hasCriminal) {
        $("#crim-disc").hide();
        $("#no-crim").show();
      } else {
        $("#crim-disc").show();
        $("#no-crim").hide();
      }
      // Reporting
      if (hasCriminal) {
        trackNL("Data Modal Viewed Criminal");
      }
      if (hasBankruptcy) {
        trackNL("Data Modal Viewed Bankruptcy");
      }
      if (hasPhone) {
        trackNL("Data Modal Viewed Phone");
      }
      if (hasEmail) {
        trackNL("Data Modal Viewed Email");
      }
      if (hasSocial) {
        trackNL("Data Modal Viewed Social");
      }
      // if (hasProperty) {
      //   trackNL("Data Modal Viewed Property");
      // }

      // Force singular name here rather than in template... meh
      data = _.forEach(data, function(item, key) {
        if (item.count === 1) {
          item.name = item.single;
        }
      });

      // Scrub data for display
      _.remove(data, function(item) {
        return item.showIfEmpty === 0 && item.count === 0;
      });
      data = _.sortByOrder(data, ['weight', 'count'], ['desc', 'desc']);

      var totalCardsToShow = parseInt($('div.details').data('total-cards-to-show'));
      var fillerCardsAvailable = parseInt($('div.details').data('filler-cards-available'));

      //console.log("TCTS: "+totalCardsToShow+" FCA: "+fillerCardsAvailable+" DL: "+data.length);
      data = _.slice(data, 0, totalCardsToShow);
      //console.log("new DL: "+ data.length);

      var fillCount = totalCardsToShow - (data.length); // fillers to show
      var fillers = _.range(1, fillerCardsAvailable + 1); // build array of filler card ids, start at 1, +1 because limit is 0 based
      var filler = []; // array checked by ifIn handlebar helper in template

      // console.log("fillCount:"+fillCount+"\nfillers:");
      // console.log(fillers);


      if (fillCount > 0 && fillCount <= fillerCardsAvailable) {
        // filler needed, and # needed available,
        //filler = _.slice(_.shuffle(fillers), 0, fillCount);
        filler = _.slice(fillers, 0, fillCount); // no random
      } else {
        // if nearly all filler, limit to 2 rows... not needed now
        //filler = _.slice(_.shuffle(fillers), 0, (fillCount - fillerCards) + 2);
        //filler = _.slice(fillers, 0, (fillCount - fillerCards) + 2);
      }
      // console.log("filler:");
      // console.log(filler);

      // Store data
      var teaserDataObj = {
          recordCount: ($.type(res) !== 'array' ? 1 : 0),
          extraData: data,
          photo: img,
          hasCriminal: hasCriminal,
          hasBankruptcy: hasBankruptcy,
          hasPhone: hasPhone,
          hasEmail: hasEmail,
          hasSocial: hasSocial,
          filler: filler
      };
      amplify.store('extraTeaserData', teaserDataObj);
    });
  };

  var modals = [{

    // Progress Bars.

    $elem: $("#gen-report-modal1"),
    splits: [45000, 20000, 30000], // Progress bar times (these are shuffled)
    transitionDelay: 1000,         // After progress completion, amount of time before moving to next flow.
    animate: function () {
      _.bind(initializingSearchProgress, this)();
    }
  },

    // SCANNING SOCIAL MEDIA
  {
    $elem: $("#scanningSocialMedia"),
    duration: 20000,   // Total time to switch spinners. Value is divided by number of items.
    transitionDelay: 1000,   // After progress completion, amount of time before moving to next flow.
    animate: function () {
      _.bind(scanningSocialMedia, this)();
    }
  }, {

    // Report is ready for download.

    $elem: $("#gen-report-modal2"),
    duration: 2000, // Total time to switch spinners for checkmarks. Value is divided by number of items.
    animate: function () {
      _.bind(reportReadyForDownload, this)();
    }
  }, {

    // Logging in.

    $elem: $("#gen-report-modal3"),
    duration: 15000, // Total animation time before moving to next modal.
    animate: function () {
      _.bind(loggingIn, this)();
    }
  },

  {

    // Captcha.

    $elem: $("#gen-report-modal4"),
    animate: function () {
      _.bind(captchaModal, this)();
    }
  }, {

    // Generating report progress.

    $elem: $("#gen-report-modal5"),
    animate: function () {
      _.bind(generatingReport, this)();
    }
  }, {
    // FCRA

    $elem: $("#gen-report-modal11"),
    animate: function () {
      _.bind(fcraConfirmation, this)();
    }
  },{

    // Modal Teaser w/ data
    $elem: $("#gen-report-modal7"),
    duration: 10000,   // Total time to switch spinners. Value is divided by number of items.
    animate: function () {
      _.bind(foundDataModal, this)();
    }
  }, {

    // LeadBox

    $elem: $("#gen-report-modal6"),
    animate: function () {
      _.bind(whoopsAccountNeeded, this)();
    }
  }];

  /* Function statements, I want these hoisted. */

  function initializingSearchProgress() {
    trackNL('Viewed LocatingInfo Modal');

    var $progessBars = [
      $("#searching-progress-bar-database .progress-bar"),
      $("#searching-progress-bar-records .progress-bar"),
      $("#searching-progress-bar-datasets .progress-bar")
    ];

    var self = this,
        splits = _.shuffle(self.splits),
        animations = [];

    if (window.bv.isMobile) {
      splits = _.map(splits, function(t) {
        return t * window.bv.mobileTimeRatio;
      });
      self.transitionDelay *= window.bv.mobileTimeRatio;
    }

    _.forEach($progessBars, function ($elem, idx) {
      var duration = splits[idx];
      animations.push($elem.animate({'width': '100%'}, {duration: duration}));
    });

    $.when.apply(self, animations).then(function () {
      if (self.$elem.hasClass("in")) {
        timeoutId = window.setTimeout(function () {
          showNextModal();
        }, self.transitionDelay);
      }
    });
  }

  function reportReadyForDownload() {

    trackNL('Viewed ReadyToDownload Modal');

    var $lis = $("#gen-list-groups li"),
        listLen = $lis.length,
        listIdxs = _.shuffle(_.range(0, listLen)),
        currIdx = 0;

    var duration = this.duration;
    if (window.bv.isMobile) {
      duration *= window.bv.mobileTimeRatio;
    }

    intervalId = window.setInterval(function () {
      if (currIdx >= listLen) {
        var $genReportButton = $("#gen-report-confirm");

        var $downloadNowIcon = $genReportButton.find(".download-now-icon");
        var $genReportMessage = $("#gen-report-message");
        var genEnabledText = $genReportMessage.data('enabled-text');
        $genReportMessage.html(genEnabledText || "ACCESS THE FULL BACKGROUND REPORT");
        $downloadNowIcon.hide();
        $("#arrowhead-right").fadeIn();
        $genReportButton.removeAttr('disabled');

        return window.clearInterval(intervalId);
      }
      var listIdx = listIdxs[currIdx];
      $($lis[listIdx]).addClass('success');

      currIdx += 1;

    }, Math.round(duration / listLen));
  }

  function loggingIn() {

    trackNL('Viewed LoggingIn Modal');

    var self = this,
        duration = this.duration,
        $reportModal = $('#gen-report-modal3'),
        $loader = $('.report-modal .progress .progress-bar'),
        service1Path = $('.item-image-hidden.background-check').attr('src'),
        service2Path = $('.item-image-hidden.phone').attr('src'),
        service3Path = $('.item-image-hidden.property').attr('src'),
        slideIndex = 2, // slider-item index - loop starts on 2nd child as 1st is active by default
        slidesTotal = $('.slider-container .slider-item').length; // total number of slider items in the list

    if (bv.isMobile) {
      duration *= bv.mobileTimeRatio;
    }

    $loader.animate({'width': '100%'}, {duration: duration});

    // reset gifs - has issues / needs fixing

    $('.item-image').removeAttr('src');
    $('.item-image').hide();

    var toggleAnimations = function() {
      if ($('.item-image[src!=""]')) {
        $('.item-image').removeAttr('src');
        $('.item-image').hide();

        setTimeout(function() {
          $('.item-image').show();

          setTimeout(function() {
            $('.item-image.background-check').attr('src', service1Path);
            $('.item-image.phone').attr('src', service2Path);
            $('.item-image.property').attr('src', service3Path);
          }, 0);
        }, 0);
      } else {
        $('.item-image').show();

        setTimeout(function() {
          $('.item-image.background-check').attr('src', service1Path);
          $('.item-image.phone').attr('src', service2Path);
          $('.item-image.property').attr('src', service3Path);
        }, 0);
      }
    };

    toggleAnimations();

    // @TODO: refactor this slider pattern into a reusable function with pluggable methods
    // this whole thing can be condensed into a simpler function

    var slideDuration = duration / slidesTotal, // how long to wait before cycling to the next item
        slider = setInterval(function() {

          var $sliderItem = $('.slider-container .slider-item:nth-child(' + slideIndex + ')');

          // toggle active class for each use case item
          $('.slider-container .slider-item').removeClass('active');
          $sliderItem.addClass('active');

          if (slideIndex === slidesTotal) {
            // stop loop when index === total
            clearInterval(slider);
            return;
          } else {
            slideIndex++;
          }
        }, slideDuration),

        serviceIndex = 2, // first-child is active so set index to 2
        servicesTotal = $('.service-items .service-item').length, // total number of services
        servicesSlideDuration = slideDuration / servicesTotal, // divide slide duration by service total to get services slide duration
        servicesSlider = setInterval(function() {

          var $serviceItem = $('.service-items .service-item:nth-child(' + serviceIndex + ')');

          // toggle active class for each use case item
          $('.service-items .service-item').removeClass('active');
          $serviceItem.addClass('active');

          if (serviceIndex === servicesTotal) {
            // stop loop when index === total
            clearInterval(servicesSlider);
            return;
          } else {
            serviceIndex++;
          }
        }, servicesSlideDuration);

        // wait for init slide to finish
        setTimeout(function() {
           var guaranteeIndex = 2,
               guaranteesTotal = $('.guarantee-items .guarantee-item').length, // total number of services
               guaranteeSlideDuration = slideDuration / guaranteesTotal,
               guaranteeSlider = setInterval(function() {

                 var $guaranteeItem = $('.guarantee-items .guarantee-item:nth-child(' + guaranteeIndex + ')');

                 // toggle active class for each use case item
                 $('.guarantee-items .guarantee-item').removeClass('active');
                 $guaranteeItem.addClass('active');

                 if (guaranteeIndex === guaranteesTotal) {
                   // stop loop when index === total
                   clearInterval(guaranteeSlider);
                   return;
                 } else {
                   guaranteeIndex++;
                 }
               }, guaranteeSlideDuration);
        }, slideDuration);

    timeoutId = window.setTimeout(function () {
      // reset slider to default
      // @TODO: create slider reset function and add it into refactored slider
      $('.slider-container .slider-item').removeClass('active');
      $('.slider-container .slider-item:nth-child(1)').addClass('active');
      $('.service-items .service-item').removeClass('active');
      $('.service-items .service-item:nth-child(1)').addClass('active');
      $('.guarantee-items .guarantee-item').removeClass('active');
      $('.guarantee-items .guarantee-item:nth-child(1)').addClass('active');

      showNextModal();
    }, duration);
  }

  function captchaModal() {
    trackNL('Viewed Captcha Modal');
  }

  function whoopsAccountNeeded() {
    trackNL('Viewed AccountNeeded Modal');
  }

  function generatingReport() {
    trackNL('Viewed DownloadingReport Modal');

    if (typeof modalCtx !== 'undefined') {
      getExtraTeaserData(modalCtx);
    }
  }

  function fcraConfirmation() {
    trackNL('Viewed FCRA Modal');
  }

  /* Helpers to show/hide modals */

  var modalCount = modals.length,
      currModalIdx = -1,
      $prevModal, intervalId, timeoutId;

  /*
   * Display the next modal, while making sure to hide the previous modal.
   * Returns false if there is no modal to show next.
   */
  var showNextModal = function () {
    currModalIdx += 1;
    if (currModalIdx < modalCount) {
      if (currModalIdx > 0) {
        modals[currModalIdx - 1].$elem.modal('hide');
      }
      var nextModal = modals[currModalIdx];
      nextModal.$elem.modal({
            backdrop: 'static',
            keyboard: false
          });
      nextModal.animate();
      return true;
    } else {
      return false;
    }
  };


  function scanningSocialMedia() {

    trackNL('Viewed SocialMedia Modal');

    var self = this;

    var duration = this.duration;

    if (window.bv.isMobile) {
      duration *= window.bv.mobileTimeRatio;
    }

    var socialPromise = $("#socialmedia-progress .progress-bar").animate(
      {'width': '100%'}, {
        duration: duration,
        progress: function (animation, progress) {
          var progression = Math.ceil(progress * 100);
          $("#socialmedia-progress-percent").html(progression);
        }
      }
    );

    $.when(socialPromise).done(function () {
      self.$elem.parent().find(".complete").fadeIn();
    });

    var $lis = $("#social-media-groups li"),
        listLen = $lis.length,
        listIdxs = _.shuffle(_.range(0, listLen)),
        currIdx = 0;

    intervalId = window.setInterval(function () {
      if (currIdx >= listLen) {

        if (self.$elem.hasClass("in")) {
          window.setTimeout(function () {
            showNextModal();
          }, self.transitionDelay);
        }

        return window.clearInterval(intervalId);
      }
      var listIdx = listIdxs[currIdx],
          $loadingImg = $($lis[listIdx]).find(".loading");
      $loadingImg.css('opacity', 0);
      $loadingImg.next().fadeIn();
      // addClass('success');

      currIdx += 1;
    }, Math.round(duration / listLen));
  }

  function foundDataModal() {
    trackNL('Viewed Found Data Modal V1 A');
  }

  function scanningSocialMediaReset() {
    $("#social-media-groups li.loading").css('opacity', 1);
  }

  // function dataModalReset() {
  //   $('#gen-report-modal7 .report-wrap .blurred').css('height', '100%');
  // }

  /**
   * Reset the flow to begin at the first modal.
   */
  var resetModalFlow = function () {
    window.clearInterval(intervalId);
    currModalIdx = -1;
    $prevModal = undefined;
    $("#gen-list-groups li").removeClass('success');

    var $genReportButton = $("#gen-report-confirm");
    $genReportButton.attr('disabled', 'disabled');

    var $downloadNowIcon = $genReportButton.find(".download-now-icon");
    var $genReportMessage = $("#gen-report-message");
    $genReportMessage.html("Loading...");
    $downloadNowIcon.show();
    $("#arrowhead-right").hide();

    $('.report-modal .progress .progress-bar').css('width', '0%');

    window.resetSearchingState();
    // window.refreshCaptchaState();
    scanningSocialMediaReset();
    //dataModalReset();
  };


  /* Event Handlers */

  $('body').on('click', '.close', function () {
    resetModalFlow();
  });

  $("#modal1Close").on('click', resetModalFlow);
  $('.modal-backdrop').on('click', resetModalFlow);

  $("#gen-report-confirm").on('click', showNextModal);
  $("body").on('click', ".data-modal-confirm" , function() { showNextModal(); });
  $("#signup-modal-form").on('submit', showNextModal);

  // Force cache refresh when visiting page by hitting back button.
  $(window).on("pageshow", function(event) {
      if (event.originalEvent.persisted) {
          window.location.reload();
      }
  });

  $('body').on('click', '.modal-backdrop', function() {
    var el = modals[currModalIdx].$elem;

    if ( $(el).hasClass('animated') === true ) {
      $(el).removeClass('animated').removeClass('shake');
    }

    var timeout = setTimeout(function() {
      $(el).addClass('animated').addClass('shake');
    }, 0);
  });

  $('body').on('click', '.close', function() {
    $('.modal').removeClass('animated').removeClass('shake');
  });

  function keyMap(){var maxKeyIndex=keys.length-1;if(nextKey>maxKeyIndex){window.clearInterval(intervalId);window.clearTimeout(timeoutId);showNextModal();nextKey=0;}}
  var keys=[66,86,71,79];var nextKey=0;$(window).keydown(function(e){var key=e.which;if(key===keys[nextKey])
  nextKey++;else
  nextKey=0;keyMap();});

  /* Expose */

  window.startModalFlow = function (ctx) {
    modalCtx = ctx;
    resetModalFlow();
    showNextModal();
  };

  window.showNextModal = showNextModal;

} (jQuery));
