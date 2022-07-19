import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ROUTES } from '../../../../../configs/routes';
import { IUpdateUser, IUpdateUserParams, IUpdateUserValidation, IUserDetail } from '../../../../../models/user';
import { formatUnixTimestamp, validateConfirmPassword, validateEmail } from '../../../utils/functions';
import { USER_ACCESS_LEVEL, USER_CREATE_EDIT_MEMBERSHIPS } from '../../utils/constant';
import { validateFirstName, validateLastName, validateUpdateUser } from '../../utils/functions';

interface Props {
  data: IUserDetail;
  onUpdateUser: (values: IUpdateUserParams) => void;
}

const AccountDetail = ({ data, onUpdateUser }: Props) => {
  const { account_roles, account_status, info } = data;

  const [updateUser, setUpdateUser] = useState<IUpdateUser>({
    email: info.email,
    firstName: info.firstName,
    forceChangePassword: +info.forceChangePassword,
    id: info.profile_id,
    lastName: info.lastName,
    membership_id: info.membership_id || '',
    roles: info.roles,
    status: info.status,
    statusComment: info.statusComment,
    taxExempt: +info.taxExempt,
    confirm_password: '',
    password: '',
  });

  const [validate, setValidate] = useState<IUpdateUserValidation>({
    email: '',
    firstName: '',
    lastName: '',
    confirm_password: '',
  });

  const isValidUpdateUser = useMemo(() => validateUpdateUser(validate), [validate]);

  const renderStatus = useCallback((): Array<JSX.Element> => {
    const options: Array<JSX.Element> = [];

    for (const key in account_status) {
      options.push(
        <option key={key} value={key}>
          {account_status[key]}
        </option>,
      );
    }

    return options;
  }, [account_status]);

  const renderMemberships = useCallback((): Array<JSX.Element> => {
    return USER_CREATE_EDIT_MEMBERSHIPS.map((membership) => (
      <option key={membership.id} value={membership.id}>
        {membership.name}
      </option>
    ));
  }, []);

  const onFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, firstName: e.target.value }));
    setValidate((validate) => ({ ...validate, firstName: validateFirstName(e.target.value) }));
  }, []);

  const onLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, lastName: e.target.value }));
    setValidate((validate) => ({ ...validate, lastName: validateLastName(e.target.value) }));
  }, []);

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, email: e.target.value }));
    setValidate((validate) => ({ ...validate, email: validateEmail(e.target.value) }));
  }, []);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateUser((updateUser) => ({ ...updateUser, password: e.target.value }));
      setValidate((validate) => ({
        ...validate,
        confirm_password: validateConfirmPassword(e.target.value, updateUser.confirm_password),
      }));
    },
    [updateUser.confirm_password],
  );

  const onConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateUser((updateUser) => ({ ...updateUser, confirm_password: e.target.value }));
      setValidate((validate) => ({
        ...validate,
        confirm_password: validateConfirmPassword(updateUser.password, e.target.value),
      }));
    },
    [updateUser.password],
  );

  const onAccountStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, status: e.target.value }));
  }, []);

  const onStatusCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, statusComment: e.target.value }));
  }, []);

  const onMembershipChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, membership_id: e.target.value }));
  }, []);

  const onForceChangePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, forceChangePassword: +e.target.checked }));
  }, []);

  const onTaxExemptChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser((updateUser) => ({ ...updateUser, taxExempt: +e.target.checked }));
  }, []);

  const onSubmit = useCallback(() => {
    if (isValidUpdateUser) onUpdateUser({ params: [updateUser] });
  }, [isValidUpdateUser, onUpdateUser, updateUser]);

  return (
    <div>
      <div className="bg-white w-[30px] h-[30px] rounded-full mb-3">
        <Link to={ROUTES.userUserList} className="flex justify-center items-center w-full h-full">
          <KeyboardBackspaceIcon className="text-base fill-color-primary" />
        </Link>
      </div>
      <h1 className="text-2xl mb-5">{info.email}</h1>

      <div className="border-b-[20px] border-color-primary mb-3">
        <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Orders placed as a buyer</p>
            <p className="flex-1">
              {info.order_as_buyer} (${info.order_as_buyer_total})
            </p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Vendor Income</p>
            <p className="flex-1">${info.income}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Vendor Income</p>
            <p className="flex-1">${info.income}</p>
          </div>
          <div className="flex items-center">
            <Link className="basis-1/3 text-color-blue whitespace-nowrap mr-5" to="">
              View transaction details
            </Link>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Earning balance</p>
            <p className="flex-1">${info.earning}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Products listed as vendor</p>
            <p className="flex-1">{info.products_total}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Joined</p>
            <p className="flex-1">{formatUnixTimestamp(info.joined)}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Last login</p>
            <p className="flex-1">{formatUnixTimestamp(info.last_login)}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Language</p>
            <p className="flex-1">{info.language}</p>
          </div>
          <div className="flex items-center">
            <p className="basis-1/3 whitespace-nowrap mr-5">Referer</p>
            <p className="flex-1">{info.referer}</p>
          </div>
        </div>
      </div>

      <div className="border-b-[20px] border-color-primary mb-3">
        <h2 className="font-medium text-xl mb-5">Email & password</h2>
        <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">First Name *</p>
              <input className="input-primary flex-1" value={updateUser.firstName} onChange={onFirstNameChange} />
            </div>
            {validate.firstName && <p className="text-sm text-red-600">{validate.firstName}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Last Name *</p>
              <input className="input-primary flex-1" value={updateUser.lastName} onChange={onLastNameChange} />
            </div>
            {validate.lastName && <p className="text-sm text-red-600">{validate.lastName}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Email *</p>
              <input className="input-primary flex-1" value={updateUser.email} onChange={onEmailChange} />
            </div>
            {validate.email && <p className="text-sm text-red-600">{validate.email}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Password</p>
              <input className="input-primary flex-1" value={updateUser.password} onChange={onPasswordChange} />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Confirm password</p>
              <input
                className="input-primary flex-1"
                value={updateUser.confirm_password}
                onChange={onConfirmPasswordChange}
              />
            </div>
            {validate.confirm_password && <p className="text-sm text-red-600">{validate.confirm_password}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Type</p>
              <p className="flex-1">{info.paymentRailsType}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">PaymentRails ID</p>
              <p className="flex-1">{info.paymentRailsId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-[20px] border-color-primary mb-3">
        <h2 className="font-medium text-xl mb-5">Access information</h2>
        <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Access level *</p>
              <p>{USER_ACCESS_LEVEL.find((accessLevel) => accessLevel.id === info.access_level)?.name || 'Vendor'}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Account status *</p>
              <select className="input-primary" value={updateUser.status} onChange={onAccountStatusChange}>
                {renderStatus()}
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Status comment (reason)</p>
              <textarea
                className="input-primary flex-1"
                value={updateUser.statusComment}
                onChange={onStatusCommentChange}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Membership</p>
              <select
                className="input-primary flex-1"
                value={updateUser.membership_id || ''}
                onChange={onMembershipChange}
              >
                {renderMemberships()}
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center mb-2">
              <p className="basis-1/3 whitespace-nowrap mr-5">Pending membership</p>
              <p>{info.pending_membership_id || 'None'}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center">
              <p className="basis-1/3 mr-5 mb-2">Require to change password on next log in</p>
              <input
                type="checkbox"
                checked={!!+updateUser.forceChangePassword}
                onChange={onForceChangePasswordChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-medium text-xl mb-5">Tax information</h2>
        <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
          <div>
            <div className="flex flex-wrap items-center">
              <p className="basis-1/3 mr-5 mb-2">Tax exempt</p>
              <input type="checkbox" checked={!!+updateUser.taxExempt} onChange={onTaxExemptChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-color-primary sticky z-50 bottom-0 p-3 border border-color-border shadow-primary shadow-color-purple">
        <button
          className={`button-primary ${isValidUpdateUser ? 'bg-color-orange' : 'bg-color-orange-dark'}`}
          disabled={!isValidUpdateUser}
          onClick={onSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AccountDetail;
