import _ from 'lodash';

import { get } from 'utils/request';
import { track } from 'utils/track';
import amplify from 'utils/amplifyStore';
import { capitalize, formatEmail, formatPhone, nameize } from 'utils/strings';

const buildExtraTeaserEndpoint = bvid => `https://www.beenverified.com/hk/dd/teaser/person?exporttype=jsonp&bvid=${bvid}&criminal=1&bankruptcy=1`;

const getNonEmptyItems = (infoType, capitalizedType) => item => {
  if (item && item.type === infoType && item.count > 0) {
    track('Data Modal Viewed ' + capitalizedType);
    return true;
  }
  return false;
};

const reduceExtraTeaserInformation = data => {
  return (reducedObject, infoType) => {
    const capitalizedType = capitalize(infoType);
    reducedObject['has' + capitalizedType] = _.some(data, getNonEmptyItems(infoType, capitalizedType));
    return reducedObject;
  }
};

const filterEmptyData = item => !(item && item.showIfEmpty === 0 && item.count === 0);

const mapSingularNames = item => {
  if (item && item.count === 1) {
    item.name = item.single;
  }
  return item;
};

const parseExtraTeaserData = data => {
  track('Person Data Teaser Called');
  var phoneNumbers = $.map(data.phones, item => formatPhone(item.number));
  var emailAddresses = $.map(data.emails, item => formatEmail(item.email_address).toLowerCase());
  var socialNetworks = $.map(data.social, item => nameize(item.type));
  var associates = $.map(data.connections.associates, item => nameize(item.names[0].full));
  var relatives = $.map(data.connections.relatives, item => nameize(item.names[0].full));

  var result = [
    {
      'type': 'criminal',
      'name': 'Criminal or Traffic*',
      'single': 'Criminal or Traffic*',
      'style': ' crim-box',
      'weight': 9,
      'showIfEmpty': 0,
      'count': data.courts && data.courts.criminal ? data.courts.criminal.length : 0
    },
    {
      'type': 'bankruptcy',
      'name': 'Bankruptcy Filings',
      'single': 'Bankruptcy Filing',
      'style': ' crim-box',
      'weight': 8,
      'showIfEmpty': 0,
      'count': data.courts && data.courts.bankruptcy ? data.courts.bankruptcy.length : 0
    },
    {
      'type': 'associates',
      'name': 'Associates & Relatives',
      'single': 'Associates & Relatives',
      'style': '',
      'weight': 7,
      'showIfEmpty': 0,
      'count': data.connections.associates.length,
      'associates': associates
    },
    {
      'type': 'emails',
      'name': 'Email Addresses',
      'single': 'Email Address',
      'style': '',
      'weight': 6,
      'showIfEmpty': 0,
      'count': data.emails ? data.emails.length : 0,
      'emailAddress': emailAddresses
    },
    {
      'type': 'phones',
      'name': 'Phone Numbers',
      'single': 'Phone Number',
      'style': ' phone-box',
      'weight': 5,
      'showIfEmpty': 0,
      'count': data.phones ? data.phones.length : 0,
      'phoneNumber': phoneNumbers
    },
    {
      'type': 'social',
      'name': 'Social Media Profiles',
      'single': 'Social Media Profile',
      'style': ' social-box',
      'weight': 4,
      'showIfEmpty': 0,
      'count': data.social ? data.social.length : 0,
      'socialNetwork': socialNetworks
    },
    {
      'type': 'photos',
      'name': 'Photos',
      'single': 'Photo',
      'style': '',
      'weight': 3,
      'showIfEmpty': 0,
      'count': data.images ? data.images.length : 0
    },
    {
      'type': 'careers',
      'name': 'Jobs and Education',
      'single': 'Career',
      'style': '',
      'weight': 2,
      'showIfEmpty': 0,
      'count': (data.jobs ? data.jobs.length : 0) + (data.educations ? data.educations.length : 0)
    },
    {
      'type': 'relatives',
      'name': 'Relatives',
      'single': 'Relatives',
      'style': '',
      'weight': 3,
      'showIfEmpty': 0,
      'count': relatives.length,
      'relatives': relatives
    },
  ];

  var firstAddress = _.get(result, 'addresses[0]');
  var coordinates = firstAddress ? {
    latitude: firstAddress.latitude,
    longitude: firstAddress.longitude
  } : null;

  return {
    data: _.chain(result)
      .filter(filterEmptyData)
      .map(mapSingularNames)
      .sortBy(['weight', 'count'], ['desc', 'desc'])
      .value(),
    photo: _.get(result, 'images[0].url') || '',
    coordinates,
    recordCount: Array.isArray(result) ? 0 : 1,
  };
}

const mergeInformationTypes = ({ coordinates, data, recordCount, photo }) => {
  const infoTypes = [
    'criminal',
    'bankruptcy',
    'phones',
    'emails',
    'social',
    'photos',
    'careers',
    'associates',
    'relatives',
  ];
  const information = infoTypes.reduce(reduceExtraTeaserInformation(data), {});
  var teaserDataObj = {
    recordCount,
    extraData: _(data).omit(_.isUndefined).omit(_.isNull).value(),
    photo,
    coordinates
  };
  return _.assign(teaserDataObj, information);
} 

const storeData = teaserDataObj => {
  amplify.store('extraTeaserData', teaserDataObj);
  return teaserDataObj;
}

const getExtraTeaserData = bvid => get(buildExtraTeaserEndpoint(bvid))
  .then(response => response.data)
  .then(parseExtraTeaserData)
  .then(mergeInformationTypes)
  .then(storeData);

export { getExtraTeaserData };