import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { IAuthState } from '../modules/auth/redux/authReducer';
import brandReducer, { IBrandState } from '../modules/home/redux/brandReducer';
import categoryReducer, { ICategoryState } from '../modules/home/redux/categoryReducer';
import countryReducer, { ICountryState } from '../modules/home/redux/countryReducer';
import messageReducer, { IMessageState } from '../modules/home/redux/messageReducer';
import roleReducer, { IRoleState } from '../modules/home/redux/roleReducer';
import shippingReducer, { IShippingState } from '../modules/home/redux/shippingReducer';
import vendorReducer, { IVendorState } from '../modules/home/redux/vendorReducer';

export interface IAppState {
  profile: IAuthState;
  countries: ICountryState;
  roles: IRoleState;
  brands: IBrandState;
  categories: ICategoryState;
  shippings: IShippingState;
  vendors: IVendorState;
  message: IMessageState;
}

export function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profile: authReducer,
    countries: countryReducer,
    roles: roleReducer,
    brands: brandReducer,
    categories: categoryReducer,
    shippings: shippingReducer,
    vendors: vendorReducer,
    message: messageReducer,
  });
}
