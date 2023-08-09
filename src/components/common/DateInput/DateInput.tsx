import React from 'react';
import { FieldError } from 'react-hook-form';

interface DateInputProps {
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: FieldError | undefined;
}

const DateInput: React.FC<DateInputProps> = ({ label, inputProps, error }) => {
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

export default DateInput;
