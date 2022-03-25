import { replace } from 'connected-react-router';
import { Action } from 'redux';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FormattedMessage } from 'react-intl';
import LoginForm from '../components/LoginForm';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { setUserInfo } from '../redux/authReducer';
import { ILoginParams } from '../../../models/auth';
import { fetchThunk } from '../../common/redux/thunk';
import { getErrorMessageResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.success) {
        dispatch(setUserInfo(json.user));
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.products));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <>
      <title>
        <FormattedMessage id="login" />
      </title>
      <div
        className="container"
        style={{
          height: '80vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          boxShadow: 'none',
          background: '#fff',
        }}
      >
        <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      </div>
    </>
  );
};

export default LoginPage;
