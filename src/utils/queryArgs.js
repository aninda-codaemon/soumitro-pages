import {
  chain as _chain,
  isEmpty as _isEmpty,
} from 'lodash';
import amplify from 'utils/amplifyStore';

const parseQueryArgs = query => {
  if (!query) {
    return null;
  }
  var args = _
    .chain(query.split('&'))
    .reduce(function(result, params) {
        var p = params.split('=');
        var key = p[0];
        var val = window.decodeURIComponent(p[1] || "");
        val = val.replace(/\/+$/g, ""); // clean up trailing slash
        val = val.replace(/\+/g, " "); // replace white spaces
        result[key] = val;
        return result;
    }, {})
    .value();
  return args;
};

const getQueryArgs = () => {
  const query = window.location.search.substring(1);
  return parseQueryArgs(query) || {};
};

const getBVId = queryArgs => {
  const currentRecord = amplify.store('currentRecord');
  return (queryArgs && queryArgs.bvid && _isEmpty(currentRecord)) ? queryArgs.bvid : currentRecord && currentRecord.bvid;
}

const isValidPeopleQuery = queryArgs => queryArgs.fn && queryArgs.ln;

export {
  getQueryArgs,
  parseQueryArgs,
  getBVId,
  isValidPeopleQuery,
};
