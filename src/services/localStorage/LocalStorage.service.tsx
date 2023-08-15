export const LocalStorage = {
  get(key: string) {
    return localStorage.getItem(key);
  },
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: string) {
    localStorage.remove(key);
  },
  clear() {
    localStorage.clear();
  }
};
