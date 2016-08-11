// (function ($, L, AnimationFrame) {
(function ($) {
  var map;

  // var circleOpts = {
  //   color: '#b10810',
  //   opacity: 1,
  //   fillColor: '#b10810',
  //   fillOpacity: 0.25,
  //   weight: 2,
  //   size: 0.5,
  //   clickable: false,
  // };

  // var circle = L.circleMarker([38.505191, -97.734375], circleOpts);

  // var resetCircleRadius = function () {
  //   circleOpts.radius = ($(window).width() * 0.40) / 2;
  //   circle.setRadius(circleOpts.radius);
  // };
  //
  // resetCircleRadius();
  //
  // var circleRadius = circleOpts.radius;
  // circle.setRadius(circleRadius);
  // var currZoomLevel = 5;
  // var circleMinRadius = 10;
  // var circleStep = 2.5;
  // @TODO: get actual phone location
  var targetLocation = [-73.97, 40.73];

  // var animateCircleRadius = function () {
  //   if (currCircleRadius < circleMinRadius) {
  //     window.cancelAnimationFrame(animateCircleRadiusId);
  //     circle.setRadius(currCircleRadius);
  //     map.setView(targetLocation, currZoomLevel, {animate: true});
  //     nextTask();
  //   } else {
  //     currCircleRadius -= circleStep;
  //     circle.setRadius(currCircleRadius);
  //     animateCircleRadiusId = window.requestAnimationFrame(animateCircleRadius);
  //   }
  // };
  //
  // var runCircleAnimation = function (waitTime) {
  //   circle.setRadius(circleOpts.radius);
  //   window.setTimeout(function () {
  //     currCircleRadius = circleOpts.radius;
  //     animateCircleRadiusId = window.requestAnimationFrame(animateCircleRadius);
  //   }, waitTime);
  // };
  //
  // var transitionDuration = 500;

  // var tasks = [
  //   function () {
  //     currZoomLevel = 7;
  //     runCircleAnimation(transitionDuration);
  //   },
  //   function () {
  //     currZoomLevel = 9;
  //     runCircleAnimation(transitionDuration);
  //   },
  //   function () {
  //     currZoomLevel = 12;
  //     runCircleAnimation(transitionDuration);
  //   }
  // ];

  var finishedCb = function () {};

  // var onCompletion = function () {
  //   circle.setRadius(circleOpts.radius);
  //   window.setTimeout(function () {
  //     map.removeLayer(circle);
  //     finishedCb();
  //   }, 1200);
  // };

  // var currTask = -1;
  // var maxTasks = tasks.length - 1;

  // var nextTask = function () {
  //   currTask += 1;
  //   if (currTask <= maxTasks) {
  //   tasks[currTask]();
  //   } else {
  //     onCompletion();
  //   }
  // };

  // var phoneLocation = {
  //   center: [-73.97, 40.73],
  //   pitch: 60,
  //   bearing: 15,
  //   zoom: 12
  // };

  // var flyToLocation = function (map, location) {
  //     map.flyTo({
  //         center: location, // location of camera after animation ends
  //         zoom: 12, // zoom of map after animation ends
  //         pitch: 60, // pitch of map after animtion ends
  //         bearing: 15, // bearing of map after animation ends
  //         speed: 0.25, // speed of fly animation
  //         curve: 0.75 // speed of zoom animation
  //     });
  // };

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
      // map.panTo(targetLocation);
      map.flyTo({
          center: targetLocation, // location of camera after animation ends
          zoom: 12, // zoom of map after animation ends
          pitch: 60, // pitch of map after animtion ends
          bearing: 15, // bearing of map after animation ends
          speed: 0.25, // speed of fly animation
          curve: 0.75 // speed of zoom animation
      });
      // circle.setLatLng(targetLocation);
      // circle.addTo(map);
      // nextTask();
    }, delay);
  };

  window.mapAnimation = {
    run: run
  };

// }(jQuery, L, AnimationFrame));
}(jQuery));
