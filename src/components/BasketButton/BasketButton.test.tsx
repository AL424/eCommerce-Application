import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BasketButton from './BasketButton';

const mockStore = configureStore([]);

describe('BasketButton Component', () => {
  it('should display "Basket" when withImg is false', () => {
    const initialState = {
      cartData: {
        value: {
          totalLineItemQuantity: 0
        }
      }
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <BasketButton withImg={false} />
      </Provider>
    );

    expect(getByText('Basket')).toBeInTheDocument();
  });

  it('should display the cart item count when withImg is false and cart is not empty', () => {
    const initialState = {
      cartData: {
        value: {
          totalLineItemQuantity: 3
        }
      }
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <BasketButton withImg={false} />
      </Provider>
    );

    expect(getByText('3')).toBeInTheDocument();
  });

  it('should render the cart button with image when withImg is true', () => {
    const initialState = {
      cartData: {
        value: {
          totalLineItemQuantity: 0
        }
      }
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <BasketButton withImg={true} />
      </Provider>
    );

    expect(getByTestId('basket-button-img')).toBeInTheDocument();
  });

  it('should display the cart item count when withImg is true and cart is not empty', () => {
    const initialState = {
      cartData: {
        value: {
          totalLineItemQuantity: 5
        }
      }
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <BasketButton withImg={true} />
      </Provider>
    );

    expect(getByTestId('basket-counter')).toHaveTextContent('5');
  });
});
