export interface IUser {
  profile_id: string;
  vendor: string;
  fistName: string;
  lastName: string;
  created: string;
  last_login: string;
  access_level: string;
  vendor_id: string;
  storeName: string | null;
  product: number;
  order: {
    order_as_buyer: number;
    order_as_buyer_total: number;
  };
  wishlist: string;
}

export interface ICountry {
  active_currency: string | null;
  code: string;
  code3: string;
  country: string;
  currency_id: string;
  enabled: string;
  id: string;
  is_fraudlent: string;
}

export interface IMemberships {
  id: string;
  name: string;
}

export interface IRole {
  id: string;
  name: string;
  enabled?: string;
}

export interface IStatus {
  [key: string]: string;
}

export interface IPaymentRailsType {
  id: string;
  name: string;
}

export interface IAccessLevel {
  id: string;
  name: string;
}

export interface ICreateUserParams {
  access_level: string;
  confirm_password: string;
  email: string;
  firstName: string;
  forceChangePassword: number;
  lastName: string;
  membership_id: string;
  password: string;
  paymentRailsType: string;
  taxExempt: number;
  role?: Array<string>;
}

export interface ICreateUserValidation {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirm_password: string | null;
}

export interface IGetUserPagingParams {
  page: number;
  count: number;
}

export interface IGetUserFilterParams {
  search: string;
  memberships: Array<string>;
  types: Array<string>;
  status: Array<string>;
  country: string;
  state: string;
  address: string;
  phone: string;
  date_type: string;
  date_range: Array<string>;
}

export interface IGetUserSortParams {
  sort: string;
  order_by: 'ASC' | 'DESC' | '';
}

export interface IGetUserParams extends IGetUserPagingParams, IGetUserFilterParams, IGetUserSortParams {
  tz: number;
}

export interface IDeleteUserParams {
  params: Array<{ id: string; delete: 1 }>;
}

export interface ICreateUserParams {
  access_level: string;
  confirm_password: string;
  email: string;
  firstName: string;
  forceChangePassword: number;
  lastName: string;
  membership_id: string;
  password: string;
  paymentRailsType: string;
  taxExempt: number;
}

export interface IGetUserDetailParams {
  id: string;
}

export interface IUserDetail {
  account_roles: Array<IRole>;
  account_status: IStatus;
  info: {
    access_level: string;
    companyName: string;
    default_card_id: string;
    earning: 0;
    email: string;
    expense: string;
    firstName: string;
    first_login: string;
    forceChangePassword: string;
    income: string;
    joined: string;
    language: string;
    lastName: string;
    last_login: string;
    membership_id: string | null;
    order_as_buyer: number;
    order_as_buyer_total: number;
    paymentRailsId: string;
    paymentRailsType: string;
    pending_membership_id: string | null;
    products_total: string;
    profile_id: string;
    referer: string;
    roles: Array<string>;
    status: string;
    statusComment: string;
    taxExempt: string;
    vendor_id: string;
  };
}

export interface IUpdateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: number;
  taxExempt: number;
  id: string;
  roles: Array<string>;
  status: string;
  statusComment: string;
}

export interface IUpdateUserParams {
  params: Array<IUpdateUser>;
}

export interface IUpdateUserValidation {
  firstName: string;
  lastName: string;
  email: string;
  confirm_password: string;
}
