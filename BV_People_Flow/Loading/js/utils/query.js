import { isSafaryIncognito } from './safary-storage';

export const validQueryData = (data = '') => data && data.toLowerCase() === "all" ? '' : data;

export const parseMiddleInitial = data => {
  if (!data.fn){
    return data;
  }
  var parsed_mi = data.fn.match(/^.*\s([A-Za-z])$/);
  if(!parsed_mi) {
    data.fn = data.fn.replace(/\s+/g, '');
    return data;
  }
  if (!data.mi || data.mi.length === 0) {
    data.mi = parsed_mi[1];
  }
  data.fn = data.fn.replace(/\s[A-Za-z]$/, '').replace(/\s+/g, '');
  return data;
}

export const personQuery = (searchData) => isSafaryIncognito() && searchData ? `? ${$.param(searchData)}` : '';

export const buildXhrUrl = ({ fn, ln, state, city, age, mi }) => {
  const baseUrl = '//www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100';
  return `${baseUrl}
    &fn=${validQueryData(fn)}
    &ln=${validQueryData(ln)}
    &state=${validQueryData(state)}
    &city=${validQueryData(city)}
    &age=${validQueryData(age)}
    &mi=${validQueryData(mi)}
  `;
};

export const validSearchData = (searchData) => {
  if (!searchData) {
    return false;
  }
  const { fn, ln } = searchData;
  const curlyRegex = /{.*?}/;
  const hasCurlies = curlyRegex.test(fn) && curlyRegex.test(ln);
  return fn && ln && !hasCurlies;
};