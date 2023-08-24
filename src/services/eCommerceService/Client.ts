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
