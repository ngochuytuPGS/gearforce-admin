import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import LoginPage from './modules/auth/pages/LoginPage';

interface Props {}

const Routes = (props: Props) => {
  const location = useLocation();
  return (
    <Switch location={location}>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  );
};

export default Routes;
