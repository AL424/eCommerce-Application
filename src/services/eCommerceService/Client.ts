import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-app-simple-team'
});

// Example call to return Product list
export const getProduct = () => {
  return apiRoot.productProjections().get().execute();
};

// getProduct()
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);
