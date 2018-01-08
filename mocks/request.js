import fetchJsonp from 'fetch-jsonp';

const get = (url, callbackFn) => {
  var cachedReponse = sessionStorage.getItem(url);
  if (cachedReponse) {
    return Promise.resolve(JSON.parse(cachedReponse));
  }
  return fetchJsonp(url, {
    mode: 'no-cors',
    jsonpCallbackFunction: callbackFn,
  })
    .then(response => response.json())
    .then((response) => {
      sessionStorage.setItem(url, JSON.stringify(response));
      return response;
    });
};

export {
  get,
};
