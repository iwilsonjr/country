// JavaScript Document


$(document).ready(function(){
//Start JQuery Code

	// Placeholders - IE9
	$("input").placeholder();

	//Datepicker
	$(".dob").on("focus", function(){

		id = "#" + $(this).attr("id");
		calendarId = "#calendar_" + $(this).attr("id").slice(-1);

		$(calendarId).fadeIn("200");
		$(".datepickerHolder").removeClass("selected");
		$(this).parent().addClass("selected");			

		$(calendarId).datepicker({

			dateFormat: "dd/mm/yy",
			changeYear: true,
			changeMonth: true,
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],   
			yearRange: "-99:+0",
			altField: id,
			onSelect: function(){
				$(calendarId).fadeOut("200");
				$(".datepickerHolder").removeClass("selected");									
			}		
		});	

	});	

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, .dob") ) {
	    $('.calendarDate').fadeOut("200");
		$(".datepickerHolder").removeClass("selected");		        	    
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

		$(".stickyGroup").stick_in_parent({parent: '.wrapper', offset_top: 20});

	}
	
	function turnOffSticky() {
		$(".stickyGroup").trigger("sticky_kit:detach");
	}
	


//End JQuery Code
});
