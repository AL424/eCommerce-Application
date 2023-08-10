import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Error } from './Error';

test('renders error page', () => {
  render(
    <BrowserRouter>
      <Error />
    </BrowserRouter>
  );
  const title = screen.getByText(/404/);
  expect(title).toBeInTheDocument();
});
