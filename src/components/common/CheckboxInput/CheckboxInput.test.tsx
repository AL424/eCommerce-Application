import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckboxInput from './CheckboxInput';
import { Provider } from 'react-redux';
import store from '../../../services/store/store';

test('renders CheckboxInput component with label and handles onChange', () => {
  const label = 'Check this';
  let checked = false;
  const onChange = () => {
    checked = !checked;
  };

  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <CheckboxInput label={label} checked={checked} onChange={onChange} />
    </Provider>
  );

  const checkboxLabel = getByText(label);
  const checkbox = getByLabelText(label);

  expect(checkboxLabel).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checked).toBe(true);

  fireEvent.click(checkbox);
  expect(checked).toBe(false);
});
