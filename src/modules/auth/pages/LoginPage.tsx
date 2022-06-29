import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { ILoginParams } from '../../../models/auth';
import { fetchData } from '../../../utils';
import LoadingScreen from '../../common/LoadingScreen';
import LoginForm from '../components/LoginForm';

interface Props {}

const LoginPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const history = useHistory();

  const onLogin = useCallback(
    async (values: ILoginParams) => {
      setLoading(true);
      const json = await fetchData(API_PATHS.logIn, 'post', values);

      if (json?.errors) {
        setLoginErrorMessage(json.errors.email);
      } else {
        setLoginErrorMessage('');
        history.push('/pages');
      }

      setLoading(false);
    },
    [history],
  );

  return (
    <>
      <LoginForm onLogin={onLogin} loading={loading} loginErrorMessage={loginErrorMessage} />
      {loading && <LoadingScreen />}
    </>
  );
};

export default LoginPage;
