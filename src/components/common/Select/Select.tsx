import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import './Select.scss';

const labelClass = 'form-label';
const selectClass = 'form-select';

type SelectFieldProps = {
  label: string;
  options: string[];
  registerProps: UseFormRegisterReturn;
  defaultValue?: string;
};

const Select: React.FC<SelectFieldProps> = ({
  label,
  options,
  registerProps,
  defaultValue
}) => (
  <>
    <label className={labelClass}>{label}</label>
    <select
      className={selectClass}
      name={registerProps.name}
      ref={registerProps.ref}
      onChange={registerProps.onChange}
      defaultValue={defaultValue}
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
