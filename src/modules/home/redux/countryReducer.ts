import { ActionType, getType, createCustomAction } from 'typesafe-actions';
import { ICountry } from '../../../models/user';

export interface ICountryState {
  countries?: Array<ICountry>;
}

export const setCountries = createCustomAction('country/setCountries', (countries: Array<ICountry>) => ({ countries }));

export const actions = { setCountries };

type Action = ActionType<typeof actions>;

export default function reducer(state: ICountryState = {}, action: Action) {
  switch (action.type) {
    case getType(setCountries):
      return { ...state, countries: action.countries };
    default:
      return state;
  }
}
