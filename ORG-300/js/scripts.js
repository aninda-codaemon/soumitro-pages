$(function() {
	$('.nav-toggle, .mobile-nav ul li a').click(function() {
	    $('body').toggleClass('nav-open');
	});
	
	$('.dropdown-menu a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  $(e.target).parent().siblings().removeClass('active');
	  $(e.target).parents('.dropdown').find('.dropdown-toggle').children('span').html($(e.target).html());
	});
	
	$('#show-map').click(function() {
		$('.map').slideToggle(500).next('p').toggleClass('active');
		setTimeout(function() {
			if ($('.map').is(':visible')) {
				$('#show-map strong').text('HIDE MAP');
			} else {
				$('#show-map strong').text('SHOW MAP');
			}	
		}, 600);
			
		initMap();
		return false;
	});
});


