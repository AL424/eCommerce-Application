import { CustomerDraft, CustomerSignin } from '@commercetools/platform-sdk';
import { getApiRoot } from './ApiRoot';

// Example call to return Product list
export const getProducts = () => {
  return getApiRoot()
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
export const singin = async (dataCustomer: CustomerSignin) => {
  try {
    const resp = await getApiRoot()
      .login()
      .post({
        body: dataCustomer
      })
      .execute();
    const data = resp.body;
    const customerId = data.customer.id;
    return customerId;
  } catch (err) {
    // console.log(err);
  }
};

// create user
// Добавить функцию для выполнения входа в систему
export const singup = async (dataCust: CustomerDraft) => {
  try {
    const resp = await getApiRoot()
      .customers()
      .post({ body: dataCust })
      .execute();

    const data = resp.body;
    const customerId = data.customer.id;
    return customerId;
  } catch (err) {
    // console.log(err);
  }
};

export const getCustomer = () => {
  getApiRoot()
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
