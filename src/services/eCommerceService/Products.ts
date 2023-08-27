import { getApiRoot } from './ApiRoot';

export const getProducts = () => {
  return getApiRoot().productProjections().get().execute();
};
export const getCategories = () => {
  return getApiRoot().categories().get().execute();
};
export const getProductsTypes = () => {
  return getApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [
          'categories.id:"c65fec45-f1ac-412d-86f2-f7ee99ca8111","a28e01fc-a740-49b2-85f1-0d1a9360c5eb"'
        ],
        limit: 20
      }
    })
    .execute();
};
