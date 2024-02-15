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

export const compare = (a: any, b: any) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
};