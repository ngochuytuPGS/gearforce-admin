import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const InputField = ({ value, name, onChange, errorMessage, ...props }: Props) => {
  return (
    <div className="mb-5">
      <input
        className="w-full h-10 px-2 border border-gray-200 focus:outline-blue-300"
        type="text"
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
