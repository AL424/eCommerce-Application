import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PasswordInput from './PasswordInput';

test('renders PasswordInput component with label and handles error', () => {
  const label = 'Password';
  const placeholder = 'Enter your password';
  const buttonName = 'Show';
  const inputProps = {
    name: 'password',
    ref: () => {}
  };
  const error = {
    message: 'Password is required',
    type: 'required'
  };

  const { getByText, getByPlaceholderText } = render(
    <PasswordInput
      label={label}
      placeholder={placeholder}
      inputProps={inputProps}
      error={error}
    />
  );

  const labelElement = getByText(label);
  const inputElement = getByPlaceholderText(placeholder);
  const errorMessageElement = getByText(error.message);
  const showHideButton = getByText(buttonName);

  expect(labelElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute('type', 'password');
  expect(inputElement).toHaveAttribute('placeholder', placeholder);

  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement).toHaveTextContent(error.message);

  expect(showHideButton).toBeInTheDocument();
  expect(showHideButton).toHaveTextContent('Show');

  fireEvent.click(showHideButton);
  expect(inputElement).toHaveAttribute('type', 'text');

  fireEvent.click(showHideButton);
  expect(inputElement).toHaveAttribute('type', 'password');
});
