import { ILoginParams, ILoginValidation } from './../../../models/auth';
import { emailRegex } from '../../../utils';

const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';

  if (!emailRegex.test(email)) return 'Email is invalid';

  return '';
};

const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';

  if (password.length < 6) return 'Password must be at least 6 characters';

  return '';
};

export const validateLogin = ({ email, password }: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
};

export const isValidLogin = (validation: ILoginValidation): boolean => {
  if (validation.email || validation.password) return false;
  return true;
};
