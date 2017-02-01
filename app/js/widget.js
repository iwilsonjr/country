// getMobileOS - written by Jim Bergman - PUBLIC DOMAIN - v1.00 2012-Nov-24
var mobileOS;var mobileOSver;function getMobileOS(){var e=navigator.userAgent;var t;if(e.match(/iPad/i)||e.match(/iPhone/i)){mobileOS="iOS";t=e.indexOf("OS ")}else if(e.match(/Android/i)){mobileOS="Android";t=e.indexOf("Android ")}else{mobileOS="unknown"}if(mobileOS==="iOS"&&t>-1){mobileOSver=e.substr(t+3,3).replace("_",".")}else if(mobileOS==="Android"&&t>-1){mobileOSver=e.substr(t+8,3)}else{mobileOSver="unknown"}}

//Initialization
getMobileOS();
var androidFlag = "";

$(document).ready(function(){
//Start JQuery Code

//Android Detection
if (mobileOS == "Android") {
	if (parseInt(mobileOSver) < 3) {
		$(".countryDisplay").addClass("android-2");	
		androidFlag = "android-2";
	} else {
		$(".countryDisplay").addClass("android");
		androidFlag = "android";			
	}
}


$(".column label").on("click", function(){
	$("#country span").empty().append($(this).text());
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
	$("#country").removeClass("openCountry");
	  //IE8 Hack
	  if (!$.support.opacity) { 
		$(".column label").removeClass("selectedCountry");	  	
	  	$(this).addClass("selectedCountry");
	  }	
	if (androidFlag == "android-2") { closeDoor(); }
})

//Closing UI
$(".closeWindow").on("click", function(){
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
	$("#country").removeClass("openCountry");	
	if (androidFlag == "android-2") { closeDoor(); }
	return false;	
})

//Default Loading
if ($("[name='destinationCountryID']:checked").length > 0) {
	$("#country span").text($("[name='destinationCountryID']:checked").siblings("label").text());	
}

//Opening UI
$("#country").on("click", function(){
	$(".countryDisplay").fadeIn("300").removeAttr("hidden");
	$(this).addClass("openCountry");
	
	if (androidFlag != "android-2") {	

		$(".columns label").each(function( index ) {
			if ($(this).text() == $("#country span").text()) {

				var test = {};

				if (document.body.clientWidth > 650) {
				 		test = $(".columns");						
					} else {														  	
					  	test = $("#groups-container");
				}

				test.scrollTop(0);
				test.animate({scrollTop: $(this).position().top}, 0);
			}
		});
	} else {

		loaded();
		if ($("[name='destinationCountryID']:checked").length == 1) {
		    thisSelection = "#" + $("[name='destinationCountryID']:checked").attr("id");
		   	newDoor(thisSelection);	
	   	}	

	}

})



	$(".group-label").on("click", function(){		

		$("[name='destinationCountryID']").removeAttr("checked");
		$("#country span").empty();

		if (androidFlag == "android-2") {
			closeDoor();
			
		    $(".columns").removeClass("openList");  
		    $(this).siblings(".columns").addClass("openList");

			loaded();
		    thisSelection = "#" + $(this).attr("for");
		    newDoor(thisSelection);

		} else {

			if (document.body.clientWidth < 650) {

				thisTop = $(this).position().top;
				setTimeout(function(){
						$("#groups-container").scrollTop(thisTop);
				}, 50);
			}

		}

	});	


  //IE8 Hack
  if (!$.support.opacity) { 
   $("#country, .countryDisplay").addClass("ie8");

	$(".group-label").on("click", function(){
	    $(".columns").removeClass("openList");  
	    $(this).siblings(".columns").addClass("openList");
	});		
  }  

//End JQuery Code
});



//Android 2.3
if (androidFlag == "android-2") {

	var myScroll;

	function loaded () {
	    myScroll = new IScroll('#wrapper', {
	        scrollbars: true,
	        interactiveScrollbars: true,
			invertWheelDirection: true           
	    });
	}

	function newDoor(index) {	
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

}



   
