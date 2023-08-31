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

// Получить продукт по его Id
export const getProductById = (productId: string) => {
  return getApiRoot()
    .productProjections()
    .withId({ ID: productId })
    .get()
    .execute()
    .then(({ body }) => {
      // console.log(JSON.stringify(body));
      return JSON.stringify(body);
    })
    .catch(console.error);
};

export const getCategoryById = (productId: string) => {
  return getApiRoot()
    .categories()
    .withId({ ID: productId })
    .get()
    .execute()
    .then(({ body }) => {
      // console.log(JSON.stringify(body));
      return JSON.stringify(body);
    })
    .catch(console.error);
};
// Проверить наличие продукта по Id
export const checkProductExists = async (
  productId: string
): Promise<boolean> => {
  try {
    const response = await getApiRoot()
      .productProjections()
      .withId({ ID: productId })
      .get();
    return (await response.execute()).statusCode === 200;
  } catch (error) {
    if (error) {
      return false;
    }
    throw error;
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
