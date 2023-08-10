import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions
} from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-app-simple-team',
  credentials: {
    clientId: 'n-XA7QIpASddTvTixm1jHbFv',
    clientSecret: 'd26xmA2yRbkZoZUFgcPyZ3KELDnbWawD'
  },
  scopes: [
    'manage_my_quote_requests:ecommerce-app-simple-team manage_my_profile:ecommerce-app-simple-team view_published_products:ecommerce-app-simple-team manage_my_payments:ecommerce-app-simple-team create_anonymous_token:ecommerce-app-simple-team manage_my_orders:ecommerce-app-simple-team manage_my_quotes:ecommerce-app-simple-team view_categories:ecommerce-app-simple-team manage_my_shopping_lists:ecommerce-app-simple-team manage_my_business_units:ecommerce-app-simple-team'
  ],
  fetch
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
