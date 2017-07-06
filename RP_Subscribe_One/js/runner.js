$(function() {

  var createMap = function() {

    var data = amplify.store().bv_searchData;

    var lat = (data && data.latlng && data.latlng[0]) ? data.latlng[0] : 38.505191;
    var lng = (data && data.latlng && data.latlng[1]) ? data.latlng[1] : -97.734375;

    if ( typeof mapboxgl !== 'undefined') {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw';
      var mapOpts = {
        container: "map",
        center: [lng, lat],
        style: 'mapbox://styles/mapbox/streets-v10',
        interactive: false,
        zoom: 8
      };
      var map = new mapboxgl.Map(mapOpts);

      map.on('load', function(){

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      });
      return map;
    } else {


      var mapUrl = "https://api.mapbox.com/v4/mapbox.emerald/pin-l-building+8064a4(" + lng + "," + lat + ")/" + lng + "," + lat + ",12/400x300.jpg70?access_token=pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw";
        var tmpImg = new Image();
        tmpImg.src = mapUrl;
        tmpImg.onload = function() {
          $('#map').append(tmpImg);
        };

    }
  };

  var initialize = function() {
    createMap();
  };

  initialize();
});
