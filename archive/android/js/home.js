

$(document).ready(function(){
//Start JQuery Code

/* Country Display - Added 11/5/13 */
/*$(".group-label").on("click", function(){
	$("input[name='destinationCountryID']").prop({ checked: false });
	$("#country").val("");
})*/

$(".column label").on("click", function(){
	$("#country").val($(this).text());
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
	$(".drop-down-arrow").css("z-index","6");
	//$(".regionHelp").css("z-index","6");
	//$(".countryDisplay").removeClass("countryOpen");	
	/*$(".drop-down-arrow").css("z-index","6");	*/	
	closeDoor();	
})

$(".closeWindow").on("click", function(){
	//$(".countryDisplay").removeClass("countryOpen");	
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
	$(".drop-down-arrow").css("z-index","6");
	//$(".regionHelp").css("z-index","6");
	closeDoor();
	return false;	
})

//$("#country").on("focus", function(){
	//$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
	//$(".drop-down-arrow").css("z-index","6");
	//$(".regionHelp").css("z-index","6");	
//})

$(".drop-down-arrow").on("click", function(){
	$(".countryDisplay").fadeIn("300").removeAttr("hidden");
	$(".countryDisplay").addClass("countryOpen");	
	$(this).css("z-index","4");
	 loaded();
	//$(".regionHelp").css("z-index","4");
	//$(".hasDatepicker").css("display","none");	
	
	/*$(".columns label").each(function( index ) {
		if ($(this).text() == $("#country").val()) {

			var test = {};

			if (document.body.clientWidth > 650) { 		
					test = $(".columns");
				} else {					
				  	test = $("#groups-container");
			}

			test.scrollTop(0);
			test.animate({scrollTop: $(this).position().top}, 0);
		}
	});*/
})

$(".group-label").on("click", function(){
	
    $(".columns").removeClass("openList");  
    $(this).siblings(".columns").addClass("openList");

    thisSelection = "#" + $(this).attr("for");
    newDoor(thisSelection);
});

//End JQuery Code
});
   
       

var myScroll;

function loaded () {
    myScroll = new IScroll('#wrapper', {
        scrollbars: true,
        interactiveScrollbars: true,
        //bounce: false,
		invertWheelDirection: true           
    });
}

function newDoor(index) {	
	//alert(index);
	setTimeout(function(){
		myScroll.refresh(); 
	}, 100);
	myScroll.scrollToElement(index, 250); 
}

function closeDoor(){
	myScroll.destroy()
	myScroll = null;
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);