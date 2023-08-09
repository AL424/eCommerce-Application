import React from 'react';
import { FieldError } from 'react-hook-form';

interface EmailFieldProps {
  label: string;
  placeholder: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

const EmailField: React.FC<EmailFieldProps> = ({
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

export default EmailField;
