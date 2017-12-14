import amplify from 'utils/amplifyStore';
import { track } from './index';

const getRecordCountBucket = (count) => {
  const parsedCount = parseInt(count, 10);
  if (parsedCount === 0) return '0';
  else if (parsedCount === 1) return '1';
  else if (parsedCount === 100) return '100';
  else if (parsedCount >= 1 && parsedCount <= 20) return '2-20';
  else if (parsedCount >= 21 && parsedCount <= 50) return '21-50';
  else if (parsedCount >= 51 && parsedCount <= 75) return '51-75';
  else if (parsedCount >= 76 && parsedCount <= 99) return '76-99';
  return 'No Data';
};

const notifyRecordCount = (eventType) => {
  const teaserData = amplify.store('teaserData');
  const count = (teaserData && teaserData.recordCount) || 'No Count';
  const bucket = getRecordCountBucket(count);
  const eventName = `${eventType}: ${bucket}`;
  track(eventName);
};

export { notifyRecordCount };
