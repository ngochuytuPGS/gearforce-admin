import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDeleteUserParams, IGetUserPagingParams, IGetUserSortParams, IUser } from '../../../../../models/user';
import Pagination from '../../../../common/components/Pagination/Pagination';
import ConfirmModal from '../../../../common/components/ConfirmModal';
import { formatUnixTimestamp } from '../../../utils/functions';
import { ROUTES } from '../../../../../configs/routes';

interface Props {
  userList: Array<IUser>;
  recordTotal: number;
  initialSortValues: IGetUserSortParams;
  initialPagingValues: IGetUserPagingParams;
  onGetUserList: (values: IGetUserPagingParams | IGetUserSortParams) => void;
  onDeleteUsers: (values: IDeleteUserParams) => void;
}

const Table = ({
  userList,
  recordTotal,
  initialSortValues,
  initialPagingValues,
  onGetUserList,
  onDeleteUsers,
}: Props) => {
  const [sortValues, setSortValues] = useState<IGetUserSortParams>(initialSortValues);
  const [pagingValues, setPagingValues] = useState<IGetUserPagingParams>(initialPagingValues);
  const [usersToRemove, setUsersToRemove] = useState<IDeleteUserParams['params']>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const firstRenderRef = useRef(true);

  //Do response recordTotal thi thoảng trả về 0 dù vẫn có kết quả nên phải chuyển qua length userList nếu recordTotal = 0
  const totalTablePage = useMemo(
    () => Math.ceil((recordTotal || userList.length) / pagingValues.count),
    [pagingValues.count, recordTotal, userList.length],
  );
  const totalTableItem = useMemo(() => recordTotal || userList.length, [recordTotal, userList.length]);

  const haveUsersToRemove = useMemo(() => !!usersToRemove.length, [usersToRemove]);

  const isAllUsersCheckedToRemove = useMemo(
    () => usersToRemove.length === userList.length,
    [userList.length, usersToRemove.length],
  );

  const onPageChange = useCallback((activePage: number) => {
    setPagingValues((prevPagingValues) => ({
      ...prevPagingValues,
      page: activePage,
    }));
  }, []);

  const onSort = (sortValue: IGetUserSortParams['sort']) => {
    setSortValues({ order_by: sortValues.order_by === 'ASC' ? 'DESC' : 'ASC', sort: sortValue });
  };

  const onToggleAllUsersToRemove = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setUsersToRemove(userList.map((user) => ({ id: user.profile_id, delete: 1 })));
      } else {
        setUsersToRemove([]);
      }
    },
    [userList],
  );

  const getSortingArrowIcon = (sortValue: IGetUserSortParams['sort']): JSX.Element | null => {
    return sortValues.sort === sortValue ? (
      sortValues.order_by === 'ASC' ? (
        <ArrowUpwardIcon className="text-base" />
      ) : (
        <ArrowDownwardIcon className="text-base" />
      )
    ) : null;
  };

  const onSelectNumberOfItemPerPage = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagingValues((pagingValues) => ({ ...pagingValues, count: +e.target.value }));
  }, []);

  const onClickRemoveUserButton = useCallback(() => {
    setIsOpenConfirmModal(true);
  }, []);

  const onCancelRemoveUserModal = useCallback(() => {
    setIsOpenConfirmModal(false);
  }, []);

  const onConfirmRemoveUserModal = useCallback(() => {
    onDeleteUsers({
      params: usersToRemove,
    });
    setIsOpenConfirmModal(false);
  }, [usersToRemove, onDeleteUsers]);

  const isUserSelectedToRemove = useCallback(
    (profileId: IUser['profile_id']): boolean => {
      return usersToRemove.some((deletedUser) => deletedUser.id === profileId);
    },
    [usersToRemove],
  );

  const onToggleRemoveUser = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      //Same for calling isUserSelectedToRemove function
      setUsersToRemove((usersToRemove) => usersToRemove.filter((deletedUser) => deletedUser.id != e.target.value));
    } else {
      setUsersToRemove((usersToRemove) => [...usersToRemove, { id: e.target.value, delete: 1 }]);
    }
  }, []);

  useEffect(() => {
    //Tránh call api first render
    if (!firstRenderRef.current) onGetUserList(pagingValues);
    else firstRenderRef.current = false;
  }, [onGetUserList, pagingValues]);

  useEffect(() => {
    //Tránh call api first render
    if (!firstRenderRef.current) onGetUserList(sortValues);
    else firstRenderRef.current = false;
  }, [onGetUserList, sortValues]);

  useEffect(() => {
    setUsersToRemove([]);
  }, [userList]);

  return (
    <>
      <div className="bg-color-primary border border-color-border mb-10 scrollbar-primary">
        <table className="whitespace-nowrap w-full [&_td]:px-5 [&_th]:px-5 [&_td]:py-3 [&_th]:py-3 [&_tr]:border-b [&_tr]:border-color-border">
          <thead>
            <tr className="text-left">
              <th className="w-[20px] pr-[20px]">
                <input
                  type="checkbox"
                  name="delete-all"
                  checked={isAllUsersCheckedToRemove}
                  onChange={onToggleAllUsersToRemove}
                />
              </th>
              <th className="cursor-pointer" onClick={() => onSort('vendor')}>
                Login/Email {getSortingArrowIcon('vendor')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('fistName')}>
                Name
                {getSortingArrowIcon('fistName')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('access_level')}>
                Access level {getSortingArrowIcon('access_level')}
              </th>
              <th>Products</th>
              <th>Orders</th>
              <th>Wishlist</th>
              <th className="cursor-pointer" onClick={() => onSort('created')}>
                Created {getSortingArrowIcon('created')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('last_login')}>
                Last Login {getSortingArrowIcon('last_login')}
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.profile_id} className={isUserSelectedToRemove(user.profile_id) ? 'brightness-50' : ''}>
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    value={user.profile_id}
                    checked={isUserSelectedToRemove(user.profile_id)}
                    id={user.profile_id}
                    onChange={onToggleRemoveUser}
                  />
                </td>
                <td>
                  <Link className="text-color-blue hover:underline" to={`${ROUTES.userUserDetail}/${user.profile_id}`}>
                    {user.vendor}
                  </Link>
                  <p>{user.storeName}</p>
                </td>
                <td>{`${user.fistName} ${user.lastName}`}</td>
                <td>{user.access_level}</td>
                <td className="text-center">{user.product}</td>
                <td className="text-center">{user.order.order_as_buyer}</td>
                <td className="text-center">{user.wishlist}</td>
                <td>{formatUnixTimestamp(user.created)}</td>
                <td>{formatUnixTimestamp(user.last_login)}</td>
                <td>
                  <label className="button-primary flex justify-center items-center" htmlFor={user.profile_id}>
                    <DeleteIcon />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex p-5">
          <div className="flex items-center mr-5">
            <Pagination
              totalPages={totalTablePage}
              className="button-paging"
              activeClassName="button-paging button-paging-active"
              onPageChange={onPageChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold">{totalTableItem}</span> items
            </p>
            <div className="flex items-center gap-2">
              <select
                className="button-paging bg-color-purple w-[60px] pl-[5px]"
                onChange={onSelectNumberOfItemPerPage}
                value={pagingValues.count}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <p>per page</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-color-primary sticky z-50 bottom-0 p-3 border border-color-border shadow-primary shadow-color-purple">
        <button
          className={`button-primary ${haveUsersToRemove ? 'bg-color-orange' : 'bg-color-orange-dark'}`}
          onClick={onClickRemoveUserButton}
          disabled={!haveUsersToRemove}
        >
          Remove user
        </button>
      </div>
      {isOpenConfirmModal && (
        <ConfirmModal
          title="Confirm Delete"
          message="Do you want to delete this user?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={onCancelRemoveUserModal}
          onConfirm={onConfirmRemoveUserModal}
        />
      )}
    </>
  );
};

export default Table;
