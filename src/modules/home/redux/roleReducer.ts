import { createCustomAction, getType, ActionType } from 'typesafe-actions';
import { IRole } from './../../../models/user';

export interface IRoleState {
  roles?: { [key: string]: Array<IRole> };
}

export const setRoles = createCustomAction('role/setRoles', (roles: IRoleState['roles']) => ({ roles }));

const actions = { setRoles };

type Action = ActionType<typeof actions>;

export default function reducer(state: IRoleState = {}, action: Action) {
  switch (action.type) {
    case getType(setRoles):
      return { ...state, roles: action.roles };
    default:
      return state;
  }
}
