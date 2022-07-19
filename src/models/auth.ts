export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface IAuthUser {
  profile_id: string;
  login: string;
  firstName: string | null;
  lastName: string | null;
  dateOfLoginAttempt: string;
  countOfLoginAttempts: string;
  forceChangePassword: string;
}

export interface IAuth {
  user_cookie?: string;
}
