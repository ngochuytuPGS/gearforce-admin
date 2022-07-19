import { ActionType, getType, createCustomAction } from 'typesafe-actions';
import { IMessage } from '../../../models/message';

export interface IMessageState {
  message?: IMessage;
}

export const setMessage = createCustomAction('messages/setMessage', (message: IMessage) => ({
  message,
}));

export const removeMessage = createCustomAction('messages/deleteMessage');

export const actions = { setMessage, removeMessage };

type Action = ActionType<typeof actions>;

export default function reducer(state: IMessageState = {}, action: Action) {
  switch (action.type) {
    case getType(setMessage):
      return { ...state, message: action.message };
    case getType(removeMessage):
      return { ...state, message: {} };
    default:
      return state;
  }
}
