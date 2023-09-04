import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

test('renders Input component with label and handles error', () => {
  const label = 'Username';
  const placeholder = 'Enter your username';
  const inputProps = {
    name: 'username',
    ref: () => {}
  };
  const error = {
    message: 'Username is required',
    type: 'required'
  };

  const { getByText, getByPlaceholderText } = render(
    <Input
      label={label}
      placeholder={placeholder}
      type="text"
      inputProps={inputProps}
      error={error}
    />
  );

  const labelElement = getByText(label);
  const inputElement = getByPlaceholderText(placeholder);
  const errorMessageElement = getByText(error.message);

  expect(labelElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute('type', 'text');
  expect(inputElement).toHaveAttribute('placeholder', placeholder);

  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement).toHaveTextContent(error.message);
});
