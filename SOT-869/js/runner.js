;
(function($) {
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

  // Catch safari private browsing mode

  try {
    localStorage.test = 2;
  } catch (e) {
    trackNL('Safari Private Browsing');

    var query = amplify.store('query');

    
    // // Get Extra Teaser Data
    //
    // var getExtraTeaserData = function(ctx, cb) {
    //   var dataPath = $(ctx).data("fr-bound2");
    //   var data = framerida.dataFromDataPath(dataPath);
    //   var teaser = new TeaserRecord(data);
    //   var bvid = teaser.bvid;
    //
    //   var baseUrl = "//www.beenverified.com/hk/dd/teaser/person?exporttype=jsonp";
    //   var url = baseUrl + "&bvid=" + bvid + "&criminal=1&bankruptcy=1";
    //   var xhrData = $.ajax({
    //     url: url,
    //     dataType: 'jsonp',
    //     jsonpCallback: 'parseResults'
    //   });
    //
    //   $.when(xhrData).done(function(result) {
    //     trackNL('Person Data Teaser Called');
    //
    //     var res = result;
    //     var img = '';
    //
    //     // Get profile image URL
    //     if (res.images[0] && typeof(res.images[0].url !== 'undefined')) {
    //       img = res.images[0].url;
    //     }
    //
    //     var phoneNumbers = $.map(res.phones, function(item) {
    //       return item.number.formatPhone();
    //     });
    //     var emailAddresses = $.map(res.emails, function(item) {
    //       return item.email_address.formatEmail().toLowerCase();
    //     });
    //     var socialNetworks = $.map(res.social, function(item) {
    //       return item.type.nameize();
    //     });
    //
    //     // Data elements to display - Waterfall controlled here
    //     var data = [{
    //       'type': 'criminal',
    //       'name': 'Criminal or Traffic*',
    //       'single': 'Criminal or Traffic*',
    //       'style': ' crim-box',
    //       'weight': 3,
    //       'showIfEmpty': 0,
    //       'count': res.courts.criminal.length
    //     }, {
    //       'type': 'bankruptcy',
    //       'name': 'Bankruptcy Filings',
    //       'single': 'Bankruptcy Filing',
    //       'style': ' crim-box',
    //       'weight': 3,
    //       'showIfEmpty': 0,
    //       'count': res.courts.bankruptcy.length
    //     }, {
    //       'type': 'emails',
    //       'name': 'Email Addresses',
    //       'single': 'Email Address',
    //       'style': '',
    //       'weight': 2,
    //       'showIfEmpty': 0,
    //       'count': res.emails.length,
    //       'emailAddress': emailAddresses
    //     }, {
    //       'type': 'phones',
    //       'name': 'Phone Numbers',
    //       'single': 'Phone Number',
    //       'style': ' phone-box',
    //       'weight': 1,
    //       'showIfEmpty': 0,
    //       'count': res.phones.length,
    //       'phoneNumber': phoneNumbers
    //     }, {
    //       'type': 'social',
    //       'name': 'Social Media Profiles',
    //       'single': 'Social Media Profile',
    //       'style': ' social-box',
    //       'weight': 1,
    //       'showIfEmpty': 0,
    //       'count': res.social.length,
    //       'socialNetwork': socialNetworks
    //     }, {
    //       'type': 'associates',
    //       'name': 'Associates & Relatives',
    //       'single': 'Associates & Relatives',
    //       'style': '',
    //       'weight': 0,
    //       'showIfEmpty': 0,
    //       'count': res.connections.associates.length + res.connections.relatives.length
    //     }];
    //
    //     // Booleans for templating & reporting
    //     var hasCriminal = _.some(data, function(item) {
    //       return item.type === 'criminal' && item.count > 0;
    //     });
    //     var hasBankruptcy = _.some(data, function(item) {
    //       return item.type === 'bankruptcy' && item.count > 0;
    //     });
    //     var hasPhone = _.some(data, function(item) {
    //       return item.type === 'phones' && item.count > 0;
    //     });
    //     var hasEmail = _.some(data, function(item) {
    //       return item.type === 'emails' && item.count > 0;
    //     });
    //     var hasSocial = _.some(data, function(item) {
    //       return item.type === 'social' && item.count > 0;
    //     });
    //     var hasProperty = _.some(data, function(item) {
    //       return (item.type === 'addresses' && item.count > 0) || (item.type === 'neighbors' && item.count > 0);
    //     });
    //
    //     // Force singular name here rather than in template... meh
    //     data = _.forEach(data, function(item, key) {
    //       if (item.count === 1) {
    //         item.name = item.single;
    //       }
    //     });
    //
    //     // Scrub data for display
    //     _.remove(data, function(item) {
    //       return item.showIfEmpty === 0 && item.count === 0;
    //     });
    //
    //     data = _.sortByOrder(data, ['weight', 'count'], ['desc', 'desc']);
    //
    //     var totalCardsToShow = parseInt($('div.details').data('total-cards-to-show'));
    //     var fillerCardsAvailable = parseInt($('div.details').data('filler-cards-available'));
    //
    //     data = _.slice(data, 0, totalCardsToShow);
    //
    //     var fillCount = totalCardsToShow - (data.length); // fillers to show
    //     var fillers = _.range(1, fillerCardsAvailable + 1); // build array of filler card ids, start at 1, +1 because limit is 0 based
    //     var filler = []; // array checked by ifIn handlebar helper in template
    //
    //     if (fillCount > 0 && fillCount <= fillerCardsAvailable) {
    //       filler = _.slice(fillers, 0, fillCount); // no random
    //     } else {
    //       // if nearly all filler, limit to 2 rows... not needed now
    //       //filler = _.slice(_.shuffle(fillers), 0, (fillCount - fillerCards) + 2);
    //       //filler = _.slice(fillers, 0, (fillCount - fillerCards) + 2);
    //     }
    //
    //     // Store data
    //     var teaserDataObj = {
    //       recordCount: ($.type(res) !== 'array' ? 1 : 0),
    //       extraData: data,
    //       photo: img,
    //       hasCriminal: hasCriminal,
    //       hasBankruptcy: hasBankruptcy,
    //       hasPhone: hasPhone,
    //       hasEmail: hasEmail,
    //       hasSocial: hasSocial,
    //       filler: filler
    //     };
    //
    //     amplify.store('extraTeaserData', teaserDataObj);
    //     if (cb !== "undefined" && typeof cb === "function") {
    //       cb();
    //     }
    //   });
    // };
    //
    var initData = function() {
      getTeaserData();
      //getExtraTeaserData();
    }

    initData();
  }

  // teaser links event
  $('.scroll-to-subscribe').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#subscribe').offset().top
    }, 500);
  });

  // Initialize cvv popover for Bootstrap 3
  $('.cvv-tip').popover({
    container: 'body',
    trigger: 'hover focus',
    placement: 'auto',
    title: '<p><strong>What is a Security Code?</strong></p>',
    html: true,
    content: function() {
      return '<p><strong>Visa, MasterCard, and Discover</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Back of Card</strong><br>Three digits located on the right of the signature strip.</small></p></div></div><p><strong>American Express</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Front of Card</strong><br>Four digits located on either the left or right side.</small></p></div>';
    }
  });

  // Initialize security popover for Bootstrap 3
  $('.secure').popover({
    container: 'body',
    trigger: 'hover focus',
    placement: 'auto',
    html: true,
    content: function() {
      return '<p><span class="glyphicon glyphicon-lock"></span> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
    }
  });

  var $selectionWrap = $('.package');

  // Update terms & conditions based on selected plan
  var updatePlanLegal = function($selectionSelected) {

    var $planPrice = $selectionSelected.find('.price-label');

    var totalPrice = $planPrice.data('plan-price'),
      type = $planPrice.data('plan-type'),
      monthlyPrice = $planPrice.data('monthly-price'),
      termLength = $planPrice.data('term-length');


    var $priceHTML = $('#legal-price'),
      $typeHTML = $('#legal-type'),
      $summaryTermHTML = $('.summary-term'),
      $summaryMonthPriceHTML = $('.summary-month-price'),
      $summaryTotalPriceHTML = $('.summary-total-price');

    $priceHTML.html(totalPrice);
    $summaryTotalPriceHTML.html(totalPrice);
    $summaryMonthPriceHTML.html(monthlyPrice);
    $typeHTML.html(type);
    $summaryTermHTML.html(termLength);

    $selectionWrap.removeClass('package-selected');
    $selectionSelected.addClass('package-selected');
  };

  var highlightSelection = function() {
    $selectionWrap.removeClass('package-selected');
    $(this).addClass('package-selected');
    $(this).find("input[type=radio].deal-radio").prop("checked", true);
    updatePlanLegal($(this));
  };

  $selectionWrap.on('click', highlightSelection);

  /* Set current year inside footer */
  ;
  (function($) {
    var currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      $currentYear = $('.current-year');

    $currentYear.html(currentYear);
  }(jQuery));

  var verifySeal = function() {
    $('.secure').on('click', function() {
      var left = ($(window).width() / 2) - (900 / 2),
        top = ($(window).height() / 2) - (600 / 2),
        popup = window.open("https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.beenverified.com&lang=en", "popup", "width=900, height=600, top=" + top + ", left=" + left);
    });
  };

  var reportHeap = function(evt, opt) {
    if (typeof window.heap !== "undefined" && heap.track) {
      heap.track(evt, opt);
    }
  };

  var $bounceBackBtn = $('#iModal-back'),
    $bounceExitBtn = $('#iModal-exit'),
    $goToNextPage = $('#show-dollar-trial'),
    $iOSModal = $('#iModal'),
    $iOSModalTrial = $('#iModal-trial'),
    $iModalX = $("#imodal-x");

  var bounceBack = function() {
    trackNL('onBack Modal - Rejected');
    //window.location.href = $("body").data("search-page");
  };

  var bounceExit = function() {
    $iOSModal.modal('hide');
    window.setTimeout(function() {
      $iOSModalTrial.modal('show');
    }, 300);
  };

  $bounceBackBtn.on('click', bounceBack);
  $bounceExitBtn.on('click', bounceExit);
  $goToNextPage.on('click', function() {
    trackNL('onBack Modal - Accepted');
    window.location.href = $("body").data("next-page");
  });

  $iModalX.on('click', function() {
    trackNL('onBack Modal - Exited');
  });


  var initDownsells = function() {

    var VWO_CHECK_INTERVAL = 3000,
      CHECK_TIMEOUT = 5000,
      timeElapsed = 1000;

    var activateDownsells = function() {
      if (typeof downsell !== "undefined" && typeof downsell.init === "function") {
        downsell.init({
          onBack: {
            elem: "#iModal-trial",
            cb: function() {}
          }
        });
      }
    };

    var vwoIntervalId,
      vwoExists = typeof _vwo_code !== "undefined" && typeof _vwo_code.finished === 'function';

    if (vwoExists) {
      vwoIntervalId = window.setInterval(function() {
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

  var setLastVisit = function() {
    Cookie.create("lastVisit", Date.now(), 30);
    trackNL('lastVisit Cookie Set');
    //amplify.store("lastVisit", Date.now());
  }

  var initialize = function() {
    verifySeal();
    setLastVisit();

    var selectedPlan = $(".package-selected");
    updatePlanLegal(selectedPlan);

    initDownsells();
  };

  initialize();

}(jQuery));
