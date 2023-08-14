import React from 'react';
import { FieldError } from 'react-hook-form';

const errorMessageClass = 'error-message';
const labelClass = 'form-label';
const inputClass = 'form-input';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
  value?: string;
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
      <label className={labelClass}>{label}</label>
      <div>
        <input
          className={inputClass}
          type={type}
          placeholder={placeholder}
          {...inputProps}
        />
        <p className={errorMessageClass}>
          {error && <span>{error.message}</span>}
        </p>
      </div>
    </div>
  );
};

export default Input;
