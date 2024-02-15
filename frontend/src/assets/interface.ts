export interface IState {
	name: string;
	isoCode: string;
	countryCode: string;
	latitude?: string | null;
	longitude?: string | null;
	getStatesOfCountry?(): IState[];
	getStateByCodeAndCountry?(): IState;
	getStateByCode?(): IState;
}
export interface Timezones {
	zoneName: string;
	gmtOffset: number;
	gmtOffsetName: string;
	abbreviation: string;
	tzName: string;
}
export interface ICountry {
	name: string;
	phonecode: string;
	isoCode: string;
	flag: string;
	currency: string;
	latitude: string;
	longitude: string;
	timezones?: Timezones[];
	getAllCountries?(): ICountry[];
	getCountryByCode?(): ICountry;
}

export const compare = (a: any, b: any) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
};