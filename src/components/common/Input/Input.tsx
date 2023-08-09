import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  label: string;
  placeholder: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  inputProps,
  error
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input placeholder={placeholder} {...inputProps} />
        <p>{error && <span>{error.message}</span>}</p>
      </div>
    </div>
  );
};

export default Input;
