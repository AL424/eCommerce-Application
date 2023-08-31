import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LogOut } from './Logout';
import { Provider } from 'react-redux';
import store from '../../services/store/store';

test('renders logout', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LogOut />
      </Provider>
    </BrowserRouter>
  );
  const user = screen.getByText(/Profile/);
  expect(user).toBeInTheDocument();
});
