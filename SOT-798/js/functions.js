// Custom Functions   
  
  
  //Slider Range
  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 10,
      max: 90,
      values: [ 25, 70 ],
      slide: function( event, ui ) {
        $( "#age" ).val( "" + ui.values[ 0 ]);
        $( "#age2" ).val( "" + ui.values[ 1 ]);
      }
    });
    $( "#age" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) 	  );

    $( "#age2" ).val( "" + $( "#slider-range" ).slider( "values", 1 )	  );
 
	  
  });



//Scroll Bar for sidebar filters 
  $(function(){
    $('#inner-content-div').slimScroll({
        height: '400px',
		railVisible: true,
    alwaysVisible: true
    });
});


//View more and view less result
  $(document).ready(function(){
	$('.result .more').click(function() {
		  $(this).closest('.more').hide().next('.less').show().parents('.result').children().children().children('.more-options').slideDown(700).parents().addClass('expend'); 
		  return false;
	});
	$('.result .less').click(function() {
		  $(this).closest('.less').hide().prev('.more').show().parents('.result').children().children().children('.more-options').slideUp(700).parents().removeClass('expend'); 
		  return false;
	});
  });


//Show hide Search form 
$(document).ready(function(){
    $("#close").click(function(){
        $(".search-container").fadeOut(700);
    });
    $(".open").click(function(){
        $(".search-container").fadeIn(700);
    });
});


//Show hide Advance filter for mobiles
$(document).ready(function(){
    $("#advance-filter-btn").click(function(){
        $("#advance-filter").slideToggle(700);
    });
});

