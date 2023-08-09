import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  label: Path<T>;
  register: UseFormRegister<T>;
}

const Select = <T extends FieldValues>({ label, register }: SelectProps<T>) => (
  <>
    <label>{label}</label>
    <select {...register(label)} defaultValue="">
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
);

export default Select;
