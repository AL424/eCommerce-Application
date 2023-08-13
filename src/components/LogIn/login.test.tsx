import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LogIn } from './LogIn';

test('renders log in', () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
  const link = screen.getByText(/Registration/);
  expect(link).toBeInTheDocument();
});
