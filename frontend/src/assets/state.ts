import stateList from './states.json';
import { IState, compare } from './interface';

export function getStatesOfCountry(countryCode: string = ''): IState[] {
	if (!countryCode) return [];
	const states = stateList.filter((value) => {
		return value.countryCode === countryCode;
	});
	return states.sort(compare);
}
