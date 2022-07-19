import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import PrivateRoute from './modules/common/components/PrivateRoute';
import { PRODUCT_DETAIL_ID_PARAMS, USER_PROFILE_ID_PARAMS } from './utils/constants';
import LoginPage from './modules/auth/pages/LoginPage';
import UserListPage from './modules/home/User/pages/UserListPage';
import CreateUserPage from './modules/home/User/pages/CreateUserPage';
import UserDetailPage from './modules/home/User/pages/UserDetailPage';
import ProductsPage from './modules/home/Catalog/pages/ProductsPage';
import CreateProductPage from './modules/home/Catalog/pages/CreateProductPage';
import ProductDetailPage from './modules/home/Catalog/pages/ProductDetailPage';

interface Props {}

const Routes = (props: Props) => {
  const location = useLocation();
  return (
    <Switch location={location}>
      <PrivateRoute path={ROUTES.userUserList} component={UserListPage} />
      <PrivateRoute path={ROUTES.userCreateUser} component={CreateUserPage} />
      <PrivateRoute path={`${ROUTES.userUserDetail}/:${USER_PROFILE_ID_PARAMS}`} component={UserDetailPage} />
      <PrivateRoute path={ROUTES.catalogProducts} component={ProductsPage} />
      <PrivateRoute path={ROUTES.catalogCreateProduct} component={CreateProductPage} />
      <PrivateRoute
        path={`${ROUTES.catalogProductDetail}/:${PRODUCT_DETAIL_ID_PARAMS}`}
        component={ProductDetailPage}
      />
      <Route path={ROUTES.login} component={LoginPage} />
      <Route path="/" component={UserListPage} />
    </Switch>
  );
};

export default Routes;
