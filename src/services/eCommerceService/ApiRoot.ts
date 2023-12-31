import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { LocalStorage } from '../localStorage/LocalStorage.service';
import { createApiRoot, ctpAnonymClient, ctpClient } from './BuildClient';

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  const customerId = LocalStorage.get('customer-id');
  if (customerId) {
    const apiRoot = createApiRoot(ctpClient);
    return apiRoot;
  }
  const apiRoot = createApiRoot(ctpAnonymClient);
  return apiRoot;
};
