import { IAuth, IUser } from './../../../models/user';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface IAuthState {
  auth?: IAuth;
  user?: IUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (auth: IAuth) => ({
  auth,
}));

export const setUser = createCustomAction('auth/setUser', (user: IUser) => ({
  user,
}));

const actions = { setAuthorization, setUser };

type Action = ActionType<typeof actions>;

export default function reducer(state: IAuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.auth };
    case getType(setUser):
      return { ...state, user: action.user };
    default:
      return state;
  }
}
