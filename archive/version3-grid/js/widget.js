$(document).ready(function(){
//Start JQuery Code

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