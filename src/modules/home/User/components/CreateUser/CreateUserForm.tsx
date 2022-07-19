import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../configs/routes';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ICreateUserParams, ICreateUserValidation } from '../../../../../models/user';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../../redux/reducer';
import { ListCheckboxesGroupType } from '../../../../common/components/MultiSelectCheckboxes/types';
import MultiSelectCheckboxes from '../../../../common/components/MultiSelectCheckboxes/MultiSelectCheckboxes';
import { SelectedValuesType } from '../../../../common/components/MultiSelectCheckboxes/types';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../../utils/functions';
import {
  USER_ACCESS_LEVEL,
  USER_ACCESS_LEVEL_ADMIN_ID,
  USER_ACCESS_LEVEL_VENDOR_ID,
  USER_CREATE_EDIT_MEMBERSHIPS,
  USER_CREATE_EDIT_MEMBERSHIPS_IGNORE_MEMBERSHIP_ID,
  USER_PAYMENT_RAILS_TYPE,
  USER_PAYMENT_RAILS_TYPE_INDIVIDUAL_ID,
  USER_ROLE_ADMINISTRATOR_ID,
  USER_ROLE_ADMINISTRATOR_KEY,
} from '../../utils/constant';
import { validateCreateUser, validateFirstName, validateLastName } from '../../utils/functions';

interface Props {
  onCreateUser: (values: ICreateUserParams) => void;
}

const CreateUserForm = ({ onCreateUser }: Props) => {
  const { roles } = useSelector((state: IAppState) => state.roles);

  const [newUser, setNewUser] = useState<ICreateUserParams>({
    access_level: USER_ACCESS_LEVEL_VENDOR_ID,
    confirm_password: '',
    email: '',
    firstName: '',
    lastName: '',
    forceChangePassword: 0,
    membership_id: USER_CREATE_EDIT_MEMBERSHIPS_IGNORE_MEMBERSHIP_ID,
    password: '',
    paymentRailsType: USER_PAYMENT_RAILS_TYPE_INDIVIDUAL_ID,
    taxExempt: 0,
  });

  const [validate, setValidate] = useState<ICreateUserValidation>({
    confirm_password: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
  });

  const isValidCreateUser = useMemo(() => validateCreateUser(validate), [validate]);

  const listAdminRoleCheckboxes = useMemo((): ListCheckboxesGroupType => {
    const list: ListCheckboxesGroupType = [];

    for (const key in roles) {
      if (key === USER_ROLE_ADMINISTRATOR_KEY) {
        list.push({
          checkboxes: roles[key]?.map((role) => ({
            value: role.id,
            text: role.name,
            select: newUser.role?.includes(role.id) || false,
          })),
        });
      }
    }

    return list;
  }, [newUser.role, roles]);

  const renderPaymentRailsType = useCallback((): Array<JSX.Element> => {
    return USER_PAYMENT_RAILS_TYPE.map((paymentRailsType) => (
      <option key={paymentRailsType.id} value={paymentRailsType.id}>
        {paymentRailsType.name}
      </option>
    ));
  }, []);

  const renderMemberships = useCallback((): Array<JSX.Element> => {
    return USER_CREATE_EDIT_MEMBERSHIPS.map((membership) => (
      <option key={membership.id} value={membership.id}>
        {membership.name}
      </option>
    ));
  }, []);

  const renderAccessLevel = useCallback((): Array<JSX.Element> => {
    return USER_ACCESS_LEVEL.map((accessLevel) => (
      <option key={accessLevel.id} value={accessLevel.id}>
        {accessLevel.name}
      </option>
    ));
  }, []);

  const onFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({ ...newUser, firstName: e.target.value }));
    setValidate((validate) => ({ ...validate, firstName: validateFirstName(e.target.value) }));
  }, []);

  const onLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({ ...newUser, lastName: e.target.value }));
    setValidate((validate) => ({ ...validate, lastName: validateLastName(e.target.value) }));
  }, []);

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({ ...newUser, email: e.target.value }));
    setValidate((validate) => ({ ...validate, email: validateEmail(e.target.value) }));
  }, []);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUser((newUser) => ({ ...newUser, password: e.target.value }));
      setValidate((validate) => ({
        ...validate,
        password: validatePassword(e.target.value),
        confirm_password: validateConfirmPassword(e.target.value, newUser.confirm_password),
      }));
    },
    [newUser.confirm_password],
  );

  const onConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUser((newUser) => ({ ...newUser, confirm_password: e.target.value }));
      setValidate((validate) => ({
        ...validate,
        confirm_password: validateConfirmPassword(newUser.password, e.target.value),
      }));
    },
    [newUser.password],
  );

  const onPaymentRailsTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser((newUser) => ({ ...newUser, paymentRailsType: e.target.value }));
  }, []);

  const onAccessLevelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === USER_ACCESS_LEVEL_ADMIN_ID) {
      setNewUser((newUser) => ({
        ...newUser,
        access_level: e.target.value,
        role: [USER_ROLE_ADMINISTRATOR_ID] /* Default select administrator */,
      }));
    } else {
      setNewUser((newUser) => ({ ...newUser, access_level: e.target.value, role: [] }));
    }
  }, []);

  const onRoleChange = (value: SelectedValuesType) => {
    setNewUser({ ...newUser, role: value });
  };

  const onMembershipChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser((newUser) => ({ ...newUser, membership_id: e.target.value }));
  }, []);

  const onForceChangePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({ ...newUser, forceChangePassword: +e.target.checked }));
  }, []);

  const onTaxExemptChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({ ...newUser, taxExempt: +e.target.checked }));
  }, []);

  const onSubmit = useCallback(() => {
    onCreateUser(newUser);
  }, [newUser, onCreateUser]);

  return (
    <>
      <div>
        <div className="bg-white w-[30px] h-[30px] rounded-full mb-3">
          <Link to={ROUTES.userUserList} className="flex justify-center items-center w-full h-full">
            <KeyboardBackspaceIcon className="text-base fill-color-primary" />
          </Link>
        </div>
        <h1 className="font-medium text-3xl mb-3">Create profile</h1>
        <div>
          <div>
            <h2 className="font-medium text-xl mb-5">Email & password</h2>
            <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">First Name *</p>
                  <input
                    className="input-primary flex-1"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={onFirstNameChange}
                  />
                </div>
                {validate.firstName && <p className="text-sm text-red-600">{validate.firstName}</p>}
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Last Name *</p>
                  <input
                    className="input-primary flex-1"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={onLastNameChange}
                  />
                </div>
                {validate.lastName && <p className="text-sm text-red-600">{validate.lastName}</p>}
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Email *</p>
                  <input className="input-primary flex-1" name="email" value={newUser.email} onChange={onEmailChange} />
                </div>
                {validate.email && <p className="text-sm text-red-600">{validate.email}</p>}
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Password *</p>
                  <input
                    className="input-primary flex-1"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={onPasswordChange}
                  />
                </div>
                {validate.password && <p className="text-sm text-red-600">{validate.password}</p>}
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Confirm password *</p>
                  <input
                    className="input-primary flex-1"
                    name="confirm_password"
                    type="password"
                    value={newUser.confirm_password}
                    onChange={onConfirmPasswordChange}
                  />
                </div>
                {validate.confirm_password && <p className="text-sm text-red-600">{validate.confirm_password}</p>}
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Type</p>
                  <select
                    className="input-primary flex-1"
                    name="paymentRailsType"
                    value={newUser.paymentRailsType}
                    onChange={onPaymentRailsTypeChange}
                  >
                    {renderPaymentRailsType()}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">PaymentRails ID</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-medium text-xl mb-5">Access information</h2>
            <div className="flex flex-col max-w-[600px] pl-[5%] [&>div]:mb-6">
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Access level *</p>
                  <select
                    className="input-primary flex-1"
                    name="access_level"
                    value={newUser.access_level}
                    onChange={onAccessLevelChange}
                  >
                    {renderAccessLevel()}
                  </select>
                </div>
              </div>

              {newUser.access_level === USER_ACCESS_LEVEL_ADMIN_ID && (
                <div>
                  <div className="flex flex-wrap items-center mb-2">
                    <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Roles</p>
                    <MultiSelectCheckboxes
                      list={listAdminRoleCheckboxes}
                      placeholder="Select role(s)"
                      onSelectedValuesChanged={onRoleChange}
                    />
                  </div>
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 whitespace-nowrap mr-5 mb-2">Membership</p>
                  <select
                    className="input-primary flex-1"
                    name="membership_id"
                    value={newUser.membership_id}
                    onChange={onMembershipChange}
                  >
                    {renderMemberships()}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 mr-5 mb-2">Require to change password on next log in</p>
                  <input
                    type="checkbox"
                    name="forceChangePassword"
                    checked={!!newUser.forceChangePassword}
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
                <div className="flex flex-wrap items-center mb-2">
                  <p className="basis-1/3 mr-5 mb-2">Tax exempt</p>
                  <input type="checkbox" name="taxExempt" checked={!!newUser.taxExempt} onChange={onTaxExemptChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-color-primary sticky z-50 bottom-0 p-3 border border-color-border shadow-primary shadow-color-purple">
        <button
          className={`button-primary ${isValidCreateUser ? 'bg-color-orange' : 'bg-color-orange-dark'}`}
          disabled={!isValidCreateUser}
          onClick={onSubmit}
        >
          Create account
        </button>
      </div>
    </>
  );
};

export default CreateUserForm;
