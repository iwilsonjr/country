//Updated Code
var column = document.querySelectorAll(".column label");
var country = document.getElementById("country");
var countrySelector = document.querySelector(".ui-countryselector");
var selector = document.getElementById("selector");
var closeWindow = document.querySelector(".closeWindow");
var groupLabel = document.querySelectorAll(".group-label"); //Default Loading

initialSet(); //Opening UI

selector.addEventListener("click", function () {
  openUI();
}); //Closing UI

closeWindow.addEventListener("click", function () {
  closeUI();
  event.preventDefault();
}); //Country Selection - List

column.forEach(function (elem) {
  elem.addEventListener("click", function () {
    country.value = elem.innerText;
    console.log(elem.getAttribute("for"));
    document.getElementById(elem.getAttribute("for")).checked = true;
    closeUI();
  });
}); //Region Selection - List

groupLabel.forEach(function (elem) {
  elem.addEventListener("click", function () {
    if (document.body.clientWidth < 980) {
      if (elem.getAttribute("aria-expanded") === "true") {
        resetRegion();
        /*elem.previousSibling.checked = false;
        elem.previousSibling.removeAttribute("checked");
        console.log("closed");
        console.log(elem.previousSibling.getAttribute("checked"));
        console.log(elem.previousSibling.checked);*/
      } else {
        elem.setAttribute("aria-expanded", "true");
        /*console.log("opened");
        elem.previousSibling.setAttribute("checked", "checked");
        console.log(elem.previousSibling.getAttribute("checked"));
        console.log(elem.previousSibling.checked);*/
      }
    } else {
      country.value = "";

      if (document.querySelector("[name='destinationCountryID']:checked")) {
        var countrySelected = document.querySelector("[name='destinationCountryID']:checked").getAttribute("id");
        document.getElementById(countrySelected).checked = false;
      }

      resetRegion();
      elem.setAttribute("aria-expanded", "true");
    } //resetRegion();
    //elem.setAttribute("aria-expanded", "true");

  });
}); //Open UI

function openUI() {
  countrySelector.removeAttribute("hidden");
  countrySelector.setAttribute("aria-live", "polite");
  selector.setAttribute("aria-expanded", "true");
  selector.classList.add("openCountry");
} //Close UI


function closeUI() {
  country.setAttribute("disabled", "disabled");
  selector.classList.remove("openCountry");
  selector.setAttribute("aria-expanded", "false");
  countrySelector.setAttribute("hidden", "hidden");
  countrySelector.setAttribute("aria-live", "off");
  console.log("closed");
} //Region Reset


function resetRegion() {
  groupLabel.forEach(function (elem) {
    elem.setAttribute("aria-expanded", "false"); //elem.previousSibling.checked = false;
  });
} //Default Loading


function initialSet() {
  if (document.body.contains(document.querySelector("[name='destinationCountryID']:checked"))) {
    var selectedCountry = document.querySelector("[name='destinationCountryID']:checked");
    country.value = selectedCountry.nextSibling.innerText;
  }
} //jQuery Legacy
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
//# sourceMappingURL=widget.js.map
