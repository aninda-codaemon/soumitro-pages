import {
  mapValues as _mapValues,
  get as _get,
  find as _find,
  chain as _chain,
} from 'lodash';

import { get } from 'utils/request';
import { removeDiacritics } from 'utils/strings';
import { TeaserRecord } from 'parsers/teaserRecord';
import amplify from 'utils/amplifyStore';

const pattern = new RegExp("[^A-Za-z'-s]", 'gi');

const buildTeaserEndpoint = (fn, ln, state, city, age, mi) =>
  `https://www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100&fn=${fn}&ln=${ln}&state=${state}&city=${city}&age=${age}&mi=${mi}`;

const validState = state => ((state && state.toLowerCase() === 'all') ? '' : state);

const validData = data => ((data && typeof data !== 'undefined') ? data : '');

const cleanSearchValues = value => removeDiacritics(value).replace(pattern, '');

const parseMiddleInitial = (data) => {
  const parsedMi = data.fn.match(/^.*\s([A-Za-z])$/);
  if (parsedMi) {
    if (!data.mi || data.mi.length === 0) {
      data.mi = parsedMi[1]; // eslint-disable-line
    }
    data.fn = data.fn.replace(/\s[A-Za-z]$/, '').replace(/\s+/g, '');
  } else {
    data.fn = data.fn.replace(/\s+/g, '');
  }
  return data;
};

const parseTeaser = (data) => {
  const recordCount = parseInt(_get(data, 'response.RecordCount', 0), 10);
  const records = _get(data, 'response.Records.Record');

  return {
    recordCount,
    teasers: recordCount === 1 ? [records] : records,
  };
};

const teaserSorter = (records) => {
  records = _chain(records).sortBy((record) => {
    var decimal;
    var sortAge;
    if (record.age) {
      sortAge = parseInt(record.age, 10);
    } else {
      sortAge = 200;
    }
    decimal = 999;
    if (record.addresses().length > 0) {
      decimal -= record.addresses().length;
    }
    if (record.relatives().length > 0) {
      decimal -= record.relatives().length;
    }
    return parseFloat(`${sortAge}.${decimal}`);
  }, this).value();
  return records;
};

const storeTeaserData = (teaserData) => {
  amplify.store('teaserData', teaserData);
  return teaserData;
};

/** An user using Safari Incognito. */
const fixIncognitoMode = bvid => ({ records }) => {
  if (!amplify.store('currentRecord') && bvid) {
    const currentRecord = _find((records || []), { bvid });
    const parsedRecord = new TeaserRecord(currentRecord);
    /** Workaround for framerida binding issued, because isn't display the
     * fields (fullName & firstName)
     * Probably because those attributes are functions */
    currentRecord.fullName = parsedRecord.fullName();
    currentRecord.firstName = parsedRecord.firstName();
    amplify.store('currentRecord', currentRecord);
  }
};

const getTeaserData = (data) => {
  data = _mapValues(data, cleanSearchValues);
  data = parseMiddleInitial(data);
  const url = buildTeaserEndpoint(
    data.fn,
    data.ln,
    validState(data.state),
    validData(data.city),
    validData(data.age),
    validData(data.mi),
  );

  return get(url, 'parseResults')
    .then(parseTeaser)
    .then(storeTeaserData)
    .then(fixIncognitoMode(data.bvid));
};

window.teaserSorter = teaserSorter;

export { getTeaserData };
