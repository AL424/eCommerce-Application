import fetch from 'node-fetch';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  Client,
  AuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import {
  CustomerSignin,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk';
import { tokenCache } from './TokenCache';

const host = 'https://auth.europe-west1.gcp.commercetools.com';
const projectKey = 'ecommerce-app-simple-team';
const clientId = 'kgmMd3dEWi1v3jKD5-fXpLfH';
const clientSecret = 'WljRUbWTYt31lEnrTIta0nMtIM_dPJlX';
const scopes = [
  'manage_customers:ecommerce-app-simple-team manage_my_quote_requests:ecommerce-app-simple-team manage_my_profile:ecommerce-app-simple-team view_published_products:ecommerce-app-simple-team manage_my_payments:ecommerce-app-simple-team create_anonymous_token:ecommerce-app-simple-team manage_my_orders:ecommerce-app-simple-team manage_my_quotes:ecommerce-app-simple-team view_categories:ecommerce-app-simple-team manage_my_shopping_lists:ecommerce-app-simple-team manage_my_business_units:ecommerce-app-simple-team'
];

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
};

const options: AuthMiddlewareOptions = {
  host: host,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret
  },
  scopes: scopes,
  fetch,
  tokenCache: tokenCache
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// withPasswordFlow client
export const setPasswordAuthMiddlewareOptions = (
  dataCustomer: CustomerSignin
): PasswordAuthMiddlewareOptions => {
  return {
    host: host,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: dataCustomer.email,
        password: dataCustomer.password
      }
    },
    scopes: scopes,
    fetch,
    tokenCache: tokenCache
  };
};

export const createPasswordFlowClient = (dataCustomer: CustomerSignin) => {
  return new ClientBuilder()
    .withPasswordFlow(setPasswordAuthMiddlewareOptions(dataCustomer))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

// withAnonymousSessionFlow client
const anonymOptions: AnonymousAuthMiddlewareOptions = {
  host: host,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret
  },
  scopes: scopes,
  fetch
  // tokenCache: tokenCache
};

export const ctpAnonymClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonymOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// withExistingTokenFlow
export const createExistingTokenFlowClient = (token: string) => {
  return new ClientBuilder()
    .withExistingTokenFlow(token, { force: true })
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export const createApiRoot = (client: Client) => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey
  });
};
