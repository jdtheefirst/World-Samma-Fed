import stateList from './states.json';
import { IState, compare } from './interface';
import countriesList from './countries.json';

export function getStatesOfCountry(countryName: string = ''): IState[] {
  if (!countryName) return [];

  const country = countriesList.find((c) => c.name === countryName);

  console.log('Country:', country);

  if (!country) {
    console.error(`Country not found for ${countryName}`);
    return [];
  }

  const states = stateList.filter((value) => {
    return value.countryCode === country.isoCode;
  });

  console.log('States:', states);

  return states.sort(compare);
}
