$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  
// Back To Top
$(".backToTop").click(function() {
  $('html, body').animate({
    scrollTop: $("#top-banner").offset().top
  }, 500);
});

/* Landing  */
;(function ($, jCounter) {

  // Placeholder fix for older browsers
  $('input, textarea').placeholder();

  // Focus on first name input
  $('#fn').focus();

  // Ticker Counter
  $.ajax({ url: "/stats/report_count.json",
    dataType: 'json',
    success: function(data){
      jCounter({startCount : data.startCount, slope  : data.slope, afterUpdateCallback: function(currentCount){
          count = currentCount + '';
          count_items = count.padWithZeros(8).split("");
          for(i = 0; i < count_items.length; i++ ){
              $("#tick_"+i).html(count_items[i])
          }
        }
      }).countIt()
    }
  });
}(jQuery, jCounter));

/* Validation */
;(function ($) {

  // Validation via jQuery.validate.
  $("#signin_form").validate({
    rules: {
      "user[email]": "required",

      "user[password]": {
        required: true
      }
    },
    messages: {
      "user[email]": "Please enter your email address",

      "user[password]": {
        required: "Please provide a password"
      }
    },
    onkeyup: false,
    onclick: false
  });

  $("#header-search").validate({
    validClass: "success",

    rules: {
      fn: "required",
      ln: "required"
    },
    messages: {
      fn: "Please enter a first name",
      ln: "Please enter a last name"
    },

    submitHandler: function (form) {
      if (typeof heap !== 'undefined' && heap.track) {
        heap.track("Submitted Search Form - Success");
      }
    },

    onkeyup: false,
    onclick: false,
    onfocusout: function (e) {
      this.element(e);
    }
  });

  $.ajax({
    type: "GET",
    url: "/internal/api/state_for_ip",
    dataType: "json",
    success: function (data, textStatus) {
      $("SELECT").val(data['state'])
    }
  });

  var validState = function (state) {
    if (state.toLowerCase() === "all") {
      return "";
    }
    return state;
  };

}(jQuery));

/**
 * Set current year inside footer
 */
;(function ($) {
  var currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      $currentYear = $('.current-year');
  $currentYear.html(currentYear);
}(jQuery));

/**
 * BV Survey
 */
;(function ($) {

  var survey = {
    endpoint  : 'survey-endpoint',
    name      : 'survey-name',
    val       : 'survey-val',
    trigger   : 'survey-trigger',
    checked   : 'survey-checked',
    defaultt  : 'survey-default'
  };

  var onSubmit = function () {};

  var getCheckedItems = function ($elem, checkedClass) {
    var items = $elem.find('.survey-active'),
        vals = [];

    for (var i = 0; i < items.length; i += 1) {
      var itemValue = $(items[i]).closest('[data-'+survey.val+']').data(survey.val);
      vals.push(itemValue);
    }
    return vals;
  };

  var init = function () {
    var $surveys = $('.bv-survey');

    $surveys.each(function (idx, elem) {
      var $elem = $(elem),
          endpoint = $elem.data(survey.endpoint) || '//www.beenverified.com/api/3_0_1/leads.json',
          trigger = $elem.data(survey.trigger),
          checked = $elem.data(survey.checked);
          defaultt = $elem.data(survey.defaultt);

      $elem.find('[data-survey-val]').on('click', function () {
        $(this).toggleClass('survey-active');
        var $elemToToggle = $(this).find('.'+defaultt + ', .' + checked);

        if ($elemToToggle.hasClass(checked)) {
          $elemToToggle.removeClass(checked);
          $elemToToggle.addClass(defaultt);
        } else {
          $elemToToggle.removeClass(defaultt);
          $elemToToggle.addClass(checked);
        }
      });

      $('body').on('submit', trigger, function (evt) {
        evt.preventDefault();

        var validForm = true,
            items = [],
            itemsLen = 0;

        items = getCheckedItems($elem, '.'+checked);
        itemsLen = items.length;

        // Check if the form has a validator tied to it.
        var validator = $.data(this, "validator");
        if (typeof validator !== 'undefined' && typeof validator.form === 'function') {
          validForm = validator.form();
        }

        var $headerSearch = $("#header-search");

        if (validForm && itemsLen > 0) {
          var fn = $headerSearch.find('[name=fn]').val() || 'John',
              ln = $headerSearch.find('[name=ln]').val() || 'Doe';
          var data = [];
          data.push('lead[first_name]=' + fn);
          data.push('lead[last_name]=' + ln);
          for (var i = 0; i < itemsLen; i += 1) {
            data.push('signup_reason[]=' + items[i]);
          }
          $.post(endpoint, data.join('&'));

          if (typeof onSubmit === 'function') {
            onSubmit();
          }

          if (typeof window.heap !== 'undefined' && typeof heap.track === 'function') {
            try {
              window.heap.track("Submitted Purpose of Visit", {pov_choices: items});
              for (var j = 0; j < itemsLen; j += 1) {
                window.heap.track("Purpose of Visit Choice", {pov_choice: items[j]});
              }
            } catch (err) {}
          }
        }
      });
    });
  };

  window.bvSurvey = function (opts) {
    if (opts && typeof opts.onSubmit == 'function') {
      onSubmit = opts.onSubmit;
    }
    init();
  };

}(jQuery));


/* Sliders */
;(function ($, _) {

  $.fx.interval = 100;

  var TOTAL_PROGRESS_TIME = (20 * 1000) + (2 * 1000),                // Total plus a bit of a delay for effect.
      PROGRESS_SPLITS = _.shuffle([10 * 1000,  3 * 1000, 7 * 1000]); // Should be less or equal to TOTAL_PROGRESS_TIME.


  var scrollThroughCategories = function () {
    var cats = $('#searchCategory').data('search-categories');
    if (cats) {
      cats = cats.split(",");
    }
    if (cats instanceof Array && cats.length > 0) {
      var stepInterval = TOTAL_PROGRESS_TIME / cats.length;
      var currCatIdx = 0;
      var interval = window.setInterval(function () {
        var elapsedTime = (currCatIdx + 1) * stepInterval;
        if (elapsedTime > TOTAL_PROGRESS_TIME) {
          window.clearInterval(interval);
          return;
        }
        $('#searchCategory').text(cats[currCatIdx]);
        currCatIdx += 1;
      }, stepInterval);
    }
  };

  var animateProgress = function ($elem, duration) {
    return $elem.animate({ width: "100%" }, {
      duration: duration,
      easing: 'linear'
    }).promise();
  };

  var scrollMugshots = function () {
    var mugshotX = 0,
        mugshotXEnd = -918;

    var runMugshots = function () {
      mugshotX -= 54;
      var px = mugshotX;
      if (mugshotX < mugshotXEnd) {
        px = 0;
        mugshotX = 0;
      }
      $(".searchMugshots").css('background-position', '0 ' + px + 'px');
    };

    window.setInterval(runMugshots, 100);
  };
  
  var startProgressAnimation = function () {
    var $mainProgress = $('#search-main-progress .progress-bar'),
        $firstProgress = $('#search-first-progress .progress-bar'),
        $secondProgress = $('#search-second-progress .progress-bar'),
        $thirdProgress = $('#search-third-progress .progress-bar');
    
    scrollMugshots();

    var mainAnimation = animateProgress($mainProgress, TOTAL_PROGRESS_TIME);

    var first = animateProgress($firstProgress, PROGRESS_SPLITS[0]);
    scrollThroughCategories();

    first.done(function () {
      var second = animateProgress($secondProgress, PROGRESS_SPLITS[1]);
      second.done(function () {
        animateProgress($thirdProgress, PROGRESS_SPLITS[2])
      });
    });

    mainAnimation.done(function () {
      window.setTimeout(function () {
        var nextPage = $('body').data('next-page') || 'https://www.beenverified.com';
        window.location = nextPage + '?' + $('#header-search').serialize();
      }, 1000);
    });
  };

  var initialize = function () {
    var $carousel = $('.carousel');

    $carousel.carousel({
      interval: false
    });

    $("#header-search").on('submit', function (evt) {
      evt.preventDefault();

      var validator = $.data(this, "validator"),
          validForm = true;

      if (typeof validator !== 'undefined' && typeof validator.form === 'function') {
        validForm = validator.form();
      }

      if (!validForm) return;

      $carousel.carousel('next');
      window.bvSurvey({
        onSubmit: function () {
          $carousel.carousel('next');
          var $headerSearch = $("#header-search"),
              fn = $headerSearch.find("#fn").val(),
              ln = $headerSearch.find("#ln").val();
          if (fn && ln) {
            $("#subject-name").text(fn + " " + ln);
          }
          window.setTimeout(function () {
            startProgressAnimation();
          }, 2000);
        }
      });
    });
  };

  initialize();
}(jQuery, _));

