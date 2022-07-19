import { ICreateProductValidation } from './../../../models/product';
import { emailRegex, priceRegex } from '../../../utils';
import moment from 'moment';

export const formatUnixTimestamp = (timestamp: number | string): string => {
  return moment.unix(+timestamp).format('MMM DD, YYYY, hh:mm A');
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatTimeStampToYYYYMMDD = (timeStamp: number) => {
  return moment.unix(timeStamp).format('YYYY-MM-DD');
};

export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Email is invalid';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';

  return '';
};
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};
