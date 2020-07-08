//Updated Code
var column = document.querySelectorAll(".column label");
var country = document.getElementById("country");
var countryselector = document.querySelector(".ui-countryselector");
var selector = document.getElementById("selector");
var closeWindow = document.querySelector(".closeWindow");
var input = document.querySelectorAll("[name='destinationCountryID']"); //Opening UI

selector.addEventListener("click", function () {
  openUI();
}); //Country Selection - List

column.forEach(function (elem) {
  elem.addEventListener("click", function () {
    country.setAttribute("value", elem.innerText);
    closeUI();
  });
}); //Closing UI

closeWindow.addEventListener("click", function () {
  closeUI();
  event.preventDefault();
});

function openUI() {
  country.setAttribute("disabled", "disabled");
  selector.classList.add("openCountry");
}

function closeUI() {
  country.removeAttribute("disabled");
  selector.classList.remove("openCountry");
  countryselector.setAttribute("hidden", "hidden");
  console.log("closed");
} //jQuery Legacy
//$(document).ready(function() {
//Start JQuery Code
//Country Selection - List

/*$(".column label").on("click", function() {
    $("#country").val($(this).text());
    $(".ui-countryselector").fadeOut("300").attr("hidden", "hidden");
    $("#country").removeAttr("disabled");
    $("#selector").removeClass("openCountry");
})*/
//Closing UI

/*$(".closeWindow").on("click", function() {
    $(".ui-countryselector").fadeOut("300").attr("hidden", "hidden");
    $("#selector").removeClass("openCountry");
    $("#country").removeAttr("disabled");
    return false;
})*/
//Default Loading

/*if ($("[name='destinationCountryID']:checked").length > 0) {
    $("#country").val($("[name='destinationCountryID']:checked").siblings("label").text());
}*/
//Opening UI

/*$("#selector").on("click", function() {
    $(".ui-countryselector").fadeIn("300").removeAttr("hidden");
    $(this).addClass("openCountry");
    $("#country").attr("disabled", "disabled");

    $(".columns label").each(function(index) {
        if ($(this).text() == $("#country").val()) {

            var test = {};

            if (document.body.clientWidth > 980) {
                test = $(".columns");
            } else {
                test = $("#groups-container");
            }

            test.scrollTop(0);
            test.animate({ scrollTop: $(this).position().top }, 0);
        }
    });


});*/
//Region Selection - List

/*$(".group-label").on("click", function() {

    $("[name='destinationCountryID']").removeAttr("checked");
    $("#country").val("");

    if (document.body.clientWidth < 980) {

        regionID = $("#" + $(this).attr("for"));
        if (regionID.prop("checked")) {
            regionID.prop("checked", false);
            return false;
        }

    } else {

        thisTop = $(this).position().top;
        setTimeout(function() {
            $("#groups-container").scrollTop(thisTop);
        }, 50);
    }

});*/
//AutoComplete

/* var data = [];

    $(".quoteWidget .column label").each(function( index, value ){
        data[index] = $(this).text();           
    });

    var data2 = ["Australia","Indonesia","New Zealand","Thailand","United States of America"]; //Popular Destinations

	$("#country").autocomplete({
	    source: function(request, response) {

            if ((request.term || '').length <= 0) {
				results = $.ui.autocomplete.filter(data2, request.term); */

/* Initial - Popular */

/*$("#autoCountry").addClass("popular");           
            } else {
				results = $.ui.autocomplete.filter(data, request.term); */

/* Autocomplete - Search */

/* $("#autoCountry").removeClass("popular");
			}  	        
  	        response(results);

	    },
		autoFocus: true,
		minLength: 0,
		focus: function() {
			$(this).autocomplete("widget")
			.appendTo("#autoCountry");
		},
        response: function(event, ui) {
            if (!ui.content.length) {
                var noResult = { value:"",label:"No results found" };
                ui.content.push(noResult);
            }
        }   			
	}).focus(function(){     
		$(this).autocomplete("search");
    });*/
//End JQuery Code
//});