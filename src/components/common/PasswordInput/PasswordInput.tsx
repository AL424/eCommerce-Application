import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

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
      <label>{label}</label>
      <div style={{ display: 'flex' }}>
        <input
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <p>{error && <span>{error.message}</span>}</p>
    </div>
  );
};

export default PasswordInput;
