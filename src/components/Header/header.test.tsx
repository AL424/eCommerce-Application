import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Provider } from 'react-redux';
import store from '../../services/store/store';

test('renders header', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const title = screen.getByText(/Catalog/);
  expect(title).toBeInTheDocument();
});
