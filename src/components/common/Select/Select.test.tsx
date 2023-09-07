import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

test('renders Select component with label and options', () => {
  const label = 'Choose a country';
  const options = ['Minsk', 'Russia'];
  const registerProps = {
    name: 'country',
    ref: () => {},
    onChange: async () => {},
    onBlur: async () => {}
  };
  const defaultValue = 'Minsk';

  const { getByText, getByDisplayValue } = render(
    <Select
      label={label}
      options={options}
      registerProps={registerProps}
      defaultValue={defaultValue}
    />
  );

  const labelElement = getByText(label);
  const selectElement = getByDisplayValue(defaultValue);

  expect(labelElement).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
  expect(selectElement).toHaveAttribute('name', registerProps.name);

  options.forEach((option) => {
    const optionElement = getByText(option);
    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveValue(option);
  });

  expect(selectElement).toHaveValue(defaultValue);

  fireEvent.change(selectElement, { target: { value: 'Minsk' } });

  expect(selectElement).toHaveValue('Minsk');
});
