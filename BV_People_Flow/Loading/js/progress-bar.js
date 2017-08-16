var timeRemaining = 50;

$('.progress-text-inner').hide();

var STEPS = 'steps';
var unit = PROGRESS_DURATION / 20;
var stepsDuration = {
  verySlow: unit * 5,
  slow: unit * 4,
  middle: unit * 3,
  fast: unit * 2,
  veryFast: unit * 1
};

var step = function (percentaje, duration, easing) {            
  return function (next) {
    $bar.animate({
      width: percentaje + '%'
    }, {
      duration: duration,
      easing: easing || 'linear',
      step: function(step) {
        var percent = Math.floor(step);
        $('.progress-text-inner').html(percent.toString() + "%");
        $('.progress-text-outer').html("&nbsp; " + percent.toString() + "%");

        var percentRemain = 100 - percent.toString(),
            durationRemain = PROGRESS_DURATION * percentRemain / 100;

        timeRemaining = Math.floor((durationRemain / 1000) % 60);
        
        if (percent === 50) {
        $('.progress-text-outer').fadeOut();
        $('.progress-text-inner').fadeIn();
      }
      if (percent === 16 && !_.isUndefined(searchData) && excessResults == true && !validQueryData(searchData.city) && _.isUndefined(searchData.norefine) && !modalClosed) {
        $('#input-state').modal('show');
        trackNL("Show Location Refine Modal");
      }
      if (percent === 14 && !_.isUndefined(searchData) &&
        _.isEmpty(searchData.fn) && !modalClosed2) {
        // Capitalize first letter of last name
        var userLastname = searchData.ln.replace(searchData.ln[0], searchData.ln[0].toUpperCase());

        $('#ln').val(userLastname);
        $('#fn-modal').modal('show');
      }
      if (percent === 15 && !_.isUndefined(searchData) &&
        _.isEmpty(searchData.ln) && !modalClosed2) {
        // Capitalize first letter of First name
        var userFirstname = searchData.fn.replace(searchData.fn[0], searchData.fn[0].toUpperCase());

        $('#fn').val(userFirstname);
        $('#fn-modal').modal('show');
        }

      if (percent === 98) {
        $('#input-state').modal('hide');
        $('#fn-modal').modal('hide');
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
    next();
  };
}
  
var progress = $bar
  .queue(STEPS, step(5, stepsDuration.veryFast, 'swing'))
  .queue(STEPS, step(20, stepsDuration.middle))
  .queue(STEPS, step(40, stepsDuration.middle))
  .queue(STEPS, step(60, stepsDuration.fast))
  .queue(STEPS, step(80, stepsDuration.slow))
  .queue(STEPS, step(90, stepsDuration.fast))
  .queue(STEPS, step(100, stepsDuration.verySlow))
  .dequeue(STEPS);

// update time remaining every 15 seconds
setInterval(() => $('.time-remaining-count').html(timeRemaining), 15000);