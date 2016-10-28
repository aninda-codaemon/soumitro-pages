$(function() {
	$('.nav-toggle, .mobile-nav ul li a').click(function() {
	    $('body').toggleClass('nav-open');
	});
	
	$('.dropdown-menu a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  $(e.target).parent().siblings().removeClass('active');
	  $(e.target).parents('.dropdown').find('.dropdown-toggle').children('span').html($(e.target).html())
	})
});


