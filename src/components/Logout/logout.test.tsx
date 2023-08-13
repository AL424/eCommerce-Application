import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LogOut } from './Logout';

const userName = 'user@gmail.com';

test('renders logout', () => {
  render(
    <BrowserRouter>
      <LogOut userName={userName} />
    </BrowserRouter>
  );
  const user = screen.getByText(userName);
  expect(user).toBeInTheDocument();
});
