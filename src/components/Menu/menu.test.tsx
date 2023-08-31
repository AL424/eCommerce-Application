import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './Menu';
import { Provider } from 'react-redux';
import store from '../../services/store/store';

test('renders menu', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Menu />
      </Provider>
    </BrowserRouter>
  );
  const link = screen.getByText(/About us/);
  expect(link).toBeInTheDocument();
});
