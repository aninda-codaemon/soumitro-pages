import _ from 'lodash';
import { validQueryData } from '../utils/query';

const STEPS = 'steps';
const PROGRESS_DURATION = 60000;
const UNIT = PROGRESS_DURATION / 20;
const stepsDuration = {
  verySlow: UNIT * 5,
  slow: UNIT * 4,
  middle: UNIT * 3,
  fast: UNIT * 2,
  veryFast: UNIT * 1
};
let timeRemaining = 50;
let $bar = $(".bar");

$('.progress-text-inner').hide();

const step = onStep => (percentaje, duration, easing) => next => {
  $bar.animate({
    width: percentaje + '%'
  }, {
    duration: duration,
    easing: easing || 'linear',
    step: (step) => {
      var percent = Math.floor(step);
      $('.progress-text-inner').html(percent.toString() + "%");
      $('.progress-text-outer').html("&nbsp; " + percent.toString() + "%");

      var percentRemain = 100 - percent.toString(),
          durationRemain = PROGRESS_DURATION * percentRemain / 100;

      timeRemaining = Math.floor((durationRemain / 1000) % 60);
      onStep(step);
    }
  });
  next();
};
// update time remaining every 15 seconds
setInterval(() => $('.time-remaining-count').html(timeRemaining), 15000);

$('.time-remaining-count').html(60);

export const initProgressBar = onStep => {
  const newStep = step(onStep);
  return $bar
    .queue(STEPS, newStep(5, stepsDuration.veryFast, 'swing'))
    .queue(STEPS, newStep(20, stepsDuration.middle))
    .queue(STEPS, newStep(40, stepsDuration.middle))
    .queue(STEPS, newStep(60, stepsDuration.fast))
    .queue(STEPS, newStep(80, stepsDuration.slow))
    .queue(STEPS, newStep(90, stepsDuration.fast))
    .queue(STEPS, newStep(100, stepsDuration.verySlow))
    .dequeue(STEPS);
}