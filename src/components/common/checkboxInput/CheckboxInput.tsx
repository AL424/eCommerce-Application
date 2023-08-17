import React from 'react';

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onChange
}) => {
  return (
    <div className="addressSettings">
      <input
        type="checkbox"
        id={`checkbox_${label}`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`checkbox_${label}`}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
