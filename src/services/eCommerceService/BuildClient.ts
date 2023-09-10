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

const host = process.env.REACT_APP_CTP_AUTH_URL || '';
const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';
const clientId = process.env.REACT_APP_CTP_CLIENT_ID || '';
const clientSecret = process.env.REACT_APP_CTP_CLIENT_SECRET || '';
const scopes = [process.env.REACT_APP_CTP_SCOPES || ''];

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
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
