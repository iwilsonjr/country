//Updated Code
const column = document.querySelectorAll(".column label");
const country = document.getElementById("country");
const countrySelector = document.querySelector(".ui-countryselector");
const selector = document.getElementById("selector");
const closeWindow = document.querySelector(".closeWindow");
const groupLabel = document.querySelectorAll(".group-label");


//Default Loading
initialSet();

//Opening UI
selector.addEventListener("click", () => {
    openUI();
})

//Closing UI
closeWindow.addEventListener("click", () => {
    closeUI();
    event.preventDefault();
})

//Country Selection - List
column.forEach((elem) => {
    elem.addEventListener("click", () => {
        country.value = elem.innerText;
        console.log(elem.getAttribute("for"));
        document.getElementById(elem.getAttribute("for")).checked = true;
        closeUI();
    })
});

//Region Selection - List
groupLabel.forEach((elem) => {
    elem.addEventListener("click", () => {


        if (document.body.clientWidth < 980) {

            if (elem.getAttribute("aria-expanded") === "true") {
                resetRegion();
            } else {
                elem.setAttribute("aria-expanded", "true");
            }

        } else {

            country.value = "";
            if (document.querySelector("[name='destinationCountryID']:checked")) {
                let countrySelected = document.querySelector("[name='destinationCountryID']:checked").getAttribute("id");
                document.getElementById(countrySelected).checked = false;
            }
            resetRegion();
            elem.setAttribute("aria-expanded", "true");
        }

    })
});

//Open UI
function openUI() {
    countrySelector.removeAttribute("hidden");
    countrySelector.setAttribute("aria-live", "polite");
    selector.setAttribute("aria-expanded", "true");
    selector.classList.add("openCountry");
}

//Close UI
function closeUI() {
    country.setAttribute("disabled", "disabled");
    selector.classList.remove("openCountry");
    selector.setAttribute("aria-expanded", "false");
    countrySelector.setAttribute("hidden", "hidden");
    countrySelector.setAttribute("aria-live", "off");
    console.log("closed");
}

//Region Reset
function resetRegion() {
    groupLabel.forEach((elem) => {
        elem.setAttribute("aria-expanded", "false");
    })
}

//Default Loading
function initialSet() {
    if (document.body.contains(document.querySelector("[name='destinationCountryID']:checked"))) {
        let selectedCountry = document.querySelector("[name='destinationCountryID']:checked");
        country.value = selectedCountry.nextSibling.innerText;
    }
}