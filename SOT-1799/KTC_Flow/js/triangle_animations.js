(function($) {
  $footerWhite = $('.footer-white');
  $footerTeal = $('.footer-teal');
  $mobileFooterBlue = $('.footer-blue-triangle');

  window.addEventListener('resize', function() {
    updateBottomLeft();
    updateBottomRight();
    updateMobileTriangle();
  });

  var updateBottomLeft = function() {

    var width = $footerWhite.outerWidth(),
        totalHeight = $footerWhite.outerHeight();

    var height = width / Math.sqrt(3);
    var newPath = "0 100%, 0 " + (totalHeight - height) + "px, " + "100% 100%";
    var ratio = "0 1, 0 " + ((totalHeight - height + 70) / 1000) + ", 1 1";
    $('polygon#footer-left').attr('points', ratio);
    $footerWhite.css({"clip-path": 'url(#clip-shape3)'});
  };

  var updateBottomRight = function() {

    var width = $footerTeal.outerWidth(),
        totalHeight = $footerTeal.outerHeight(),
        height = width / Math.sqrt(3),
        newPath = "100% 100%, 0 100%, 100% " + (totalHeight - height) + "px",
        ratio = "1 1, 0 1, 1 " + ((totalHeight - height + 70) / 1000);

        $('polygon#footer-right').attr('points', ratio);
        $footerTeal.css({"clip-path": 'url(#clip-shape4)'});
  };

  var updateMobileTriangle = function() {
    var width = $mobileFooterBlue.outerWidth(),
        totalHeight = $mobileFooterBlue.outerHeight();

    var height = width / Math.sqrt(3);
    var newPath = "0 0, 0 0.2, 100% " + (height + 250) + ", 100% 0px";
    var ratio = "0,0 0 0.2, 1 " + ((height + 250) / 1000) + ",1 0";
    $('polygon#footer-blue-triangle').attr('points', ratio);
    $mobileFooterBlue.css({"clip-path": 'url(#clip-shape6)'});
  };

  var ieFix = function() {
    // IE Fixes
  	var ua = window.navigator.userAgent;
  	if (ua.indexOf('Edge') > 0  || ua.indexOf('MSIE') > 0 ||
  	window.navigator.appVersion.indexOf("rv:11.0") > 0) {
  		$('.footer-white').remove();
  		$('.footer-teal').remove();
  		$('.footer-teal-triangle').remove();
  		$('.footer-blue-triangle').remove();
  		$('#footer').css({"background": "white"});
  		$('#footer h2').css({"color": "#375271"});
  		$('#footer h4').css({"color": "#375271"});
  		$('.footer-nav').css({"color": "#375271"});
  		$('.footer-nav a').css({"color": "#375271"});
  	}
  };

  updateBottomRight();
  updateBottomLeft();
  updateMobileTriangle();
  ieFix();

}(jQuery));
