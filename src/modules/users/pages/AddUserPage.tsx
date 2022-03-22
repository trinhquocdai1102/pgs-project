import React from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { getErrorMessageResponse } from '../../../utils';
import { CreateUser } from '../../../models/userProfile';
import TaxInfoForm from '../components/AddUsersForm/TaxInfoForm';
import AccessInfoForm from '../components/AddUsersForm/AccessInfoForm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import EmailPasswordForm from '../components/AddUsersForm/EmailPasswordForm';
import { setSnackbar } from '../../common/redux/snackbarReducer';

interface Props {
  isSidebarOpen: boolean;
}

const AddUserPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUser>({
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateUser) => {
    const resp = await dispatch(fetchThunk(API_PATHS.createUser, 'post', { ...data }));

    if (resp.success) {
      dispatch(replace(ROUTES.users));
      dispatch(setSnackbar({ open: true, message: 'Create user success', color: 'success' }));

      return;
    }

    getErrorMessageResponse(resp);

    dispatch(setSnackbar({ open: true, message: getErrorMessageResponse(resp), color: 'error' }));
    return;
  };

  return (
    <>
      <title>
        <FormattedMessage id="addProduct" />
      </title>
      <div
        style={{
          padding: '100px 36px 80px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <div className="add-header-title" style={{ marginBottom: '0' }}>
          <Button
            className="add-header-redirect"
            onClick={() => {
              history.push('/users');
            }}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '16px', color: '#000' }} />
          </Button>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff' }}>Create profile</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
          <EmailPasswordForm watch={watch} addUserProps={{ control: control, errors: errors }} />
          <div className="separated-space"></div>
          <AccessInfoForm addUserProps={{ control: control, errors: errors }} />
          <div className="separated-space"></div>
          <TaxInfoForm addUserProps={{ control: control, errors: errors }} />
          <div
            style={{ height: '78px', alignItems: 'center' }}
            className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
          >
            <div className="footer-bar-content" style={{ margin: '10px 0 0' }}>
              <Button variant="text" className="footer-btn footer-btn-add" disabled={!isValid} type="submit">
                Add User
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserPage;
