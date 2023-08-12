import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  inputProps,
  error
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input type={type} placeholder={placeholder} {...inputProps} />
        <p>{error && <span>{error.message}</span>}</p>
      </div>
    </div>
  );
};

export default Input;
