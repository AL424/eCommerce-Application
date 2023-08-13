import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

test('renders logout', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const title = screen.getByText(/Catalog/);
  expect(title).toBeInTheDocument();
});
