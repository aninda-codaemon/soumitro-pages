import _find from 'lodash/find';
import mockStats from './api/stats';
import mockTeaser from './api/teaser';
import mockExtraTeaser from './api/extraTeaser';

const registeredUrls = [
  ...mockStats,
  ...mockTeaser,
  ...mockExtraTeaser,
];

const get = requestUrl => new Promise((resolve) => {
  const result = _find(registeredUrls, ({ url }) => requestUrl.indexOf(url) >= 0);
  resolve(result.response);
});

export {
  get,
};
