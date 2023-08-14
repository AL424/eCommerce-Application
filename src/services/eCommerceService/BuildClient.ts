import fetch from 'node-fetch';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  Client
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

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

// withPasswordFlow client
export const setPasswordAuthMiddlewareOptions = (
  username: string,
  password: string
): PasswordAuthMiddlewareOptions => {
  return {
    host: host,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: username,
        password: password
      }
    },
    scopes: scopes,
    fetch
  };
};

export const createPasswordFlowClient = (
  username: string,
  password: string
) => {
  return new ClientBuilder()
    .withPasswordFlow(setPasswordAuthMiddlewareOptions(username, password))
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
};

export const ctpAnonymClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonymOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const createApiRoot = (client: Client) => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey
  });
};
