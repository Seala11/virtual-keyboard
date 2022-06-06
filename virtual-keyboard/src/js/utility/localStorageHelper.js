export default class Language {
  static setStorage(key, value) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getStorage(key) {
    let value;
    if (typeof window !== 'undefined') {
      value = JSON.parse(window.localStorage.getItem(key));
    }
    return value !== null ? value : 'en';
  }
}
