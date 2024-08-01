// ../assets/state.js

const stateList = require("./states.json");
const countriesList = require("./countries.json");
import ReactCountryFlag from "react-country-flag";

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

function getStatesOfCountry(countryName = "") {
  if (!countryName) {
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
}

export { getStatesOfCountry, getCountryFlag };
