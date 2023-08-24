import { getApiRoot } from './ApiRoot';
// import { ProductDraft } from '@commercetools/platform-sdk';

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

export const getProductById = (productId: string) => {
  return getApiRoot()
    .productProjections()
    .withId({ ID: productId })
    .get()
    .execute()
    .then(({ body }) => {
      console.log(JSON.stringify(body));
      return JSON.stringify(body);
    })
    .catch(console.error);
};
// export const getProductById = async (productId: string): ProductData => {
//   const apiRoot = getApiRoot();

//   try {
//     const response = await apiRoot.products().withId({ ID: productId }).get().execute();
//     if (response.statusCode === 200) {
//       const product = response.body;
//       return product; // Возвращает объект продукта
//     } else {
//       console.error('Error:', response.statusCode, response.body);
//       return null;
//     }
//   } catch {
//     console.error();
//     return null;
//   }
// };

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
