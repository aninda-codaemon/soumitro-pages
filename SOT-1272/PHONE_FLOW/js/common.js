(function () {
  var url = 'https://www.beenverified.com/hk/dd/free/phoneinfo?&exporttype=jsonp';
  var subCheckUrl = 'https://www.beenverified.com/hk/dd/premium/phone/reverseteaser?exporttype=jsonp';
  var landingUrl = "https://www.beenverified.com";
  var subscribeUrl = "https://www.beenverified.com/subscribe/reverse_phone_lookup";
  var blueCheckUrl = 'http://frcdn.beenverified.com/assets/img/d1c73bfcb2bc605825980a9e2095e758.png';
  var mapAccessToken = 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw'; // mapbox access token
  var mapStyle = 'mapbox://styles/beenverified/cilnvi7je005t9nkujb0fpxue'; // link to number guru mapbox style
  var mapContainer = 'map'; // id of map container

  // map options
  var mapOptions = {
    container: mapContainer,
    style: mapStyle,
    center: [-97.92, 39.87], // center of US
    pitch: 0, // default pitch
    bearing: 0, // default bearing
    zoom: 4, // default zoom
    interactive: false // disable user interactivity
  };

  var mapbox = {
    options: mapOptions,
    token: mapAccessToken
  };

  var config = {
    searchData: 'bv_searchData',
    sendDataTo: 'bv_sendDataTo',
    url: url,
    subCheckUrl: subCheckUrl,
    landingUrl: landingUrl,
    subscribeUrl: subscribeUrl,
    blueCheckUrl: blueCheckUrl
  };

  window.bvRPL = {
    config: config,
    mapbox: mapbox
  };

} ());
