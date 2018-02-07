import fetchJsonp from 'fetch-jsonp';

const get = (url, callbackFn = 'parseResults') => fetchJsonp(url, {
  mode: 'no-cors',
  jsonpCallbackFunction: callbackFn,
}).then(response => response.json());

const getAjax = (url, callbackFn = 'parseResults') => $.when(
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: callbackFn
  })
);

export {
  get,
  getAjax,
};
