import _mapValues from 'lodash/mapValues';

import { removeDiacritics } from 'utils/strings';

const pattern = new RegExp("[^A-Za-z'-\s]", 'gi');

const buildTeaserEndpoint = (fn, ln, state,city, age, mi) => 
  `https://www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100&fn=${fn}&ln=${ln}&state=${state}&city=${city}&age=${age}&mi=${mi}`;

const validState = state => (state && state.toLowerCase() === 'all') ? '' : state;

const validData = data => (data && typeof data !== 'undefined') ? data : '';

const cleanSearchValues = value => removeDiacritics(value).replace(pattern, '');

const parseMiddleInitial = function (data) {
  const parsed_mi = data.fn.match(/^.*\s([A-Za-z])$/);
  if (parsed_mi) {
    if (!data.mi || data.mi.length === 0) {
      data.mi = parsed_mi[1];
    }
    data.fn = data.fn.replace(/\s[A-Za-z]$/, '').replace(/\s+/g, '');
  } else {
    data.fn = data.fn.replace(/\s+/g, '');
  }
  return data;
};

const getTeaserData = data => {
  data = _.mapValues(data, cleanSearchValues);
  data = parseMiddleInitial(data);
  const url = buildTeaserEndpoint(
    data.fn,
    data.ln,
    validState(data.state),
    validData(data.city),
    validData(data.age),
    validData(data.mi)
  );

  return get(url).then(response => response.data);
}

export { getTeaserData };