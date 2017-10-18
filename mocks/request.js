import _find from 'lodash/find';
import mockStats from './api/stats';

const registeredUrls = [
  ...mockStats
];

const get = (url) => new Promise((resolve, reject) => {
  const result = _find(registeredUrls, { url });
  resolve({
    data: result.response
  });
});

export {
  get
};