$(function() {

  searchData = amplify.store().bv_searchData;
  SECTION_TYPE = ["url", "email", "image_url", "phone", "education"];

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

  $('.progress-text-inner').hide();

  var socialFinders = function() {
    duration = 15000;

    var $lis = $("#social-media-groups li"),
        listLen = $lis.length,
        listIdxs = _.shuffle(_.range(0, listLen)),
        currIdx = 0;

    intervalId = window.setInterval(function () {
      if (currIdx >= listLen) {
        $('#socialMedia .highlighted').hide().text('Complete!').fadeIn();

          window.setTimeout(function () {
            // showNextSection();
          }, self.transitionDelay);


        return window.clearInterval(intervalId);
      }
      var listIdx = listIdxs[currIdx],
          $loadingImg = $($lis[listIdx]).find(".loading"),
          profileName = $loadingImg.next()[0].classList[1].capitalize().split("-").join(" ");


      $loadingImg.css('opacity', 0);
      $loadingImg.next().fadeIn();
      $('#website').hide().text(profileName).fadeIn();
      // addClass('success');

      currIdx += 1;
    }, Math.round(duration / listLen));

  };

  var startLoader = function() {
    var progress = $('.bar').animate({
      width: "100%"
    }, {
      duration: 75000,
      easing: 'easeBV',
      step: function(step) {
        var percent = Math.floor(step);
        $('.progress-text-inner').html(percent.toString() + "%");
        $('.progress-text-outer').html("&nbsp; " + percent.toString() + "%");

        var percentRemain = 100 - percent.toString(),
            durationRemain = 75000 * percentRemain / 100;

        timeRemaining = Math.floor((durationRemain / 1000) % 60);

        if (percent === 50) {
          $('.progress-text-outer').fadeOut();
          $('.progress-text-inner').fadeIn();
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
  };

  var displayCount = function(idx) {
    var dataCounts = amplify.store().fullTeaser.available_data_counts,
        currentCount = SECTION_TYPE
  };
  var sections = $('section'),
      currentIdx = 1;

  var changeSections = function() {
    var sectionInterval = window.setInterval(function(){
      if (currentIdx === sections.length){
        window.clearInterval(sectionInterval);
        window.setTimeout(function(){
          window.location.href = $('body').data('next-page');
        },750);
      }
      sections.removeClass('active');
      $(sections[currentIdx]).addClass('active');
      displayCount(currentIdx);
      //added this little hack for now to keep final section as displayed, because
      // active class will be removed
      if ($(sections[currentIdx]).is('#jobBox')) {
        $(sections[currentIdx]).addClass('block-hack');
      }
      currentIdx += 1;
    }, 15000);
  };

  var getTeaserData = function() {
    var baseUrl = 'https://www.beenverified.com/hk/dd/teaser/phone',
        url = baseUrl + "?phone=" + searchData.phoneNumber + "&type=full",
        xhrData = $.ajax({
          url: url,
          dataType: 'jsonp'
        });

    $.when(xhrData.done(function(result, success){
      if (success === 'success' && !$.isEmptyObject(result)){
        amplify.store('fullTeaser', result);
      }
      displayCount(0);
    }));
  };



  var initialize = function() {
    getTeaserData();
    startLoader();
    socialFinders();
    changeSections();
  };

  initialize();
});
