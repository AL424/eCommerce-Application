import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectFieldProps = {
  label: string;
  options: string[];
  registerProps: UseFormRegisterReturn;
};

const Select: React.FC<SelectFieldProps> = ({
  label,
  options,
  registerProps
}) => (
  <>
    <label>{label}</label>
    <select
      name={registerProps.name}
      ref={registerProps.ref}
      onChange={registerProps.onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </>
);

export default Select;
