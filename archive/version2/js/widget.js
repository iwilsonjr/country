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
			$(".body").addClass("android");
			androidFlag = "android";			
		} else {
			androidFlag = "";
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
        $("#country").autocomplete('clear');		

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

//End JQuery Code
});


//jQM code/Autocomplete
$("html").bind("pagebeforechange", function(e) {

    var data = [];

    $(".column label").each(function( index, value ){
        data[index] = $(this).text();
    });                 

    $("#country").autocomplete({
        target: $('#suggestions'),
        source: data,
        link: '#',
        minLength: 1,
        uberSelection: true,
        uberID: 'all',
        uberText: '---  See All Regions and Countries  ---',
        callback: function(e) {
            var $a = $(e.currentTarget);
            $("#country").val($a.text());
            $("#country").autocomplete('clear');

            //Set Value
            $(".column label").each(function( index, value ){
                if ($a.text() == $(this).text()){
                    $("#" + $(this).attr("for")).prop("checked", true); //set country
                    $("#" + $(this).parents(".columns").siblings(".group-label").attr("for")).prop("checked", true); //set region                               
                }
            });   

        },                    
    }); 
});


   
