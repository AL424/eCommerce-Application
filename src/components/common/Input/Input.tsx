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
  formDisabled?: boolean;
  onInput?: () => void;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  inputProps,
  error,
  formDisabled,
  id,
  onInput
}) => {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div>
        <input
          id={id}
          className={inputClass}
          type={type}
          placeholder={placeholder}
          disabled={formDisabled}
          {...inputProps}
          onInput={onInput}
        />
        <p className={errorMessageClass}>
          {error && <span>{error.message}</span>}
        </p>
      </div>
    </div>
  );
};

export default Input;
