import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { IAuthState } from '../modules/auth/redux/authReducer';
import authReducer from '../modules/auth/redux/authReducer';

export interface IAppState {
  profile: IAuthState;
}

export function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    profile: authReducer,
  });
}
