import _find from 'lodash/find';
import mockStats from './api/stats';
import mockTeaser from './api/teaser';
import mockExtraTeaser from './api/extraTeaser';

const registeredUrls = [
  ...mockStats,
  ...mockTeaser,
  ...mockExtraTeaser,
];
const SIMULATE_DELAY = 1000;

const get = requestUrl => new Promise((resolve) => {
  const result = _find(registeredUrls, ({ url }) => requestUrl.indexOf(url) >= 0);
  setTimeout(() => {
    resolve(result.response || result.responses[1]);
  }, SIMULATE_DELAY);
});

export {
  get,
};
