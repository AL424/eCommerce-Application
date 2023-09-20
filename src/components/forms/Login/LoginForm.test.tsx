import React from 'react';
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import store from '../../../services/store/store';

describe('Users test', () => {
  test('Login element: exist in the DOM', () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  test('Set logs in error', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInput = getByText('Login');
    const passwordInput = getByText('Password');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    const loginButton = getByText(/Log in/i);
    userEvent.click(loginButton);

    // Success enter
    await waitFor(() => {
      expect(queryByText('Wrong e-mail or password')).toBeNull();
    });
  });

  jest.mock('../../../services/eCommerceService/Customer', () => ({
    singin: jest
      .fn()
      .mockResolvedValue({ email: 'be@tester.ru', password: 'dsewrew!@@Q1R' })
  }));

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockCustomer = { email: 'be@tester.ru', password: 'dsewrew!@@Q1R' }; // объект типа Customer
  test('OnSubmit else block', async () => {
    const mockSingin = jest.fn().mockResolvedValue(mockCustomer);
    await mockSingin();

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Password');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'be@tester.ru' } });
      fireEvent.change(passwordInput, { target: { value: 'dsewrew!@@Q1R' } });
    });

    const loginButton = screen.getByText('Log in');
    act(() => {
      fireEvent.click(loginButton);
    });

    // singin
    await waitFor(() => expect(mockSingin).toHaveBeenCalled());

    const errorMessage = screen.queryByText(/Wrong e-mail or password/);
    expect(errorMessage).toBeNull();
  });
});
