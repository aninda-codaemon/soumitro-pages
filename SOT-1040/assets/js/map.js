/* Header Street View  */
var panorama;

function initialize() {

  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'),
      {
        position: {lat: 41.0158015, lng: -74.0746662},
        pov: {heading: 1, pitch: 0},
        zoom: 1
      });

  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view-small'),
      {
        position: {lat: 41.0158015, lng: -74.0746662},
        pov: {heading: 1, pitch: 0},
        zoom: 1
      });

  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view-small-2'),
      {
        position: {lat: 41.0158015, lng: -74.0746662},
        pov: {heading: 1, pitch: 0},
        zoom: 1
      });

  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view-small-3'),
      {
        position: {lat: 41.0158015, lng: -74.0746662},
        pov: {heading: 1, pitch: 0},
        zoom: 1
      });

  initNeigh();

}

/*Neighbors Map*/

function initNeigh() {
  var initNeighPos = new google.maps.LatLng(-34.397, 150.644);
  var mapOpts = {
        zoom: 20,
        center: initNeighPos,
        mapTypeId: 'satellite',
        disableDefaultUI: true
  }
  var neighMap = new google.maps.Map(document.getElementById('neigh-map'), mapOpts);

}






