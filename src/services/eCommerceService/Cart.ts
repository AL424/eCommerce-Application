import { FetchError } from 'node-fetch';
import { getApiRoot } from './ApiRoot';
import { LocalStorage } from '../localStorage/LocalStorage.service';

// обе функции создают корзину для авторизированных не авторизированных пользователей
// без endpoin me не удается привязать к customer при входе или регистрации
export const createCart = async () => {
  try {
    const response = await getApiRoot()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();

    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const createMyCart = async () => {
  try {
    const response = await getApiRoot()
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();

    const cart = response.body;

    // при анонимном сознании корзины сохраняю ее id в LS
    const customerId = cart.customerId;
    if (!customerId) LocalStorage.set('cart-id', cart.id);

    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const getMyCarts = async () => {
  try {
    const response = await getApiRoot().me().carts().get().execute();
    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const getCartById = async (cartId: string) => {
  try {
    const response = await getApiRoot()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();

    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const getMyActiveCart = async () => {
  try {
    const response = await getApiRoot().me().activeCart().get().execute();
    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const getCartByCustomerId = async (customerId: string) => {
  try {
    const response = await getApiRoot()
      .carts()
      .withCustomerId({ customerId: customerId })
      .get()
      .execute();

    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const deleteCartById = async (version: number, cartId: string) => {
  try {
    const response = await getApiRoot()
      .carts()
      .withId({ ID: cartId })
      .delete({
        queryArgs: { version }
      })
      .execute();

    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const updateCartById = async (
  version: number,
  cartId: string,
  productId: string
) => {
  try {
    const response = await getApiRoot()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              variantId: 1,
              quantity: 1
            }
          ]
        }
      })
      .execute();

    const cart = response.body;
    return cart;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};
