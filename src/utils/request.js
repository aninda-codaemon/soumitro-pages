import fetchJsonp from 'fetch-jsonp';

const get = (url, callbackFn = 'parseResults') => fetchJsonp(url, {
  mode: 'no-cors',
  jsonpCallbackFunction: callbackFn,
  timeout: 10000,
}).then(response => response.json());

export {
  get,
};
