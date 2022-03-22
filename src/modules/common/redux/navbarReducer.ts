import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { field } from '../../products/pages/AddProductPage';

export interface NavbarState {
  open: boolean;
  flag: boolean;
  data?: field;
}

export const setNavbar = createCustomAction('navbar/setNavbar', (data: boolean) => ({
  data,
}));

export const setFieldData = createCustomAction('layout/setFieldData', (data: field) => ({
  data,
}));

const actions = { setNavbar, setFieldData };

type Action = ActionType<typeof actions>;

export default function reducer(state: NavbarState = { open: true, flag: false }, action: Action) {
  switch (action.type) {
    case getType(setNavbar):
      return { ...state, open: action.data };
    case getType(setFieldData):
      return { ...state, data: action.data };
    default:
      return state;
  }
}
