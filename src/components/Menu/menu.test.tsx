import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './Menu';

test('renders menu', () => {
  render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );
  const link = screen.getByText(/About us/);
  expect(link).toBeInTheDocument();
});
