(function ($) {
  var map;
  var targetLocation = [];
  var finishedCb = function () {};

  var run = function (mapInst, location, delay, cb) {
    map = mapInst;
    finishedCb = cb;
    $(".initial_modal").fadeOut();

    window.setTimeout(function () {
      $('.modal-overlay').fadeOut();
      targetLocation = location;

      map.flyTo({
          center: targetLocation, // location of camera after animation ends
          zoom: 12, // zoom of map after animation ends
          pitch: 60, // pitch of map after animtion ends
          bearing: 15, // bearing of map after animation ends
          speed: 0.25, // speed of fly animation
          curve: 0.75 // speed of zoom animation
      });

      window.setTimeout(function () {
        finishedCb();
      }, 15000); // 15s until next modal is shown

    }, delay);
  };

  window.mapAnimation = {
    run: run
  };

}(jQuery));
