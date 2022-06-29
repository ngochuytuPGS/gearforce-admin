export interface IUser {
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
  success: boolean;
  errors: boolean;
}
