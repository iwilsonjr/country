
$(document).ready(function(){
//Start JQuery Code

	// Placeholders - IE9
	$("input").placeholder();

// Begin Datepicker

	//Datepicker
	$("#departureDate").focus(function(){
		$("#departureDateDisplay").fadeIn("200");
		$("#returnDateDisplay").fadeOut("200");
		$(".datepickerHolder li").removeClass("selected");
		$(this).parent("li").addClass("selected");

		$("#departureDateDisplay").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate: 0,  
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
			altField: "#departureDate",
			numberOfMonths: 2,
			onSelect: function(date) {
				$("#departureDateDisplay").fadeOut("200");	
				$(".datepickerHolder li").removeClass("selected");
				$("#returnDate").parent("li").addClass("selected");			
				$("#returnDate").trigger("focus");
				$("#returnDateDisplay").datepicker("option", date);				
			}
		});

	});

	$("#returnDate").focus(function(){
		$("#returnDateDisplay").fadeIn("200");
		$("#departureDateDisplay").fadeOut("200");
		$(".datepickerHolder li").removeClass("selected");
		$(this).parent("li").addClass("selected");		

		$("#returnDateDisplay").datepicker({
			dateFormat: "dd/mm/yy",
			minDate: 0,
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
			altField: "#returnDate",
			numberOfMonths: 2,			
			onSelect: function(date) {				
				$("#returnDateDisplay").fadeOut("200");
				$(".datepickerHolder li").removeClass("selected");					
			}							
		}); 

	});	

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, #departureDate, #returnDate, .ui-datepicker-next *, .ui-datepicker-prev *") ) {
	    $(".calendarDate").fadeOut("200"); 
		$(".datepickerHolder li").removeClass("selected");	    
	  }
	});

  // Calendar Close - Keyboard
  $("#departureDate").on("keydown", function(e){

    //e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if (keyCode == "9" || keyCode == "13") {
		$("#departureDateDisplay").fadeOut("200"); 
		$('#returnDate').focus();        
    } 

  }); 	

  $("#returnDate").on("keydown", function(e){

    //e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if (keyCode == "9" || keyCode == "13") {
		//$("#departureDateDisplay").fadeOut("200"); 
		$('[data-hasqtip="2"]').focus();        
    } 

  }); 	


// End Datepicker


	/* 
		Country Selector Functionality
	----------------------------------*/

	//Country Selection - List
	$("#countryDisplay .column label").on("click", function(){

		//Build DOM elements
		test = countryBuilder($(this).text());

		if (test == true) {

			$("#countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#country").removeClass("focusLevel");  
			$(".quoteWhere").removeClass("selected");

		} else { 
			return test;
		}

	})

	//Closing UI
	$("body").on("click", function(e){

		if( !$(e.target).is("#selector, #selectRegion a, #country") ) {
			$("#countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#country").removeClass("focusLevel");
			$("#selectRegion").removeClass("selectRegion-active");	
			$(".ui-autocomplete").css("display","none");
			$(".quoteWhere").removeClass("selected");														    	 					
		}		

	})

	$('#countryDisplay').on('click', function(e) {
	    e.stopPropagation();
	});

	//Default Loading
	if ($("[name='destinationCountryID']:checked").length > 0) {
		$("#country").val($("[name='destinationCountryID']:checked").siblings("label").text());	
	}

	//FF Field Display - Autocomplete
	$("#country").on("focus keydown", function(e){

	    var keyCode = e.keyCode || e.which;

		$(this).addClass("focusLevel");
		$("#selectRegion").addClass("selectRegion-active");
		$("#countryDisplay").fadeOut("50").attr("hidden","hidden");	
		$(".quoteWhere").addClass("selected");
    	$(this).val($(this).val().trim()); /* Mobile Autocomplete Issue Fix - Added 5/16/16 */    		

	    if (keyCode == '9') {

			if ($("#country").val().length != 0) {
            	$("#country").removeClass("focusLevel"); 				
				$("#selectRegion").removeClass("selectRegion-active");	
				$(".quoteWhere").removeClass("selected");
	      		$('[data-hasqtip="1"]').focus();	
			}
	    } 		

	});
	

	$("#selectRegion a").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="1"]').focus();  
          $("#country").removeClass("focusLevel"); 	        
      	  $("#selectRegion").removeClass("selectRegion-active");  
		  $(".quoteWhere").removeClass("selected");       	         
	    } 

    });  
	

	//Popular Destinations Functionality
	$("#selectRegion a").on("click", function(){

		$("#countryDisplay").fadeIn("300").removeAttr("hidden");
		$(this).addClass("openCountry");
		$("#selectRegion").removeClass("selectRegion-active");
		$(".quoteWhere").addClass("selected");			

		return false;	  

    });

	$("#selectRegion a").on("keydown", function(e){

	    e.preventDefault(); 
	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="2"]').focus();          
	    } 

    });  


	//Region Selection - List
	$(".group-label").on("click", function(){		

		$("[name='findCountry']").prop("checked", false);

		if (document.body.clientWidth < 980) {

			regionID = $("#" + $(this).attr("for"));
			if (regionID.prop("checked")){
				regionID.prop("checked", false);
				return false;
			}
			
		} else {

			thisTop = $(this).position().top;
			setTimeout(function(){
					$("#groups-container").scrollTop(thisTop);
			}, 50);	
		}

	});

	//Autocomplete/Popular Functionality
    var data = [];
    var data2 = [];

    $("#countryDisplay .column label").each(function( index, value ){
        data[index] = $(this).text();        
    });	

    //var data2 = ["United States of America","Japan","France","Fiji","South West Pacific Cruise","England","Australia (Domestic Cruise)"]; //Popular Destinations - Hard Coded 

    $("#countryDisplay .column .pCountry").each(function( index, value ){
        data2[index] = $(this).text();        
    });	    

	$("#country").autocomplete({
	    source: function(request, response) {

            if ((request.term || '').length <= 0) {
	        	results = $.ui.autocomplete.filter(data2, request.term).sort(); /* Initial - Popular */
			   $("#autoCountry").addClass("popular");           
            } else {
	        	results = $.ui.autocomplete.filter(data, request.term).sort(); /* Autocomplete - Search */
			   $("#autoCountry").removeClass("popular");
			}  	        
  	        response(results);

	    },
		autoFocus: true,
		minLength: 0,
		open: function() {
			$(this).autocomplete("widget")
			.appendTo("#autoCountry");
			//$(".ui-autocomplete").animate({ scrollTop: 1 }, 50);			
		},
        response: function(event, ui) {
            if (!ui.content.length) {
                var noResult = { value:"",label:"No results found" };
                ui.content.push(noResult);
            }
        },
        select: function (event, ui) {
        	if (ui.item.value != "") { 
        		countryBuilder(ui.item.label);        		
        	}
			$("#selectRegion").removeClass("selectRegion-active");
			$(".quoteWhere").removeClass("selected");         	
        	return false;
        }       			
	}).focus(function(){     
		$(this).autocomplete("search");
    });	 


  // Help Close - Keyboard
  $(".help, .ajaxHelp").on("click focus", function(){ 
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");
	$("#country").removeClass("focusLevel");	
	$("#selectRegion").removeClass("selectRegion-active");
	$(".ui-autocomplete").css("display","none"); 
	$(".quoteWhere").removeClass("selected"); 
    $('.calendarDate').fadeOut("200"); 	      
    return false;
  }); 

	// Add Travellers
	$("#addTravellers").click(function(){
		$(".ageHolder").addClass("showAges");
		$(this).addClass("hide");
	});


//End JQuery Code
});

function countryBuilder(country) {

	var countryReady = true;

    $("#countryDisplay .column label").each(function( index, value ){
        if (country == $(this).text()){
			countryID = $("#" + $(this).attr("for")).val(); 
			regionID = $(this).parents(".columns").siblings("label").text();  	     		  

			//Check for duplicates
		    $("[name='destinationCountryID']").each(function( index, value ){
		        if (countryID == $(this).val()){
		        	countryReady = false;
		        }
		    });	                     
        }
    });


	if (countryReady == true) {

		$("#country-" + countryID).prop("checked", true); //set country

        $(".group-label").each(function( index, value ){
            if (regionID == $(this).text()){
                $("#" + $(this).attr("for")).prop("checked", true); //set region                    
            }
        });	      
	        
		$("#country").val(country); 	     			    
	}  

	return countryReady;
}

