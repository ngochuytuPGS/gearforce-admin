import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { IGetUserDetailParams, IUpdateUserParams, IUserDetail } from '../../../../models/user';
import { IAppState } from '../../../../redux/reducer';
import { USER_PROFILE_ID_PARAMS } from '../../../../utils/constants';
import withLayout from '../../../../helpers/Layout/withLayout';
import LoadingScreen from '../../../common/components/LoadingScreen';
import { fetchThunk } from '../../../common/redux/thunk';
import AccountDetail from '../components/UserDetail/AccountDetail';
import { setMessage } from '../../redux/messageReducer';

type ParamType = {
  [USER_PROFILE_ID_PARAMS]: string;
};

interface Props {}

const UserDetailPage = (props: Props) => {
  const { [USER_PROFILE_ID_PARAMS]: id } = useParams<ParamType>();
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IUserDetail>();

  const getUserProfile = useCallback(
    async (values: IGetUserDetailParams) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.detailUser, 'post', values));
      setData(json.data);
      setLoading(false);
    },
    [dispatch],
  );

  const onUpdateUser = useCallback(
    async (values: IUpdateUserParams) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.editUser, 'post', values));
      if (json.success) {
        dispatch(setMessage({ open: true, message: 'Update successfully', severity: 'success' }));
      }

      if (json.errors) {
        dispatch(setMessage({ open: true, message: json.errors, severity: 'error' }));
      }

      setLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    getUserProfile({ id: id });
  }, [getUserProfile, id]);

  return (
    <>
      {data && <AccountDetail data={data} onUpdateUser={onUpdateUser} />}
      {loading && <LoadingScreen />}
    </>
  );
};

export default withLayout(UserDetailPage);
