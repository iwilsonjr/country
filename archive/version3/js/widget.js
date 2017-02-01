// getMobileOS - written by Jim Bergman - PUBLIC DOMAIN - v1.00 2012-Nov-24
var mobileOS;var mobileOSver;function getMobileOS(){var e=navigator.userAgent;var t;if(e.match(/iPad/i)||e.match(/iPhone/i)){mobileOS="iOS";t=e.indexOf("OS ")}else if(e.match(/Android/i)){mobileOS="Android";t=e.indexOf("Android ")}else{mobileOS="unknown"}if(mobileOS==="iOS"&&t>-1){mobileOSver=e.substr(t+3,3).replace("_",".")}else if(mobileOS==="Android"&&t>-1){mobileOSver=e.substr(t+8,3)}else{mobileOSver="unknown"}}

//Initialization
getMobileOS();
var androidFlag = "";


$(document).ready(function(){
//Start JQuery Code

	//Android Detection
	if (mobileOS == "Android") {
		if (Number(mobileOSver.substr(0,3)) >= 4 && Number(mobileOSver.substr(0,3)) < 4.4) { //Ice Cream Sandwich (4.0.x), Jellybean (4.1-4.3.1)
			$("body").addClass("android");
			androidFlag = "android";
		}
	}

	//Country Selection - List
	$(".column label").on("click", function(){
		$("#country").val($(this).text());
		$(".ui-countryselector").fadeOut("300").attr("hidden","hidden");	
		$("#country").removeAttr("disabled");			
		$("#selector").removeClass("openCountry");
	})

	//Closing UI
	$(".closeWindow").on("click", function(){
		$(".ui-countryselector").fadeOut("300").attr("hidden","hidden");	
		$("#selector").removeClass("openCountry");	
		$("#country").removeAttr("disabled");		
		return false;	
	})

	//Default Loading
	if ($("[name='destinationCountryID']:checked").length > 0) {
		$("#country").val($("[name='destinationCountryID']:checked").siblings("label").text());	
	}

	//Opening UI
	$("#selector").on("click", function(){
		$(".ui-countryselector").fadeIn("300").removeAttr("hidden");
		$(this).addClass("openCountry");
		$("#country").attr("disabled","disabled");	

		$(".columns label").each(function( index ) {
			if ($(this).text() == $("#country").val()) {

				var test = {};

				if (document.body.clientWidth > 980) {
				 		test = $(".columns");						
					} else {														  	
					  	test = $("#groups-container");
				}

				test.scrollTop(0);
				test.animate({scrollTop: $(this).position().top}, 0);
			}
		});


	});


	//Region Selection - List
	$(".group-label").on("click", function(){		

		$("[name='destinationCountryID']").removeAttr("checked");
		$("#country").val("");

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

	//AutoComplete
	/*$(".columns label").each(function( index ) {
		$("#autoCountry").append("<option value=\"" + $(this).attr("for") + "\">" + $(this).text() + "</option>")
	});*/

    var data = [];

    $(".quoteWidget .column label").each(function( index, value ){
        data[index] = $(this).text();        
    });	

	$("#country").autocomplete({
		source: data,
		autoFocus: true,
		open: function() {
			$(this).autocomplete("widget")
			.appendTo("#autoCountry");
		},
        response: function(event, ui) {
            if (!ui.content.length) {
                var noResult = { value:"",label:"No results found" };
                ui.content.push(noResult);
            }
        }      			
	});

	/*$("#autoCountry").on("change", function(){
		$("#" + $(this).val()).prop("checked",true);
		$("#" + $(this).val()).parents(".columns").siblings("[name='regionID']").prop("checked",true);
	});*/

//End JQuery Code
});