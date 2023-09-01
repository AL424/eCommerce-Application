import React from 'react';

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  disabled = false,
  onChange
}) => {
  return (
    <div className="addressSettings">
      <label>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
