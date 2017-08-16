import trackNL from '../src/track';

// Test for Safari private browsing mode
export const isSafaryIncognito = () => {
  let isSafaryIncognito = false;
  try {
    localStorage.test = 2;
  }
  catch (e) {
    trackNL("Safari Private Browsing");
    isSafaryIncognito = true;
  }
  return isSafaryIncognito;
}