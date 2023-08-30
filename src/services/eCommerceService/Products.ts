import { getApiRoot } from './ApiRoot';

export const getProducts = () => {
  return getApiRoot().productProjections().get().execute();
};

export const getCategories = () => {
  return getApiRoot().categories().get().execute();
};

// interface FilterQueryData {
//   categories: string[];
//   price: {
//     min: number;
//     max: number;
//   };
// }

// export const getProductsByFilter = (dataQuery: FilterQueryData) => {
//   return getApiRoot()
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         filter: [
//           dataQuery.categories.length > 0
//             ? `categories.id:${dataQuery.categories.join(',')}`
//             : 'categories:exists',
//           `variants.price.centAmount:range (${dataQuery.price.min} to ${dataQuery.price.max})`
//         ],
//         sort: ['name.en-US asc'],
//         limit: 20
//       }
//     })
//     .execute();
// };

export const getProductsByFilter = (
  categories: string[],
  priceRange: string,
  sortData: string
) => {
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
        limit: 20
      }
    })
    .execute();
};
