import React, { HTMLInputTypeAttribute } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const InputField = ({ type, value, name, onChange, errorMessage, ...props }: Props) => {
  return (
    <div className="mb-5">
      <input
        className="w-full h-10 px-2 border border-gray-200 focus:outline-blue-300"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
