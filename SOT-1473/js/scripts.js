$(function() {
	$('.off-canvas-nav-toggle').click(function() {
	    $('.off-canvas').removeClass('open-form').toggleClass('open');
	    return false;
	});
	$('.search-toggle').click(function() {
	    $('.off-canvas').removeClass('open').toggleClass('open-form');
	    return false;
	});
	
	$('.content-nav').affix({
      offset: {
        top: function () {
          return (this.bottom = $('.map-header').outerHeight(true) - 30);
        }
      }
    });
    
    $('.content-nav a').click(function(event) {
        target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - $('.content-nav').height() - 20
        }, 500);
        event.preventDefault();
    });
    
    $('.logo').click(function(event) {
    	$('html, body').animate({
            scrollTop: 0
        }, 500);
        event.preventDefault();
    });
});


