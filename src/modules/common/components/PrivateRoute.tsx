import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import { USER_COOKIE_KEY } from '../../../utils/constants';

interface Props extends RouteProps {}

const PrivateRoute = (props: Props) => {
  const auth = Cookies.get(USER_COOKIE_KEY);

  if (auth) {
    return <Route {...props} />;
  }

  return <Redirect to={ROUTES.login} />;
};

export default PrivateRoute;
