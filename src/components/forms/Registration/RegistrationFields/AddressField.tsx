import React, { useState } from 'react';
import Select, {
  Options,
  SingleValue,
  StylesConfig,
  ActionMeta,
  MultiValue
} from 'react-select';

interface AddressFieldProps {
  countryProps: React.InputHTMLAttributes<HTMLElement>;
  cityProps: React.HTMLAttributes<HTMLSelectElement>;
}
type Option = { value: string; label: string; color: string };

const AddressField: React.FC<AddressFieldProps> = ({
  countryProps,
  cityProps
}) => {
  const countryOptions: Options<Option> = [
    { value: 'by', label: 'Belarus', color: '#333' },
    { value: 'ru', label: 'Russia', color: '#333' }
  ];

  const citiesByCountry: Record<string, Options<Option>> = {
    ru: [
      {
        value: 'saint-petersburg',
        label: 'Saint-Petersburg',
        color: '#333'
      },
      { value: 'moscow', label: 'Moscow', color: '#333' },
      {
        value: 'ekaterinburg',
        label: 'Ekaterinburg',
        color: '#333'
      }
    ],
    by: [
      { value: 'minsk', label: 'Minsk', color: '#333' },
      { value: 'grodno', label: 'Grodno', color: '#333' },
      { value: 'brest', label: 'Brest', color: '#333' }
    ]
  };

  const [country, setCountry] = useState<Option | null>(null);
  const [city, setCity] = useState<Option | null>(null);

  const handleChangeCountry = (
    newValue: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (actionMeta.action === 'select-option') {
      setCountry(newValue as Option | null);
      setCity(null);
    }
  };

  const styles: StylesConfig<Option> = {
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: state.data.color
    })
  };

  return (
    <div>
      <h3>Address</h3>
      <label>Country</label>
      <Select
        className="select-menu"
        options={countryOptions}
        styles={styles}
        placeholder="Select Country"
        name="country"
        {...countryProps}
        defaultValue={country}
        value={country}
        onChange={handleChangeCountry}
      />
      <label>City</label>
      <Select
        className="select-menu"
        styles={styles}
        name="city"
        // {...cityProps}
        defaultValue={city}
        value={city}
        onChange={(newValue) => setCity(newValue as Option | null)}
        options={citiesByCountry[country?.value ?? 'by']}
        placeholder="Select City"
      />
    </div>
  );
};

export default AddressField;
