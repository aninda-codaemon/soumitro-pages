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

      var latlng,
          data = amplify.store().bv_searchData;
      if (data && (data.latlng[0] !== "") && (data.latlng[1] !== "")) {
        latlng = [data.latlng[0], data.latlng[1]];
      } else {
        latlng = [-97.734375, 38.505191];
      }
      new mapboxgl.Marker().setLngLat(latlng).addTo(map);
    });
  };

  var initialize = function() {
    createMap();
  };

  initialize();
});
