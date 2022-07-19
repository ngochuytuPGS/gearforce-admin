import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ICreateUserParams } from '../../../../models/user';
import { IAppState } from '../../../../redux/reducer';
import PageLayout from '../../../../helpers/Layout/withLayout';
import { fetchThunk } from '../../../common/redux/thunk';
import CreateUserForm from '../components/CreateUser/CreateUserForm';
import { API_PATHS } from '../../../../configs/api';
import LoadingScreen from '../../../common/components/LoadingScreen';
import { setMessage } from '../../redux/messageReducer';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';

interface Props {}

const CreateUserPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [loading, setLoading] = useState(false);

  const onCreateUser = useCallback(
    async (values: ICreateUserParams) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.createUser, 'post', values));

      if (json.success) {
        dispatch(setMessage({ open: true, message: 'User created successfully', severity: 'success' }));
        dispatch(push(ROUTES.userUserList));
      }

      if (json.errors) {
        dispatch(setMessage({ open: true, message: json.errors, severity: 'error' }));
      }

      setLoading(false);
    },
    [dispatch],
  );

  return (
    <>
      <CreateUserForm onCreateUser={onCreateUser} />
      {loading && <LoadingScreen />}
    </>
  );
};

export default PageLayout(CreateUserPage);
