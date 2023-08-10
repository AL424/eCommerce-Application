import userEvent from '@testing-library/user-event';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { routesConfig } from './Router';

const renderWithRouter = (route = '/') => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent,
    ...render(<RouterProvider router={createBrowserRouter(routesConfig)} />)
  };
};

test('click log in => shows Log in page', async () => {
  const { user } = renderWithRouter();
  const postsLink = screen.getByText(/Log in/).closest('a');

  await act(() => user.click(postsLink as HTMLAnchorElement));
  expect(screen.getByText(/Login page/)).toHaveClass('login-page');
});

test('click registration => shows Registration page', async () => {
  const { user } = renderWithRouter();
  const postsLink = screen.getByText(/Registration/).closest('a');

  await act(() => user.click(postsLink as HTMLAnchorElement));
  expect(screen.getByText(/Registration page/)).toHaveClass(
    'registration-page'
  );
});
