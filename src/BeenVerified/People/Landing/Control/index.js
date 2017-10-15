import * as localStorage from 'utils/localStorage';
import { BrowserDetect } from 'utils/browser';
import { Counter } from 'utils/counter';
import { getReportCount } from 'api/stats';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/style.css';

const isLocalStorageSupported = localStorage.isSupported();

BrowserDetect.init();

const initializeCounter = data => {
  const counterOptions = {
    startCount: data.startCount,
    slope: data.slope,
    afterUpdateCallback: function (currentCount) {
      let count = currentCount + '';
      let countItems = _.padStart(count, 8, '0');
      for (let i = 0; i < countItems.length; i++) {
        $('#tick_' + i).html(countItems[i]);
      }
    }
  };
  const counterInstance = Counter.init(counterOptions);
  counterInstance.start();
  $('#counter').removeClass('hide');
};
getReportCount().then(initializeCounter);

//Search carousel selector
const $carousel = $('.home-carousel-indicator');
$carousel.on('click', function () {
  $carousel.removeClass('active');
  $(this).addClass('active');
});
