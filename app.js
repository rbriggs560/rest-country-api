const getMainSection = document.getElementById("countries-listed");
const selected_region = document.getElementById("region-selected");
const searchInput = document.getElementById("country-name");
let uniqueCountryNameId = "";
let uniqueRegionId = "";
let mainData;

searchInput.addEventListener("input", (e) => {
  const nameOfCountry = document.querySelectorAll(".country-name");
  const value = e.target.value.toLowerCase();
  nameOfCountry.forEach((countryName) => {
    if (countryName.textContent.toLowerCase().includes(value)) {
      countryName.parentElement.parentElement.parentElement.style.display =
        "block";
    } else {
      countryName.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
});
//Get value of current option selected
function selectedOption() {
  document
    .getElementById("region-selected")
    .addEventListener("input", getSelectedInput);
}
selectedOption();

function getSelectedInput(value) {
  let select = value.target;
  const regionSelected = document.querySelectorAll(".description-box");
  regionSelected.forEach((element) => {
    if (select.value == "All") {
      element.parentElement.parentElement.style.display = "block";
    } else if (select.value == element.dataset.uniqueParentId) {
      // Display this element parent
      element.parentElement.parentElement.style.display = "block";
    } else {
      // hide this element parent
      element.parentElement.parentElement.style.display = "none";
    }
  });
}

// fetch the api
async function countriesInfo() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  let data = await response.json();
  mainData = data;
  return mainData;
}

// display content on page
async function displayContries() {
  await countriesInfo();
  mainData.forEach((country) => {
    // create a new country object
    const newCountry = new Country(
      country.name.common,
      country.population,
      country.region,
      country.capital,
      country.ccn3
    );
    uniqueCountryNameId = newCountry.getName();
    uniqueRegionId = newCountry.getRegion();
    // Add  the user task to the page
    const main_task_element_box = document.createElement("div");
    main_task_element_box.classList.add("main-div-container");

    // create a img element to store the image of the countries
    const img_element_box = document.createElement("img");
    img_element_box.classList.add("style-image");
    img_element_box.setAttribute("id", uniqueCountryNameId + "flag-img");
    //img_element_box.classList.add("country-flag");

    // creaate a link tag
    const create_a_link_tag = document.createElement("a");
    create_a_link_tag.setAttribute("id", newCountry.uniqueId);
    create_a_link_tag.classList.add("country-link");
    create_a_link_tag.href = `moreinfor.html?countryCode=${newCountry.uniqueId}`;
    create_a_link_tag.appendChild(img_element_box);

    // Add  the user task to the page
    const description_element_box = document.createElement("div");
    create_a_link_tag.appendChild(description_element_box);
    description_element_box.classList.add("description-box");
    description_element_box.dataset.uniqueParentId = newCountry.getRegion();

    const header_element_box = document.createElement("h1");
    header_element_box.classList.add("country-name");
    header_element_box.setAttribute(
      "id",
      uniqueCountryNameId + "country-name-main"
    );

    const population_element_box = document.createElement("p");
    population_element_box.classList.add("population");
    const population_content = (population_element_box.textContent =
      "Population:");
    const population_span_box = document.createElement("span");
    population_span_box.classList.add("population-data");
    population_element_box.appendChild(population_span_box);

    population_span_box.setAttribute("id", uniqueCountryNameId + "population");

    const region_element_box = document.createElement("p");
    const region_content = (region_element_box.textContent = "Region:");
    region_element_box.classList.add("region");
    const region_span_box = document.createElement("span");
    region_span_box.classList.add("region-data");
    region_span_box.setAttribute("id", uniqueCountryNameId + "region");
    region_span_box.dataset.regionId = uniqueRegionId;
    region_element_box.appendChild(region_span_box);

    const capital_element_box = document.createElement("p");
    const capital_content = (capital_element_box.textContent = "Capital:");
    capital_element_box.classList.add("capital");
    const capital_span_box = document.createElement("span");
    capital_span_box.classList.add("capital-data");
    capital_span_box.setAttribute("id", uniqueCountryNameId + "capital");
    capital_element_box.appendChild(capital_span_box);

    description_element_box.appendChild(header_element_box);
    description_element_box.appendChild(population_element_box);
    description_element_box.appendChild(region_element_box);
    description_element_box.appendChild(capital_element_box);

    main_task_element_box.appendChild(create_a_link_tag);
    getMainSection.appendChild(main_task_element_box);
    // Add the image to the page
    const getImg = document.getElementById(uniqueCountryNameId + "flag-img");
    getImg.src = country.flags.png;

    // Add the flag
    const getCountryName = document.getElementById(
      newCountry.getName() + "country-name-main"
    );
    getCountryName.textContent = newCountry.getName();

    // Add the capital

    const getCountryCapital = document.getElementById(
      uniqueCountryNameId + "capital"
    );

    getCountryCapital.textContent = newCountry.getCapital();

    // Add the population content

    const getCountryPopulation = document.getElementById(
      uniqueCountryNameId + "population"
    );
    // Add the region content
    getCountryPopulation.textContent = newCountry.getPopulation();

    const getCountryRegion = document.getElementById(
      uniqueCountryNameId + "region"
    );
    getCountryRegion.textContent = newCountry.region;
  });
}
displayContries();
