import {
  CustomerDraft,
  CustomerSignin,
  MyCustomerChangePassword,
  MyCustomerUpdate
} from '@commercetools/platform-sdk';
import { getApiRoot } from './ApiRoot';
import { createApiRoot, createPasswordFlowClient } from './BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { LocalStorage } from '../localStorage/LocalStorage.service';
import { FetchError } from 'node-fetch';

export const getMe = async (api: ByProjectKeyRequestBuilder) => {
  const customer = await api.me().get().execute();
  return customer.body;
};

export const singin = async (data: CustomerSignin) => {
  try {
    const apiRoot = createApiRoot(createPasswordFlowClient(data));

    const cartId = LocalStorage.get('cart-id');
    const dataCustomer: CustomerSignin = {
      ...data,
      anonymousCart: cartId
        ? {
            id: cartId,
            typeId: 'cart'
          }
        : undefined
    };

    // без login или при использовании endpoin me не удается привязать анонимную корзину
    const response = await apiRoot
      .login()
      .post({ body: dataCustomer })
      .execute();

    const customer = response.body.customer;
    LocalStorage.remove('cart-id');
    LocalStorage.set('customer-id', customer.id);
    return customer;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

// create user
export const singup = async (data: CustomerDraft) => {
  try {
    const cartId = LocalStorage.get('cart-id');
    const dataCustomer: CustomerDraft = {
      ...data,
      anonymousCart: cartId
        ? {
            id: cartId,
            typeId: 'cart'
          }
        : undefined
    };

    await getApiRoot().customers().post({ body: dataCustomer }).execute();

    LocalStorage.remove('cart-id');

    const customer = await singin({
      email: dataCustomer.email,
      password: dataCustomer.password ? dataCustomer.password : ''
    });

    return customer;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const customerUpdate = async (data: MyCustomerUpdate) => {
  try {
    const response = await getApiRoot().me().post({ body: data }).execute();
    const customer = response.body;
    return customer;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

export const changePassword = async (data: MyCustomerChangePassword) => {
  try {
    const response = await getApiRoot()
      .me()
      .password()
      .post({ body: data })
      .execute();

    const email = response.body.email;

    // повторная авторизация
    LocalStorage.remove('customer-id');
    LocalStorage.remove('token-cache');

    const customer = await singin({
      email: email,
      password: data.newPassword
    });

    return customer;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};
