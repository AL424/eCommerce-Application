import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './Footer';

test('renders footer with correct content', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(screen.getByText('The Wonderful World ©')).toBeInTheDocument();
  expect(screen.getByText('2023')).toBeInTheDocument();

  const rsSchoolLink = screen.getByText('RS School');
  expect(rsSchoolLink).toBeInTheDocument();
  expect(rsSchoolLink).toHaveAttribute('target', '_blank');
});
