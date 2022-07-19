import { IVendor } from './../../../models/vendor';
import { ActionType, getType, createCustomAction } from 'typesafe-actions';

export interface IVendorState {
  vendors?: Array<IVendor>;
}

export const setVendors = createCustomAction('vendors/setVendors', (vendors: Array<IVendor>) => ({ vendors }));

export const actions = { setVendors };

type Action = ActionType<typeof actions>;

export default function reducer(state: IVendorState = {}, action: Action) {
  switch (action.type) {
    case getType(setVendors):
      return { ...state, vendors: action.vendors };
    default:
      return state;
  }
}
