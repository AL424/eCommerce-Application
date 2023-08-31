import {
  CustomerDraft,
  CustomerSignin,
  MyCustomerUpdate
} from '@commercetools/platform-sdk';
import { getApiRoot } from './ApiRoot';
import { createApiRoot, createPasswordFlowClient } from './BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { LocalStorage } from '../localStorage/LocalStorage.service';

export const getMe = async (api: ByProjectKeyRequestBuilder) => {
  const customer = await api.me().get().execute();
  return customer.body;
};

export const singin = async (dataCustomer: CustomerSignin) => {
  try {
    await getApiRoot()
      .login()
      .post({
        body: dataCustomer
      })
      .execute();

    const apiRoot = createApiRoot(createPasswordFlowClient(dataCustomer));
    const customer = await getMe(apiRoot);
    LocalStorage.set('customer-id', customer.id);
    console.log(customer);
    return customer;
  } catch (err) {
    console.log(err);
  }
};

// create user
// Добавить функцию для выполнения входа в систему
export const singup = async (dataCust: CustomerDraft) => {
  try {
    await getApiRoot().customers().post({ body: dataCust }).execute();

    const customer = await singin({
      email: dataCust.email,
      password: dataCust.password ? dataCust.password : ''
    });

    return customer;
  } catch (err) {
    console.log(err);
  }
};

export const customerUpdate = async (data: MyCustomerUpdate) => {
  try {
    const response = await getApiRoot().me().post({ body: data }).execute();
    const customer = response.body;

    return customer;
  } catch (err) {
    console.log(err);
  }
};
