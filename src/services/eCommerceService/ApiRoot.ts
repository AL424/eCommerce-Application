import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// import { LocalStorage } from '../localStorage/LocalStorage.service';
import {
  createApiRoot,
  // createExistingTokenFlowClient,
  ctpAnonymClient
} from './BuildClient';
// import { TokenStore } from '@commercetools/sdk-client-v2';

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  /* const string = LocalStorage.get('token');
  if (string) {
    const tokenStorage: TokenStore = JSON.parse(string);
    const apiRoot = createApiRoot(
      createExistingTokenFlowClient(tokenStorage.token)
    );
    return apiRoot;
  } */
  const apiRoot = createApiRoot(ctpAnonymClient);
  return apiRoot;
};
