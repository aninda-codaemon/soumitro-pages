$(function() {

  var createMap = function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw';
    var mapOpts = {
      container: "map",
      center: [-97.734375, 38.505191],
      style: 'mapbox://styles/mapbox/streets-v10',
      interactive: false,
      zoom: 8
    };
    var map = new mapboxgl.Map(mapOpts);

    map.on('load', function(){
      new mapboxgl.Marker().setLngLat([-97.734375, 38.505191]).addTo(map);
    });
  };

  var initialize = function() {
    createMap();
  };

  initialize();
});
