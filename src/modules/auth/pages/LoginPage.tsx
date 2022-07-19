import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { USER_COOKIE_KEY } from '../../../utils/constants';
import { setAuthorization, setUser } from '../redux/authReducer';
import { IAppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { ROUTES } from '../../../configs/routes';
import { API_PATHS } from '../../../configs/api';
import { ILoginParams } from '../../../models/auth';
import LoadingScreen from '../../common/components/LoadingScreen';
import LoginForm from '../components/LoginForm';

interface Props {}

const LoginPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();

  const onLogin = useCallback(
    async (values: ILoginParams) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.logIn, 'post', values));

      setLoading(false);

      if (json?.errors) {
        setLoginErrorMessage(json.errors.email);
      } else {
        setLoginErrorMessage('');

        Cookies.set(USER_COOKIE_KEY, json.user_cookie, {
          expires: 7,
        });

        dispatch(setUser(json.user));
        dispatch(
          setAuthorization({
            user_cookie: json.user_cookie,
          }),
        );

        dispatch(replace(ROUTES.userUserList));
      }
    },
    [dispatch],
  );

  return (
    <>
      <LoginForm onLogin={onLogin} loading={loading} loginErrorMessage={loginErrorMessage} />
      {loading && <LoadingScreen />}
    </>
  );
};

export default LoginPage;
