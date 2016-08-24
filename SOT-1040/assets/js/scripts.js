$(document).ready(function(){
	$("#nav-btn").click(function(){
		$(".side-nav").addClass("open");
		$(".wrapper").addClass("nav-open");
	});

	$(".side-nav div.active i.glyphicon").click(function(){
		$(".side-nav").removeClass("open");
		$(".wrapper").removeClass("nav-open");
	});
	
	$("#search-btn img").click(function(){
		$(".side-nav").addClass("search-open");
	});

	$(".side-nav div i.glyphicon").click(function(){
		$(".side-nav").removeClass("search-open");
	});

	$("#view-more-schools").click(function(){
		$(".nearby-schools ul").toggle();
		$(".less").toggle();
		$(".additional").toggle();
	});	
});

$(window).load(function(){
    $("#header").sticky({ topSpacing: 0 });
});