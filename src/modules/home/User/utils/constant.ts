import { IAccessLevel, IMemberships, IPaymentRailsType, IStatus } from '../../../../models/user';

export const USER_PAYMENT_RAILS_TYPE_INDIVIDUAL_ID = 'individual';
export const USER_PAYMENT_RAILS_TYPE_BUSINESS_ID = 'business';

export const USER_PAYMENT_RAILS_TYPE: Array<IPaymentRailsType> = [
  {
    id: USER_PAYMENT_RAILS_TYPE_INDIVIDUAL_ID,
    name: 'Individual',
  },
  {
    id: USER_PAYMENT_RAILS_TYPE_BUSINESS_ID,
    name: 'Business',
  },
];

export const USER_CREATE_EDIT_MEMBERSHIPS_IGNORE_MEMBERSHIP_ID = '';
export const USER_CREATE_EDIT_MEMBERSHIPS_GENERAL_ID = '4';

export const USER_CREATE_EDIT_MEMBERSHIPS: Array<IMemberships> = [
  {
    id: USER_CREATE_EDIT_MEMBERSHIPS_IGNORE_MEMBERSHIP_ID,
    name: 'Ignore Membership',
  },
  {
    id: USER_CREATE_EDIT_MEMBERSHIPS_GENERAL_ID,
    name: 'General',
  },
];

export const USER_FILTER_MEMBERSHIPS: { [key: string]: Array<IMemberships> } = {
  memberships: [{ name: 'General', id: 'M_4' }],
  'Pending memberships': [{ name: 'General', id: 'P_4' }],
};

export const USER_ACCESS_LEVEL_ADMIN_ID = '100';
export const USER_ACCESS_LEVEL_VENDOR_ID = '10';

export const USER_ACCESS_LEVEL: Array<IAccessLevel> = [
  {
    id: USER_ACCESS_LEVEL_ADMIN_ID,
    name: 'Admin',
  },
  {
    id: USER_ACCESS_LEVEL_VENDOR_ID,
    name: 'Vendor',
  },
];

export const USER_STATUS: IStatus = {
  D: 'Disabled',
  E: 'Enabled',
  U: 'Unapproved vendor',
};

export const USER_ROLE_ADMINISTRATOR_KEY = 'administrator';
export const USER_ROLE_ADMINISTRATOR_ID = '1';
