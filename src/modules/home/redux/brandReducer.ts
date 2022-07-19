import { ActionType, getType, createCustomAction } from 'typesafe-actions';
import { IBrand } from '../../../models/product';

export interface IBrandState {
  brands?: Array<IBrand>;
}

export const setBrands = createCustomAction('brands/setBrands', (brands: Array<IBrand>) => ({ brands }));

export const actions = { setBrands };

type Action = ActionType<typeof actions>;

export default function reducer(state: IBrandState = {}, action: Action) {
  switch (action.type) {
    case getType(setBrands):
      return { ...state, brands: action.brands };
    default:
      return state;
  }
}
