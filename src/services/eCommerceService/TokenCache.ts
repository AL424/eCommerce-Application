import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { LocalStorage } from '../localStorage/LocalStorage.service';

export const tokenCache: TokenCache = {
  get: () => {
    const string = LocalStorage.get('token-cache');
    if (string) {
      const tokenStore: TokenStore = JSON.parse(string);
      return tokenStore;
    }
    return {} as TokenStore;
  },
  set: (cache: TokenStore) => {
    const string = JSON.stringify(cache);
    LocalStorage.set('token-cache', string);
  }
};
