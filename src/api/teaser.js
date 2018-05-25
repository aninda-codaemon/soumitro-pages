import {
  mapValues as _mapValues,
  get as _get,
  find as _find,
  chain as _chain,
} from 'lodash';

import { get } from 'utils/request';
import { cleanSearchValues } from 'utils/strings';
import { TeaserRecord } from 'parsers/teaserRecord';
import amplify from 'utils/amplifyStore';

const buildTeaserEndpoint = (fn, ln, state, city, age, mn) =>
  `https://www.beenverified.com/hk/teaser/?exporttype=jsonp&rc=100&fn=${fn}&ln=${ln}&state=${state}&city=${city}&age=${age}&mn=${mn}`;

const validState = state => ((state && state.toLowerCase() === 'all') ? '' : state);

const validData = data => ((data && typeof data !== 'undefined') ? data : '');

const parseMiddleName = (data) => {
  if (!data.fn) {
    return data;
  }

  let { fn } = data;
  const parsedMi = fn.match(/^\S*\s\S+$/i);
  if (parsedMi) {
    const [, mi] = fn.split(' ');
    [fn] = fn.split(' ');
    if (!data.mi || data.mi.length === 0) {
      data.mi = mi;
    }
  }
  data.fn = fn.replace(/\s+/g, '');

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
const fixIncognitoMode = bvid => ({ teasers }) => {
  const currentRecord = _find((teasers || []), { bvid });
  if (bvid && !currentRecord) {
    amplify.store('currentRecord', null);
  } else if (currentRecord) {
    const parsedRecord = new TeaserRecord(currentRecord);
    /** Workaround for framerida binding issued, because isn't display the
     * fields (fullName & firstName)
     * Probably because those attributes are functions */
    currentRecord.fullName = parsedRecord.fullName();
    currentRecord.firstName = parsedRecord.firstName();
    // Hacky fix for framerida problem
    currentRecord['_framerida_mapped'] = 'TeaserRecord'; // eslint-disable-line
    currentRecord['_framerida_click'] = 'store currentRecord'; // eslint-disable-line
    amplify.store('currentRecord', currentRecord);
  }
};

const getTeaserData = (data) => {
  if (data.town) {
    data.city = data.town;
  }
  data = _mapValues(data, (value, key) => ($.inArray(key, ['fn', 'ln', 'mi', 'city', 'state']) > -1 ? cleanSearchValues(value) : value));
  data = parseMiddleName(data);
  const url = buildTeaserEndpoint(
    data.fn,
    data.ln,
    validState(data.state),
    validData(data.city),
    validData(data.age),
    validData(data.mi),
  );

  return get(url)
    .then(parseTeaser)
    .then(storeTeaserData)
    .then(fixIncognitoMode(data.bvid));
};

window.teaserSorter = teaserSorter;

export { getTeaserData };
