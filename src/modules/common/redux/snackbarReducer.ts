import { ActionType, createCustomAction, getType } from 'typesafe-actions';

interface Snackbar {
  open: boolean;
  message: string;
  color: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export interface SnackbarState {
  snackbar: Snackbar;
}

export const setSnackbar = createCustomAction('snackbar/setSnackbar', (data: Snackbar) => ({
  data,
}));

const actions = { setSnackbar };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: SnackbarState = { snackbar: { open: false, message: '', color: 'success' } },
  action: Action,
) {
  switch (action.type) {
    case getType(setSnackbar):
      return { ...state, snackbar: action.data };
    default:
      return state;
  }
}
