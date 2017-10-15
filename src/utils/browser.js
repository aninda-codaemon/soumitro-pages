import _find from 'lodash/find';

const browsersData = [
  {
    string: navigator.userAgent,
    subString: 'Edge',
    identity: 'MS Edge'
  },
  {
    string: navigator.userAgent,
    subString: 'Chrome',
    identity: 'Chrome'
  },
  {
    string: navigator.userAgent,
    subString: 'MSIE',
    identity: 'Explorer'
  },
  {
    string: navigator.userAgent,
    subString: 'Trident',
    identity: 'Explorer'
  },
  {
    string: navigator.userAgent,
    subString: 'Firefox',
    identity: 'Firefox'
  },
  {
    string: navigator.userAgent,
    subString: 'Safari',
    identity: 'Safari'
  },
  {
    string: navigator.userAgent,
    subString: 'Opera',
    identity: 'Opera'
  }
];

const searchBrowser = (browsers, userAgent) => {
  const browser = _find(browsers, ({ subString}) => userAgent.indexOf(subString) !== -1);
  
  return browser || { identity: 'Other' };
};

const searchVersion = (dataString, versionSearchString) => {
  const index = dataString.indexOf(versionSearchString);
  if (index === -1) {
    return;
  }

  const revision = dataString.indexOf('rv:');
  if (versionSearchString === 'Trident' && revision !== -1) {
    return parseFloat(dataString.substring(revision + 3));
  }
  return parseFloat(dataString.substring(index + versionSearchString.length + 1));
};

const getBrowserVersion = (subString) => {
  const { appVersion, userAgent } = navigator;
  return searchVersion(userAgent, subString) || searchVersion(appVersion, subString) || 'Unknown';
}

const BrowserDetect = {
  browser: '',
  version: '',
  init() {
    const { appVersion, userAgent } = navigator;
    const browserData = searchBrowser(browsersData, userAgent);
    this.browser = browserData.identity;
    this.version = getBrowserVersion(browserData.subString);
  },
};

export { BrowserDetect };
