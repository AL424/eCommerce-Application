import React from 'react';
import { FieldError } from 'react-hook-form';

interface DateFieldProps {
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

const DateField: React.FC<DateFieldProps> = ({ label, inputProps, error }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input type="date" {...inputProps} />
        <p>{error && <span>{error.message}</span>}</p>
      </div>
    </div>
  );
};

export default DateField;
