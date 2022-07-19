import { ActionType, getType, createCustomAction } from 'typesafe-actions';
import { ICategory } from '../../../models/product';

export interface ICategoryState {
  categories?: Array<ICategory>;
}

export const setCategories = createCustomAction('categories/setCategories', (categories: Array<ICategory>) => ({
  categories,
}));

export const actions = { setCategories };

type Action = ActionType<typeof actions>;

export default function reducer(state: ICategoryState = {}, action: Action) {
  switch (action.type) {
    case getType(setCategories):
      return { ...state, categories: action.categories };
    default:
      return state;
  }
}
