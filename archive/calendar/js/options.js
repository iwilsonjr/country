// JavaScript Document

/* Initialization */
var heights = [];  
var shouldStick = false;
$(document).ready(function(){
//Start JQuery Code


	//Benefits Display
	$(".benefitsLink").on("click keypress", function(){

		$(".benefitsTable").toggleClass("openBenefits");
		$(".benefitsLink").toggleClass("openLink");
		shouldStick = !shouldStick;	
		if (shouldStick == true) {
			$('.info').addClass('stickyGroup');
		} else {
			$(".stickyGroup").trigger("sticky_kit:detach");
			$('.info').removeClass('stickyGroup');
			$('.info').removeClass('is_stuck');
		}
		
		checkSticky();

		if($(this).text().search("all") > -1) {
			$(".benefitsLink").text("View fewer benefits");
		} else {
			$(".benefitsLink").text("View all benefits");		
		};

		return false;
	});


	//Tabs
	$(".planSelector a").on("click keypress", function(){
		
		$(".plans").addClass("hide");			
		$($(this).attr("href")).removeClass("hide");

		$(".planSelector li").removeClass("selected");
		$(this).parent("li").addClass("selected");

		return false;
	});

	//Group Plans Selector
		
		$("[name='tripType']").on("click keypress", function(){
			
			if ($(this).val() == 1) {
				$('#group-1').removeClass('hide');
				$('#group-2').addClass('hide');
			} else if ($(this).val() == 2) {
				$('#group-2').removeClass('hide');
				$('#group-1').addClass('hide');
				}
			});
		

	//Select Plan - Initialize
/*
	if ($("input:radio[name='selectPlan']").is(":checked")) {
		thisSelection = $("input:radio[name='selectPlan']:checked");
		$(".plans").removeClass("selected");		
		thisSelection.parents(".plans").addClass("selected");	
		thisSelection.siblings("label").text("Selected");
		$(".extras").addClass("hide");
		$("#extras-" + thisSelection.val() + ", .buttonWell").removeClass("hide");		
		$("[type='submit']").removeAttr("disabled");			
		//alert($("input:radio[name='selectPlan']:checked").val());
	}
*/


	//Select Plan
	$("[name='selectPlan']").on("click keypress", function(){
		var id = $(this).val();
		$(".info").removeClass("selected");
		$(this).parents(".info").addClass("selected");
 		$(".plan").addClass("hide-for-small-only");
		$("#plan-" + id).removeClass("hide-for-small-only");
		$(".addons").removeClass("expand");
		$("#extras-" + id).addClass("expand"); 
		$("[type='submit']").removeAttr("disabled"); 
		$(".selectPlan label").text("Select");
		$(this).siblings("label").text("Selected");
		$(".plans").removeClass("selected");		
		$(this).parents(".plans").addClass("selected");
		
			$('html, body').animate({
				scrollTop: $(this).offset().top
			}, 1000);
		
	});

	
	
	//Luggage - Initialization
	if ($("[name^='luggage']").val() == "Yes") {
		//$(this).parent("li").addClass("selected");
		$(".expand luggageItemsContainer").removeClass("hide");
	} else {
		//$(this).parent("li").removeClass("selected");
		$(".expand luggageItemsContainer").addClass("hide");		
	}

	//Luggage
	$("[name^='luggage']").on("change", function(){
		if ($(this).val() == "yes") {
			//$(this).parent("li").addClass("selected");
			$(".expand .luggageItemsContainer").removeClass("hide");						
		} else {
			//$(this).parent("li").removeClass("selected");
			$(".expand .luggageItemsContainer").addClass("hide");			
		}
	});	


	// Sticky Sidebar

	 var w = 0;

	$(window).load(function(){
	
	   w = $(window).width();
	   checkSticky();
	
	});
	
	$(window).resize(function(){
	
	  if (w != $(window).width()){
				
	    w = $(window).width();
	    
	    	checkSticky();	
	
	  }
	
	});
	
	function checkSticky() {
	
	if (w > 767) {
		    
		    turnOnSticky();
	    } else {
		    
		    turnOffSticky();
	    }

	}
	
	function turnOnSticky() {

		$(".stickyGroup").stick_in_parent({parent: '.wrapper', offset_top: 0});

	}
	
	function turnOffSticky() {
		$(".stickyGroup").trigger("sticky_kit:detach");
	}
	
	
	var waypoints = $('.benefitsLink').waypoint({
  handler: function(direction) {
	  if (direction == 'down') {
    $(".info.stickyGroup").trigger("sticky_kit:detach");
    }
    
     if (direction == 'up') {
    $(".info.stickyGroup").stick_in_parent({parent: '.wrapper', offset_top: 0});
    }
  }
})	

//End JQuery Code
});
