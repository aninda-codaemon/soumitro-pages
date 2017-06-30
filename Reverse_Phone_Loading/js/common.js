(function () {

  var url = 'https://www.beenverified.com/hk/dd/teaser/phone?exporttype=jsonp';
  var subCheckUrl = 'https://www.beenverified.com/hk/dd/premium/phone/reverseteaser?exporttype=jsonp';
  var mapNum = 60352;
  var apiKey = '26a01f91e0ce4bf99a5e773b7745b649';
  var tilesUrl = 'https://ssl_tiles.cloudmade.com/' + apiKey + '/' + mapNum + '/256/{z}/{x}/{y}.png';
  var landingUrl = "https://www.beenverified.com";
  var subscribeUrl = "https://www.beenverified.com/subscribe/reverse_phone_lookup";
  var blueCheckUrl = 'https://cdn1.beenverified.com/srg/Reverse-Phone/landing/img/blueCheck_32.png';

  var mapOpts = {
    container: 'map',
    // You have to swap the order of coordinates because mapbox is dumb and uses [long, lat] order -  M.H. 06/17

    center: [-97.734375, 38.505191],
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    pitch: 50,
    bearing: -30,
    zoom: 2.25,
    interactive: false
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
