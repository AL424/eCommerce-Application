import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

test('renders logout', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const title = screen.getByText(/Footer/);
  expect(title).toBeInTheDocument();
});
