import React from 'react';
import { FieldError } from 'react-hook-form';

interface NameFieldProps {
  label: string;
  placeholder: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

const NameField: React.FC<NameFieldProps> = ({
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

export default NameField;
