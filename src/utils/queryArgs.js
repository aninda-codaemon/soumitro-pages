import _chain from 'lodash/chain';

const parseQueryArgs = query => {
  if (!query) {
    return null;
  }
  var args = _
    .chain(query.split('&'))
    .map(function (params) {
      var p = params.split('=');
      var key = p[0];
      var val = window.decodeURIComponent(p[1]);
      val = val.replace(/\/+$/g, ""); // clean up trailing slash
      val = val.replace(/\+/g, " "); // replace white spaces
      return [key, val];
    })
    .object()
    .value();
  return args;
};

const getQueryArgs = () => {
  const query = window.location.search.substring(1);
  return parseQueryArgs(query) || {};
};

export {
  getQueryArgs,
  parseQueryArgs
};
