import 'imports-loader?this=>window!./js/modernizr.custom';
// import trackNL from './js/track';
import cleanQueryData from './js/query-parser';
// import './js/progress-bar';
import './css/bootstrap.min.css';


// Test for Safari private browsing mode
try { localStorage.test = 2; } catch (e) {
  trackNL("Safari Private Browsing");
  hasLS = false;
}

// var searchData = cleanQueryData(amplify.store('query'));

