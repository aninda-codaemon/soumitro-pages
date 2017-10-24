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

const getBVId = queryArgs => {
  const currentRecord = amplify.store('currentRecord');
  return (queryArgs && queryArgs.bvid && !currentRecord) ? queryArgs.bvid : currentRecord && currentRecord.bvid;
}

const isValidPeopleQuery = queryArgs => queryArgs.fn && queryArgs.ln;

export {
  getQueryArgs,
  parseQueryArgs,
  getBVId,
  isValidPeopleQuery,
};
