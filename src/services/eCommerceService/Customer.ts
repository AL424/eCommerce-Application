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

export const singin = async (dataCustomer: CustomerSignin) => {
  try {
    const apiRoot = createApiRoot(createPasswordFlowClient(dataCustomer));
    const customer = await getMe(apiRoot);
    LocalStorage.set('customer-id', customer.id);
    return customer;
  } catch (err) {
    const error = err as FetchError;
    return error.message;
  }
};

// create user
export const singup = async (dataCust: CustomerDraft) => {
  try {
    await getApiRoot().customers().post({ body: dataCust }).execute();

    const customer = await singin({
      email: dataCust.email,
      password: dataCust.password ? dataCust.password : ''
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
