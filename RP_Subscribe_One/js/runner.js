$(function() {

  var createMap = function() {

    // debugger
    var latlng,
    data = amplify.store().bv_searchData;
    if (data && (data.latlng[0] && data.latlng[1])) {
      latlng = [data.latlng[1], data.latlng[0]];
    } else {
      latlng = [-97.734375, 38.505191];
    }
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw';
    var mapOpts = {
      container: "map",
      center: latlng,
      style: 'mapbox://styles/mapbox/streets-v10',
      interactive: false,
      zoom: 8
    };
    var map = new mapboxgl.Map(mapOpts);

    map.on('load', function(){

      new mapboxgl.Marker().setLngLat(latlng).addTo(map);
    });
  };

  var initialize = function() {
    createMap();
  };

  initialize();
});
