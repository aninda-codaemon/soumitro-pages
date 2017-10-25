import { track } from './index';
import amplify from 'utils/amplifyStore';

const getRecordCountBucket = count => {
  count = parseInt(count, 10);
  if (count === 0) return '0';
  else if (count === 1) return '1';
  else if (count === 100) return '100';
  else if (count >= 1 && count <= 20) return '2-20';
  else if (count >= 21 && count <= 50) return '21-50';
  else if (count >= 51 && count <= 75) return '51-75';
  else if (count >= 76 && count <= 99) return '76-99';
  else return 'No Data';
};

const notifyRecordCount = eventType => {
  const teaserData = amplify.store('teaserData');
  const count = teaserData && teaserData.recordCount || 'No Count';
  const bucket = getRecordCountBucket(count);
  const eventName = `${eventType}: ${bucket}`;
  track(eventName);
}

export { notifyRecordCount };
