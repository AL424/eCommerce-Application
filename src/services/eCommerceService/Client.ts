import { ctpClient } from './BuildClient';
import {
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-app-simple-team'
});

// Example call to return Product list
export const getProduct = () => {
  return apiRoot.productProjections().get().execute();
};

// singin
// Добавить функцию для выполнения входа в систему
export const singin = (dataCustomer: CustomerSignin) => {
  apiRoot
    .login()
    .post({
      body: dataCustomer
    })
    .execute()
    .then((resp) => resp.body)
    .then((data) =>
      console.log(
        `Welcome, ${data.customer.firstName} ${data.customer.lastName}!!!`
      )
    )
    .catch(() => console.log('Wrong e-mail or password'));
};

// create user
// Добавить функцию для выполнения входа в систему
export const singup = (dataCustomer: CustomerDraft) => {
  apiRoot
    .customers()
    .post({ body: dataCustomer })
    .execute()
    .then((resp) => resp.body)
    .then((data) =>
      console.log(
        `Welcome, ${data.customer.firstName} ${data.customer.lastName}!!!`
      )
    )
    .catch(() => console.log('User not registered'));
};

// getProduct()
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);
