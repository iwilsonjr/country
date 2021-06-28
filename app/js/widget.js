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
      } else {
        elem.setAttribute("aria-expanded", "true");
      }
    } else {
      country.value = "";

      if (document.querySelector("[name='destinationCountryID']:checked")) {
        var countrySelected = document.querySelector("[name='destinationCountryID']:checked").getAttribute("id");
        document.getElementById(countrySelected).checked = false;
      }

      resetRegion();
      elem.setAttribute("aria-expanded", "true");
    }
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
    elem.setAttribute("aria-expanded", "false");
  });
} //Default Loading


function initialSet() {
  if (document.body.contains(document.querySelector("[name='destinationCountryID']:checked"))) {
    var selectedCountry = document.querySelector("[name='destinationCountryID']:checked");
    country.value = selectedCountry.nextSibling.innerText;
  }
}
//# sourceMappingURL=widget.js.map
