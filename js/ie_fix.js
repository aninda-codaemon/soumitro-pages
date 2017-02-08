$(function() {
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

  	$('#twenty-nine-plan').on("click", function(){
		localStorage.setItem('price', "twenty-nine");
	});
	$('#ninety-nine-plan').on("click", function() {
		localStorage.setItem('price', "ninety-nine");
	});
});
