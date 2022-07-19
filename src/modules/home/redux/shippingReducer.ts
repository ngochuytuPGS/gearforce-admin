import { ActionType, getType, createCustomAction } from 'typesafe-actions';
import { IShipping } from '../../../models/product';

export interface IShippingState {
  shippings?: Array<IShipping>;
}

export const setShippings = createCustomAction('shippings/setShippings', (shippings: Array<IShipping>) => ({
  shippings,
}));

export const actions = { setShippings };

type Action = ActionType<typeof actions>;

export default function reducer(state: IShippingState = {}, action: Action) {
  switch (action.type) {
    case getType(setShippings):
      return { ...state, shippings: action.shippings };
    default:
      return state;
  }
}
