const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const country_code = urlParams.get("countryCode");
// let data;
getCountry(country_code);
async function getCountry(value) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${value}`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  convertedData = data[0];
  loadContent(convertedData);
}

function loadContent(countryObj) {
  // create a new country object
  const newCountry = new Country(
    countryObj.name.common,
    countryObj.population,
    countryObj.region,
    countryObj.capital,
    countryObj.ccn3
  );
  // add flag
  const imageTag = document.getElementById("image");
  imageTag.src = countryObj.flags.png;

  // add name
  const country_name = document.getElementById("country-name");
  country_name.textContent = newCountry.getName();

  // population
  const country_population = document.getElementById("population");
  country_population.textContent = newCountry.getPopulation();

  // region
  const country_region = document.getElementById("country-region");
  country_region.textContent = newCountry.getRegion();

  // Capital
  const country_capital = document.getElementById("captital");
  country_capital.textContent = newCountry.getCapital();

  if (countryObj.borders) {
    getBorders(countryObj.borders);
  } else {
    getBorders(["N/A"]);
  }
  // check subregion

  if (countryObj.subregion) {
    getSubRegion(countryObj.subregion);
  } else {
    getSubRegion("N/A");
  }

  // check language
  if (countryObj.languages) {
    getLanguage(countryObj.languages);
  } else {
    getLanguage({ language: "N/A" });
  }

  // check domain

  // check language
  if (countryObj.tld) {
    getDomain(countryObj.tld);
  } else {
    getDomain(["N/A"]);
  }

  // check language
  if (countryObj.name.nativeName) {
    getNativeName(countryObj.name.nativeName);
  } else {
    getNativeName({ name: "N/A" });
  }

  getCurrencie(countryObj.currencies);
}

function getBorders(arr) {
  const borderParentElement = document.querySelector(".borders-section");
  const buttonCreated = document.querySelectorAll(".border-added");

  let newBorder = Array.from(buttonCreated);
  if (newBorder.length == 0) {
    // loop through thte array and return the borders
    arr.forEach((border) => {
      const borderButton = document.createElement("button");
      borderButton.classList.add("border-added");
      borderButton.setAttribute("id", border);
      borderButton.textContent = border;
      borderParentElement.appendChild(borderButton);
    });
  } else {
    // empty arr of the current borders
    newBorder = [];
    // loop through the current country borders and add it to the arr
    arr.forEach((border) => {
      newBorder.push(border);
      // remove the old country border from the page
      buttonCreated.forEach((element) => {
        element.remove();
      });
    });

    // add the current country border click to the page
    newBorder.forEach((newCountryBorder) => {
      const borderButton = document.createElement("button");
      borderButton.classList.add("border-added");
      borderButton.setAttribute("id", newCountryBorder);
      borderButton.textContent = newCountryBorder;
      borderParentElement.appendChild(borderButton);
    });
  }
  getButton();
}

function getButton() {
  const buttonGroup = document.querySelector(".borders-section");
  buttonGroup.addEventListener("click", function (buttonClick) {
    const currentButton = buttonClick.target;
    const id = currentButton.id;
    console.log(id);
    if (id == "N/A") {
      return;
    } else {
      const isElement = getCountry(id);
    }
  });
}

function getNativeName(obj) {
  const getNameElement = document.getElementById("native-name");
  for (const name in obj) {
    getNameElement.textContent = obj[name].common;
  }
}

function getDomain(arr) {
  const mainDomain = document.getElementById("domain");

  mainDomain.textContent = arr[0];
}

function getSubRegion(region) {
  // sub region
  const country_sub_region = document.getElementById("sub-region");
  country_sub_region.textContent = region;
}

function getCurrencie(obj) {
  const country_currencie = document.getElementById("currencies-used");
  let currencies = "";

  for (const currencieName in obj) {
    currencies = obj[currencieName].name;
  }
  country_currencie.textContent = currencies;
}

function getLanguage(obj) {
  const country_language = document.getElementById("languages");
  const newlanguageArray = Object.keys(obj);
  let languagesUse = [];

  for (const language in obj) {
    if (newlanguageArray.length == 1) {
      country_language.textContent = `${obj[language]}`;
    } else {
      languagesUse.push(obj[language]);
      country_language.textContent = `${languagesUse.reverse()} `;
    }
  }
}
