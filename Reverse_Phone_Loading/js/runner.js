$(function() {
    var animationDuration = 60000;
    headerIdx = 0;
    var HEADERS = ['#firstHeader', '#secondHeader', '#thirdHeader'];
    searchData = amplify.store().bv_searchData;

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


  var changeTab = function(idx) {

     var $sections = $('.switch-section'),
         $tabs = $('.section-tabs .tab'),
         $loaderBoxes = $('.loader-box');

    $sections.removeClass('active');
    $tabs.removeClass('active');
    $loaderBoxes.removeClass('active');

    $($tabs[idx]).addClass('active');
    $($sections[idx]).addClass('active');
    var loaderImg = $($loaderBoxes[idx]).find('img.loader');
    var imgSrc = loaderImg.attr('src');
    // debugger
    $('.step-number').text('Step ' + (idx + 1).toString() + "/4");
    $($loaderBoxes[idx]).addClass('active');
    window.setTimeout(function(){
      loaderImg.attr('src', '#');
      loaderImg.attr('src', imgSrc);
    }, 200);
  };

  $('.progress-text-inner').hide();
  var startLoader = function() {
    var progress = $('.bar').animate({
      width: "100%"
    }, {
      duration: animationDuration,
      easing: 'linear',
      step: function(step) {
        var percent = Math.floor(step);
        $('.progress-text-inner').html(percent.toString() + "%");
        $('.progress-text-outer').html("&nbsp; " + percent.toString() + "%");

        var percentRemain = 100 - percent.toString(),
            durationRemain = 40000 * percentRemain / 100;

        timeRemaining = Math.floor((durationRemain / 1000) % 60);

        if (percent === 23) {

        }

        if (percent === 50) {
          $('.progress-text-outer').fadeOut();
          $('.progress-text-inner').fadeIn();

        }

        if (percent === 75) {

        }

        if (percent === 42) {
          $('.test1').addClass('hidden-xs hidden-sm');
          $('.test2').removeClass('hidden-xs hidden-sm');
        }
        if (percent === 66) {
          $('.test2').addClass('hidden-xs hidden-sm');
          $('.test3').removeClass('hidden-xs hidden-sm');
        }

        if (percent === 99) {
          window.setTimeout(function(){
            $('.progress-text-inner').html('100%');
          }, 1000);
        }
      }
    });
  };


  var changeHeader = function() {
    if (headerIdx + 1> HEADERS.length) {
      return;
    }

    $(HEADERS[headerIdx]).removeClass('active');
    $(HEADERS[headerIdx + 1]).addClass('active');
    headerIdx += 1;
  };

  var showLeadBox = function() {

    // Shawn made me get rid of these animations, i think they should go back in so im leaving it here
    // want to get rid of the side-bar column, and animate the width of the action column animating
    // to become a full page. the next two line would go into the toggle slide function below


    $('.full-section').addClass('col-sm-12').removeClass('col-md-9 col-sm-8');
    $('.side-bar').removeClass("hidden-xs").hide();
    // $('.side-bar').toggle('slide', function(){
    // });

    $('.all-day').hide();
    $('#search-main-progress').hide();
    changeHeader();
    // $('#secondAction').removeClass('active');
    $('#secondAction').hide();
    $('#thirdAction').fadeIn();
    $('#lead_first_name').focus();
  };

  var changeScreen = function() {
    var first = $('#firstAction'),
        second = $('#secondAction');

    first.hide();
    second.fadeIn();

    $('#report-btn').click(function(){
      showLeadBox();
    });
    changeHeader();
  };

  var getFirstPhone = function() {

    // var baseUrl = 'https://www.beenverified.com/hk/dd/teaser/phone',
    //     url = baseUrl + "?phone=" + searchData.phoneNumber;
    //
    //     var xhrData = $.ajax({
    //       url: url,
    //       dataType: 'jsonp',
    //       jsonpCallback: 'parseResults'
    // });
    //
    // $.when(xhrData).done(function(result, status){
    //   debugger
    //
    //   if (status === "success" && !$.isEmptyObject(result)) {
    //     var searchData = {
    //       phone: amplify.store().bv_searchData.phoneNumber,
    //       latlng: [result.lat, result.lat],
    //       name: result.names[0] ? result.names[0].full : "",
    //       carrier: result.carrier,
    //       type: result.type,
    //       location: result.addresses[0] ? result.addresses[0].full : "",
    //       // email: result.emails[0] ? result.emails[0]
    //     };
    //
    //     amplify.store('firstTeaser', searchData);
    //   }
    // });
    window.setTimeout(changeScreen, (animationDuration / 4) + 1000);
  };

  var startTabs = function() {
    idx = 1;
    var tabInterval = window.setInterval(function(){
      changeTab(idx);
      idx++ ;
      if (idx === 4) {
        window.clearInterval(tabInterval);
        getFirstPhone();
      }
    }, animationDuration / 4);
  };

  var initialize = function() {
    startLoader();
    $('#firstAction').fadeIn();
    startTabs();
    // added this little hack to prevent animations from happening again when changing browser sizes
    window.setTimeout(function(){
      $('.action-header, .side-bar').css({"left" : "0%"}).addClass('no-animation');
      // $('.side-bar').css({"left" : "0%"}).addClass('no-animation')
    }, 1000);
  };

  initialize();
});
