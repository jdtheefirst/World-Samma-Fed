// ../assets/state.js

<<<<<<< HEAD
const stateList = require('./states.json');
const countriesList = require('./countries.json');
import ReactCountryFlag from 'react-country-flag';
=======
const stateList = require("./states.json");
const countriesList = require("./countries.json");
import ReactCountryFlag from "react-country-flag";
>>>>>>> master

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

<<<<<<< HEAD
function getStatesOfCountry(countryName = '') {
  if (!countryName) {
    console.log('No country name provided, returning default states.');
=======
function getStatesOfCountry(countryName = "") {
  if (!countryName) {
>>>>>>> master
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

<<<<<<< HEAD
function getCountryFlag(countryName = '') {
 const country = countriesList.find((c) => c.name === countryName);

   if (!country) {
    return '🏳️';
  }
  return  <ReactCountryFlag
                countryCode={country.isoCode}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={country.isoCode}
            />
=======
function getCountryFlag(countryName = "") {
  const country = countriesList.find((c) => c.name === countryName);

  if (!country) {
    return "🏳️";
  }
  return (
    <ReactCountryFlag
      countryCode={country.isoCode}
      svg
      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
      cdnSuffix="svg"
      title={country.isoCode}
    />
  );
>>>>>>> master
}

export { getStatesOfCountry, getCountryFlag };
