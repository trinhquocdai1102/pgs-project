import React from 'react';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import Snackbar from '@mui/material/Snackbar';
import { AppState } from '../../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../redux/snackbarReducer';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

const SnackbarForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const snackbar = useSelector((state: AppState) => state.snackbar.snackbar);

  return (
    <>
      {snackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => {
            dispatch(setSnackbar({ ...snackbar, open: false }));
          }}
          key={snackbar.message}
        >
          <Alert
            onClose={() => {
              dispatch(setSnackbar({ ...snackbar, open: false }));
            }}
            color={snackbar.color}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarForm;
