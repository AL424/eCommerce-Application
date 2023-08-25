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
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  inputProps,
  error,
  formDisabled,
  onInput,
  defaultValue
}) => {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div>
        <input
          className={inputClass}
          type={type}
          placeholder={placeholder}
          disabled={formDisabled}
          {...inputProps}
          onInput={onInput}
          defaultValue={defaultValue}
        />
        <p className={errorMessageClass}>
          {error && <span>{error.message}</span>}
        </p>
      </div>
    </div>
  );
};

export default Input;
