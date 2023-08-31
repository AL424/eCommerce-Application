import {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';
import { getApiRoot } from './ApiRoot';

export const getProducts = (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  return getApiRoot().productProjections().get().execute();
};

export const getCategories = (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  return getApiRoot().categories().get().execute();
};

export const getProductsByFilter = (
  categories: string[],
  priceRange: string,
  sortData: string,
  searchString: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return getApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [
          categories.length > 0
            ? `categories.id:${categories.join(',')}`
            : 'categories:exists',
          `variants.price.centAmount:range (${priceRange})`
        ],
        sort: [sortData],
        'text.en-US': `${searchString}`
      }
    })
    .execute();
};
