import { CustomerDraft, CustomerSignin } from '@commercetools/platform-sdk';
import {
  // ctpAnonymClient,
  createApiRoot,
  createPasswordFlowClient
} from './BuildClient';

const apiRoot = createApiRoot(
  createPasswordFlowClient('user1@test.com', 'Qwert?1234')
);
// const apiRoot = createApiRoot(ctpAnonymClient);
// Example call to return Product list
export const getProducts = () => {
  return apiRoot
    .productProjections()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(JSON.stringify(body));
    })
    .catch(console.error);
};

// singin
// Добавить функцию для выполнения входа в систему
const dataCustomer: CustomerSignin = {
  email: 'user1@test.com',
  password: 'Qwert?1234'
};

export const singin = () => {
  return apiRoot
    .login()
    .post({
      body: dataCustomer
    })
    .execute()
    .then(({ body }) => {
      console.log(JSON.stringify(body));
    })
    .catch(console.error);
};

// create user
// Добавить функцию для выполнения входа в систему
export const singup = (dataCust: CustomerDraft) => {
  apiRoot
    .customers()
    .post({ body: dataCust })
    .execute()
    .then((resp) => resp.body)
    .then((data) =>
      console.log(
        `Welcome, ${data.customer.firstName} ${data.customer.lastName}!!!`
      )
    )
    .catch(() => console.log('User not registered'));
};

export const getCustomer = () => {
  apiRoot
    .me()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(JSON.stringify(body));
    })
    .catch(console.error);
};

// getProduct()
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);
