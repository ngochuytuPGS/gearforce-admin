import { Alert, Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from './configs/api';
import LoadingScreen from './modules/common/components/LoadingScreen';
import { fetchThunk } from './modules/common/redux/thunk';
import { setBrands } from './modules/home/redux/brandReducer';
import { setCategories } from './modules/home/redux/categoryReducer';
import { setCountries } from './modules/home/redux/countryReducer';
import { removeMessage } from './modules/home/redux/messageReducer';
import { setRoles } from './modules/home/redux/roleReducer';
import { setShippings } from './modules/home/redux/shippingReducer';
import { setVendors } from './modules/home/redux/vendorReducer';
import { IAppState } from './redux/reducer';
import Routes from './Routes';

function App() {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const { auth } = useSelector((state: IAppState) => state.profile);
  const { message } = useSelector((state: IAppState) => state.message);
  const [loading, setLoading] = useState(false);

  const getCountries = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.country, 'get'));
    if (json.success) {
      dispatch(setCountries(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  const getRoles = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.role, 'get'));
    if (json.success) {
      dispatch(setRoles(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  const getCategories = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.listCategory, 'get'));
    if (json.success) {
      dispatch(setCategories(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  const getBrands = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.listBrand, 'get'));
    if (json.success) {
      dispatch(setBrands(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  const getShippings = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.listShipping, 'get'));
    if (json.success) {
      dispatch(setShippings(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  const getVendors = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.listVendor, 'get'));
    if (json.success) {
      dispatch(setVendors(json.data));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (auth?.user_cookie) {
      getCountries();
      getRoles();
      getCategories();
      getBrands();
      getShippings();
      getVendors();
    }
  }, [auth?.user_cookie, getBrands, getCategories, getCountries, getRoles, getShippings, getVendors]);

  const onCloseSnackbar = useCallback(() => {
    dispatch(removeMessage());
  }, [dispatch]);

  return (
    <>
      <Routes />
      {loading && <LoadingScreen />}
      {message && (
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={onCloseSnackbar}
        >
          <Alert onClose={onCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>
            {message.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
