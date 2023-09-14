import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BasketButton from './BasketButton';

const mockStore = configureStore([]);

describe('BasketButton Component', () => {
  it('should display total quantity if cart is not empty', () => {
    // Начальное состояние корзины
    const initialState = {
      cartData: {
        value: {
          lineItems: [
            {
              quantity: 2
            },
            {
              quantity: 1
            }
          ]
        }
      }
    };
    const store = mockStore(initialState);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BasketButton />
      </Provider>
    );

    // Span у значка корзины
    const span = getByTestId('basket-counter');

    // Проверьте, что span не отображается если в корзине нет товаров
    expect(span).toBeInTheDocument();

    // Проверьте, что общее количество отображается
    expect(getByText('3')).toBeInTheDocument();
  });

  it('should not display span with total quantity if cart is empty', () => {
    // Пустая корзина
    const initialState = {
      cartData: {
        value: {
          lineItems: []
        }
      }
    };
    const store = mockStore(initialState);

    const { getByRole } = render(
      <Provider store={store}>
        <BasketButton />
      </Provider>
    );

    // Поиск кнопки
    const basketButton = getByRole('button');

    // Проверьте, что span не отображается если в корзине нет товаров
    expect(basketButton.closest('span')).not.toBeInTheDocument();
  });
});
