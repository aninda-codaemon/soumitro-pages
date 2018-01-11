import fetchJsonp from 'fetch-jsonp';

const get = (url, callbackFn = 'parseResults') => fetchJsonp(url, {
  mode: 'no-cors',
  jsonpCallbackFunction: callbackFn,
}).then(response => response.json());

export {
  get,
};
