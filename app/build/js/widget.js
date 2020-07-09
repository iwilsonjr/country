//Updated Code

const column = document.querySelectorAll(".column label");
const country = document.getElementById("country");
const countrySelector = document.querySelector(".ui-countryselector");
const selector = document.getElementById("selector");
const closeWindow = document.querySelector(".closeWindow");
const groupLabel = document.querySelectorAll(".group-label");


//Opening UI
selector.addEventListener("click", () => {
    openUI();
})

//Country Selection - List
column.forEach((elem) => {
    elem.addEventListener("click", () => {
        country.setAttribute("value", elem.innerText);
        //let countrySelected = document.querySelector("[name='destinationCountryID']:checked");
        //countrySelected.checked = true;
        console.log(elem.getAttribute("for"));
        // countrySelected.setAttribute("checked", true);
        document.getElementById(elem.getAttribute("for")).checked = true;
        closeUI();
    })
});

//Default Loading
//if (countrySelected.length > 0) {
//const countrySelected. 
//country.setAttribute("value", checked.).val($("[name='destinationCountryID']:checked").siblings("label").text());
//}

//Closing UI
closeWindow.addEventListener("click", () => {
    closeUI();
    event.preventDefault();
})

function openUI() {
    countrySelector.removeAttribute("hidden");
    countrySelector.setAttribute("aria-live", "polite");
    selector.setAttribute("aria-expanded", "true");
    selector.classList.add("openCountry");
}

function closeUI() {
    country.setAttribute("disabled", "disabled");
    selector.classList.remove("openCountry");
    selector.setAttribute("aria-expanded", "false");
    countrySelector.setAttribute("hidden", "hidden");
    countrySelector.removeAttribute("aria-live");
    console.log("closed");
}

//Region Selection - List
groupLabel.forEach((elem) => {
    elem.addEventListener("click", () => {
        country.setAttribute("value", "");
        let countrySelected = document.querySelector("[name='destinationCountryID']:checked").getAttribute("id");
        document.getElementById(countrySelected).checked = false;
        //countrySelected.setAttribute("checked", false);
    })
});

//jQuery Legacy

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