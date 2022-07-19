import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import {
  IDeleteUserParams,
  IGetUserFilterParams,
  IGetUserPagingParams,
  IGetUserParams,
  IGetUserSortParams,
  IUser,
} from '../../../../models/user';
import { IAppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { setMessage } from '../../redux/messageReducer';
import { ROUTES } from '../../../../configs/routes';
import PageLayout from '../../../../helpers/Layout/withLayout';
import LoadingScreen from '../../../common/components/LoadingScreen';
import LinkButton from '../../../common/components/LinkButton';
import Filter from '../components/UserList/Filter';
import Table from '../components/UserList/Table';

interface Props {}

const INITIAL_FILTER_VALUES: IGetUserFilterParams = {
  search: '',
  memberships: [],
  types: [],
  status: [],
  country: '',
  state: '',
  address: '',
  phone: '',
  date_type: 'R',
  date_range: [],
};

const INITIAL_SORT_VALUES: IGetUserSortParams = {
  sort: '',
  order_by: '',
};

const INITIAL_PAGING_VALUES: IGetUserPagingParams = {
  page: 1,
  count: 25,
};

const UserListPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [userList, setUserList] = React.useState<IUser[]>([]);
  const [recordTotal, setRecordTotal] = React.useState(0); //Api thi thoảng trả sai recordTotal, cân nhăc sử dụng length userList
  const [loading, setLoading] = React.useState(false);

  const getUserParamsRef = useRef<IGetUserParams>({
    ...INITIAL_FILTER_VALUES,
    ...INITIAL_SORT_VALUES,
    ...INITIAL_PAGING_VALUES,
    tz: 7,
  });

  const onGetUserList = useCallback(
    async (values: IGetUserFilterParams | IGetUserPagingParams | IGetUserSortParams | IGetUserParams) => {
      getUserParamsRef.current = {
        ...getUserParamsRef.current,
        ...values,
      };

      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.listUser, 'post', getUserParamsRef.current));

      if (json.success) {
        setUserList(json.data);
        setRecordTotal(json.recordsTotal);
      }

      setLoading(false);
    },
    [dispatch],
  );

  const onDeleteUsers = useCallback(
    async (values: IDeleteUserParams) => {
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.editUser, 'post', values));

      if (json.success) {
        dispatch(setMessage({ open: true, message: 'Delete successfully', severity: 'success' }));
      } else {
        dispatch(setMessage({ open: true, message: json.data, severity: 'error' }));
      }
      await onGetUserList(getUserParamsRef.current);

      setLoading(false);
    },
    [dispatch, onGetUserList],
  );

  useEffect(() => {
    onGetUserList(getUserParamsRef.current);
  }, [onGetUserList]);

  return (
    <>
      <Filter onGetUserList={onGetUserList} initialFilterValues={INITIAL_FILTER_VALUES} />
      <LinkButton label="Add User" path={ROUTES.userCreateUser} />
      <Table
        initialSortValues={INITIAL_SORT_VALUES}
        initialPagingValues={INITIAL_PAGING_VALUES}
        userList={userList}
        recordTotal={recordTotal}
        onGetUserList={onGetUserList}
        onDeleteUsers={onDeleteUsers}
      />
      {loading && <LoadingScreen />}
    </>
  );
};

export default PageLayout(UserListPage);
