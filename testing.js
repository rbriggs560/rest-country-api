class Country {
  constructor(name, population, region, capital, countryCode) {
    this.name = name;
    this.population = population;
    this.region = region;
    this.capital = capital;
    this.countryCode = countryCode;
    this.uniqueId = this.countryCode;
  }

  // get population
  getPopulation() {
    return this.population.toLocaleString("en");
  }

  // get region
  getRegion() {
    return this.region;
  }
  // get name

  getName() {
    return this.name;
  }

  getCapital() {
    return this.capital;
  }
}
