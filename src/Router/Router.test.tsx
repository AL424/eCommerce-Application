import userEvent from '@testing-library/user-event';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { routesConfig } from './Router';
import { Provider } from 'react-redux';
import store from '../services/store/store';

const renderWithRouter = (route = '/') => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent,
    ...render(
      <Provider store={store}>
        <RouterProvider router={createBrowserRouter(routesConfig)} />
      </Provider>
    )
  };
};

test('click registration => shows Registration page', async () => {
  const { user } = renderWithRouter();
  const registrationLinks = screen.getAllByRole('link', {
    name: 'Registration'
  });

  const firstRegistrationLink = registrationLinks[0];
  await act(() => user.click(firstRegistrationLink as HTMLAnchorElement));
  expect(firstRegistrationLink).toHaveClass('active');
});
