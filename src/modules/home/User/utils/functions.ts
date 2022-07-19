import { ICreateUserValidation, IUpdateUserValidation } from '../../../../models/user';

export const validateFirstName = (firstName: string): string => {
  if (!firstName) return 'First Name is required';

  return '';
};

export const validateLastName = (lastName: string): string => {
  if (!lastName) return 'Last Name is required';

  return '';
};

export const validateCreateUser = (values: ICreateUserValidation): boolean => {
  return Object.values(values).every((value) => value === '');
};

export const validateUpdateUser = (values: IUpdateUserValidation): boolean => {
  return !values.firstName && !values.lastName && !values.email && !values.confirm_password;
};
