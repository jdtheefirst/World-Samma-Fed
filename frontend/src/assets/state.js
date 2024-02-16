const stateList = require('./states.json');
const countriesList = require('./countries.json');

function compare(a, b) {
   if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

function getStatesOfCountry(countryName = '') {
  
  if (!countryName) {
    console.log('No country name provided, returning default states.');
    return [];
  }

  const country = countriesList.find((c) => c.name === countryName);
  
  if (!country) {
    console.error(`Country not found for ${countryName}`);
    return [];
  }

  const states = stateList.filter((value) => {
    const stateCountryCode = value.countryCode.toUpperCase();
    const countryIsoCode = country.isoCode.toUpperCase();

    const isMatchingCountry = stateCountryCode === countryIsoCode;

    return isMatchingCountry;
  });
  
  return states.sort(compare);
}

module.exports = {
  getStatesOfCountry,
};
