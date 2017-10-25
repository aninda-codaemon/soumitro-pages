import {
  mapValues as _mapValues,
  get as _get,
  find as _find,
} from 'lodash';

import { removeDiacritics } from 'utils/strings';
import { TeaserRecord } from 'parsers/teaserRecord';

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

const parseTeaser = data => {
  const recordCount = parseInt(_get(data, 'response.RecordCount', 0));
  const records = _get(data, 'response.Records.Record');
  
  return {
    recordCount,
    records: recordCount === 1 ? [records] : records
  };
};

const storeTeaserData = teaserData => {
  amplify.store('teaserData', teaserDataObj);
  return teaserData;
}

/** An user using Safari Incognito. */
const fixIncognitoMode = bvid => ({ records }) => {
  if (!amplify.store('currentRecord')) {
    const currentRecord = _find((teaserRecords || []), { bvid });
    const parsedRecord = new TeaserRecord(currentRecord);
    /**
     * Workaround for framerida binding issued, because isn't display the fields (fullName & firstName)
     * Probably because those attributes are functions. 
     */
    currentRecord.fullName = parsedRecord.fullName();
    currentRecord.firstName = parsedRecord.firstName();
    amplify.store('currentRecord', currentRecord);
  }
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

  return get(url)
    .then(response => response.data)
    .then(parseTeaser)
    .then(storeTeaserData)
    .then(fixIncognitoMode(data.bvid));
}

export { getTeaserData };