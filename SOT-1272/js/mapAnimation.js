(function ($, L, AnimationFrame) {

  /* Patches window.requestAnimationFrame for cross-browser support. */
  AnimationFrame.shim();

  var map;

  var circleOpts = {
    color: 'red',
    opacity: 1,
    fillColor: 'red',
    fillOpacity: 0.25,
    weight: 2,
    size: 0.5,
    clickable: false,
  };

  var circle = L.circleMarker([38.505191, -97.734375], circleOpts);

  var resetCircleRadius = function () {
    circleOpts.radius = ($(window).width() * 0.40) / 2;
    circle.setRadius(circleOpts.radius);
  };

  resetCircleRadius();

  var circleRadius = circleOpts.radius;
  circle.setRadius(circleRadius);
  var currZoomLevel = 5;
  var circleMinRadius = 10;
  var circleStep = 2.5;
  var targetLocation = [38.505191, -97.734375];

  var animateCircleRadius = function () {
    if (currCircleRadius < circleMinRadius) {
      window.cancelAnimationFrame(animateCircleRadiusId);
      circle.setRadius(currCircleRadius);
      map.setView(targetLocation, currZoomLevel, {animate: true});
      nextTask();
    } else {
      currCircleRadius -= circleStep;
      circle.setRadius(currCircleRadius);
      animateCircleRadiusId = window.requestAnimationFrame(animateCircleRadius);
    }
  };

  var runCircleAnimation = function (waitTime) {
    circle.setRadius(circleOpts.radius);
    window.setTimeout(function () {
      currCircleRadius = circleOpts.radius;
      animateCircleRadiusId = window.requestAnimationFrame(animateCircleRadius);
    }, waitTime);
  };

  var transitionDuration = 500;

  var tasks = [
    function () {
      currZoomLevel = 7;
      runCircleAnimation(transitionDuration);
    },
    function () {
      currZoomLevel = 9;
      runCircleAnimation(transitionDuration);
    },
    function () {
      currZoomLevel = 12;
      runCircleAnimation(transitionDuration);
    }
  ];

  var finishedCb = function () {};

  var onCompletion = function () {
    circle.setRadius(circleOpts.radius);
    window.setTimeout(function () {
      map.removeLayer(circle);
      finishedCb();
    }, 1200);
  };

  var currTask = -1;
  var maxTasks = tasks.length - 1;

  var nextTask = function () {
    currTask += 1;
    if (currTask <= maxTasks) {
    tasks[currTask]();
    } else {
      onCompletion();
    }
  };

  var run = function (mapInst, location, delay, cb) {
    map = mapInst;
    finishedCb = cb;
    $(".initial_modal").fadeOut();
    var $locating = $('.locating');
    $locating.show();
    window.setTimeout(function () {
      $('.modal-overlay').fadeOut();
      $locating.hide();
      targetLocation = location;
      map.panTo(targetLocation);
      circle.setLatLng(targetLocation);
      circle.addTo(map);
      nextTask();
    }, delay);
  };

  window.mapAnimation = {
    run: run
  };

}(jQuery, L, AnimationFrame));