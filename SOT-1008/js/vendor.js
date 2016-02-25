/* This is 3rd-party code */

/* mobile detect */

(function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|dolphin|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

/* geolocator 
   https://github.com/onury/geolocator
*/

var geolocator=function(){"use strict";function i(a,c,d){function f(a,b){d&&e.parentNode&&e.parentNode.removeChild(e),"function"==typeof a&&a(b)}var e=document.createElement("script");e.async=!0,e.readyState?e.onreadystatechange=function(){("loaded"===e.readyState||"complete"===e.readyState)&&(e.onreadystatechange=null,f(c))}:e.onload=function(){f(c)},e.onerror=function(){var d="Could not load source at "+String(a).replace(/\?.*$/,"");f(b,new Error(d))},e.src=a,document.getElementsByTagName("head")[0].appendChild(e)}function j(a){function b(){geolocator.__glcb&&delete geolocator.__glcb,google.load("maps",e,{other_params:"",callback:a})}void 0!==window.google&&void 0!==google.maps?a&&a():void 0!==window.google&&void 0!==google.loader?b():(geolocator.__glcb=b,i(d+"?callback=geolocator.__glcb"))}function k(a,b,c){var d,e,f,g=document.getElementById(a);g?(d=new google.maps.Map(g,b),e=new google.maps.Marker({position:b.center,map:d}),f=new google.maps.InfoWindow,f.setContent(c),google.maps.event.addListener(e,"click",function(){f.open(d,e)}),geolocator.location.map={canvas:g,map:d,options:b,marker:e,infoWindow:f}):geolocator.location.map=null}function l(a,b){function d(a,c){c===google.maps.GeocoderStatus.OK&&b&&b(a)}var c=new google.maps.Geocoder;c.geocode({latLng:a},d)}function m(a){if(a&&a.length>0){var b,c,d={},e=a[0].address_components;for(b=0;b<e.length;b+=1)c=e[b],c.types&&c.types.length>0&&(d[c.types[0]]=c.long_name,d[c.types[0]+"_s"]=c.short_name);geolocator.location.formattedAddress=a[0].formatted_address,geolocator.location.address={street:d.route||"",neighborhood:d.neighborhood||"",town:d.sublocality||"",city:d.locality||"",region:d.administrative_area_level_1||"",regionCode:d.administrative_area_level_1_s||"",country:d.country||"",countryCode:d.country_s||"",postalCode:d.postal_code||"",streetNumber:d.street_number||""}}}function n(b){function e(b){m(b);var e=null===geolocator.location.ipGeoSource?14:7,f={zoom:e,center:d,mapTypeId:"roadmap"};k(c,f,b[0].formatted_address),a&&a.call(null,geolocator.location)}var d=new google.maps.LatLng(b.latitude,b.longitude);l(d,e)}function o(d,e){function f(e){var f=d===!0?0:"number"==typeof d?d:-1;f>=0?geolocator.locateByIP(a,b,f,c):b&&b(e)}function g(a){geolocator.location={ipGeoSource:null,coords:a.coords,timestamp:(new Date).getTime()},n(geolocator.location.coords)}function h(a){f(a)}geolocator.location=null,navigator.geolocation?navigator.geolocation.getCurrentPosition(g,h,e):f(new Error("geolocation is not supported."))}function p(a,b){switch(a){case 0:geolocator.location={coords:{latitude:b.latitude,longitude:b.longitude},address:{city:b.city,country:b.country_name,countryCode:b.country_code,region:b.region_name,regionCode:b.region_code}};break;case 1:geolocator.location={coords:{latitude:b.geoplugin_latitude,longitude:b.geoplugin_longitude},address:{city:b.geoplugin_city,country:b.geoplugin_countryName,countryCode:b.geoplugin_countryCode,region:b.geoplugin_regionName,regionCode:b.geoplugin_region}};break;case 2:geolocator.location={coords:{latitude:b.lat,longitude:b.lon},address:{city:b.city,country:"",countryCode:b.country,region:""}}}geolocator.location&&(geolocator.location.coords.accuracy=null,geolocator.location.coords.altitude=null,geolocator.location.coords.altitudeAccuracy=null,geolocator.location.coords.heading=null,geolocator.location.coords.speed=null,geolocator.location.timestamp=(new Date).getTime(),geolocator.location.ipGeoSource=f[a],geolocator.location.ipGeoSource.data=b)}function q(a){function d(){2===h?void 0!==window.Geo&&(p(h,window.Geo),delete window.Geo,c=!0):void 0!==a&&"string"!=typeof a&&(p(h,a),c=!0),c===!0?n(geolocator.location.coords):b&&b(new Error(a||"Could not get location."))}var c=!1;geolocator.location=null,delete geolocator.__ipscb,j(d)}function r(a){void 0===a.cbParam||null===a.cbParam||""===a.cbParam?i(a.url,q,!0):i(a.url+"?"+a.cbParam+"=geolocator.__ipscb",void 0,!0)}var a,b,c,h,d="https://www.google.com/jsapi",e="3.18",f=[{url:"https://freegeoip.net/json/",cbParam:"callback"},{url:"http://www.geoplugin.net/json.gp",cbParam:"jsoncallback"},{url:"http://geoiplookup.wikimedia.org/",cbParam:""}],g=1;return{location:null,locate:function(d,e,f,g,h){function i(){o(f,g)}a=d,b=e,c=h,j(i)},locateByIP:function(d,e,i,j){h="number"!=typeof i||0>i||i>=f.length?g:i,a=d,b=e,c=j,geolocator.__ipscb=q,r(f[h])},isPositionError:function(a){return"[object PositionError]"===Object.prototype.toString.call(a)}}}();


$(document).ready(function() {

  $(".tab_content").hide();

  $(".tab_content:first").show();

  $("ul.tabs li").click(function() {

    $("ul.tabs li").removeClass("active");

    $(this).addClass("active");

    $(".tab_content").hide();

    var activeTab = $(this).attr("rel");

    $("#"+activeTab).fadeIn();



  });

  $('.show').click(function(){

        $('.cutomer_feedback ~ .cutomer_feedback').slideToggle();

      $(this).text( this.textContent=='Show More Feedback...'?'Less...':'Show More Feedback...' );

      return (false);

    });

  $('.left_details span a').click(function(){

      $(this).parent().prev().find('.hidden_text').slideToggle();

      $(this).text( this.textContent=='Read More...'?'Less...':'Read More...' );

      return (false);

    });

  $(".navbar-toggle").click(function(){

    $(".collapse").slideToggle();

  return (false);

  });

  jQuery(function() {

   jQuery.support.placeholder = false;

   test = document.createElement('input');

   if('placeholder' in test) jQuery.support.placeholder = true;

});

$(function() {

   if(!$.support.placeholder) {

      var active = document.activeElement;

      $(':text').focus(function () {

         if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {

            $(this).val('').removeClass('hasPlaceholder');

         }

      }).blur(function () {

         if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {

            $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');

         }

      });

      $(':text').blur();

      $(active).focus();

      $('form:eq(0)').submit(function () {

         $(':text.hasPlaceholder').val('');

      });

   }

});

$(window).scroll(function(){

      if ($(this).scrollTop() > 275) {

          $('.share_this').addClass('fixed');

      } else {

          $('.share_this').removeClass('fixed');

      }

  });

});