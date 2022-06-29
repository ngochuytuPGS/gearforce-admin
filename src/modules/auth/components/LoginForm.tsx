import React, { useCallback, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { isValidLogin, validateLogin } from '../utils';
import InputField from './InputField';

interface Props {
  onLogin: (values: ILoginParams) => void;
  loading: boolean;
  loginErrorMessage: string;
}

const LoginForm = ({ onLogin, loading, loginErrorMessage }: Props) => {
  const [formValues, setFormValues] = useState<ILoginParams>({
    email: '',
    password: '',
  });

  const [validateLoginMessages, setValidateLoginMessages] = useState<ILoginValidation>({
    email: '',
    password: '',
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validate = validateLogin(formValues);
      setValidateLoginMessages(validate);

      if (isValidLogin(validate)) {
        onLogin(formValues);
      }
    },
    [formValues, onLogin],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [formValues],
  );

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-gray-100 flex flex-col w-1/2 min-w-[280px] max-w-[500px] p-5 border border-gray-200 border-solid"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl text-center mb-5">Login</h1>
        {loginErrorMessage && (
          <div className="bg-red-500 text-white flex justify-center items-center h-10 mb-5">{loginErrorMessage}</div>
        )}

        <InputField
          name="email"
          value={formValues.email}
          placeholder="Enter your email"
          onChange={onInputChange}
          errorMessage={validateLoginMessages.email}
        />
        <InputField
          name="password"
          value={formValues.password}
          placeholder="Enter your password"
          onChange={onInputChange}
          errorMessage={validateLoginMessages.password}
        />

        <button
          className="bg-green-600 text-white flex justify-center items-center h-10 rounded-md"
          type="submit"
          disabled={loading}
        >
          <LoginIcon />
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
