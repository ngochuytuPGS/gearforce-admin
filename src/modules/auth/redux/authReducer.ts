import Cookies from 'js-cookie';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { USER_COOKIE_KEY } from './../../../utils/constants';
import { IAuth, IAuthUser } from './../../../models/auth';

export interface IAuthState {
  auth?: IAuth;
  user?: IAuthUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (auth: IAuth) => ({
  auth,
}));

export const setUser = createCustomAction('auth/setUser', (user: IAuthUser) => ({
  user,
}));

export const logout = createCustomAction('auth/logout');

const actions = { setAuthorization, setUser, logout };

type Action = ActionType<typeof actions>;

export default function reducer(state: IAuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.auth };
    case getType(setUser):
      return { ...state, user: action.user };
    case getType(logout):
      Cookies.remove(USER_COOKIE_KEY);
      return { ...state, auth: null, user: null };
    default:
      return state;
  }
}
