import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

const get = (url, callbackFn) => fetchJsonp(url, {
  mode: 'no-cors',
  jsonpCallbackFunction: callbackFn
}).then(response => response.json());

export {
  get
};