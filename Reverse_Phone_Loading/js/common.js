(function () {

  var url = 'https://www.beenverified.com/hk/dd/teaser/phone';
  var subCheckUrl = 'https://www.beenverified.com/hk/dd/premium/phone/reverseteaser?exporttype=jsonp';
  var mapNum = 60352;
  var apiKey = '26a01f91e0ce4bf99a5e773b7745b649';
  var tilesUrl = 'https://ssl_tiles.cloudmade.com/' + apiKey + '/' + mapNum + '/256/{z}/{x}/{y}.png';
  var landingUrl = "https://www.beenverified.com";
  var subscribeUrl = "https://www.beenverified.com/subscribe/reverse_phone_lookup";
  var blueCheckUrl = 'https://cdn1.beenverified.com/srg/Reverse-Phone/landing/img/blueCheck_32.png';

  // var mapOpts = {
  //   dragging: false,
  //   touchZoom: false,
  //   scrollWheelZoom: false,
  //   doubleClickZoom: false,
  //   boxZoom: false,
  //   keyboard: false,
  //   zoomControl: false,
  //   startZoom: 4,
  //   attributionControl: false
  // };

  var mapOpts = {
    container: 'map',
    center: [40.8139, 73.9624],
    style: 'mapbox://styles/mapbox/streets-v9',
    // pitch: 60,
    // bearing: -60,
    zoom: 10
  };

  var leaflet = {
    mapOpts: mapOpts,
    tilesUrl: tilesUrl
  };

  var config = {
    searchData: 'bv_searchData',
    sendDataTo: 'bv_sendDataTo',
    personalInfo: 'bv_personalInfo',
    url: url,
    subCheckUrl: subCheckUrl,
    landingUrl: landingUrl,
    subscribeUrl: subscribeUrl,
    blueCheckUrl: blueCheckUrl
  };

  window.bvRPL = {
    config: config,
    leaflet: leaflet,
  };

} ());
