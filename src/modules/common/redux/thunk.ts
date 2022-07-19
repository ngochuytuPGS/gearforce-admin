import { IAppState } from './../../../redux/reducer';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { USER_COOKIE_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
import { logout } from '../../auth/redux/authReducer';

export const fetchThunk = (
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: object | FormData,
  contentType?: string,
): ThunkAction<Promise<any>, IAppState, unknown, Action<string>> => {
  return async (dispatch) => {
    const response = await fetch(url, {
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers:
        contentType !== 'multipart/form-data'
          ? {
              Authorization: Cookies.get(USER_COOKIE_KEY) || '',
              'Content-Type': contentType || 'application/json',
            }
          : {
              Authorization: Cookies.get(USER_COOKIE_KEY) || '',
            },
    });

    if (response.status === RESPONSE_STATUS_UNAUTHORIZED) {
      dispatch(logout());
      dispatch(replace(ROUTES.login));
    }

    return response.json();
  };
};
