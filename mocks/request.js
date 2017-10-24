import _find from 'lodash/find';
import mockStats from './api/stats';
import mockExtraTeaser from './api/extraTeaser';

const registeredUrls = [
  ...mockStats,
  ...mockExtraTeaser
];

const get = (requestUrl) => new Promise((resolve, reject) => {
  const result = _find(registeredUrls, ({ url }) => requestUrl.indexOf(url) >= 0);
  resolve({
    data: result.response
  });
});

export {
  get
};