import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

const errorMessageClass = 'error-message';
const labelClass = 'form-label';
const inputClass = 'form-input';

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}

const buttonClass = 'button-switch';
const PasswordInput: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  inputProps,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div style={{ display: 'flex' }}>
        <input
          className={inputClass}
          placeholder={placeholder}
          autoComplete="on"
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
        />
        <button className={buttonClass} onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <p className={errorMessageClass}>
        {error && <span>{error.message}</span>}
      </p>
    </div>
  );
};

export default PasswordInput;
