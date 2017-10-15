import { track } from './track';
// Mostly older versions of Safari would fail.
export const isSupported = () => {
  let result = false;
  try {
    localStorage.test = 2;
  } catch (e) {
    track('Safari Private Browsing');
    result = true;
  }
  return result;
};
