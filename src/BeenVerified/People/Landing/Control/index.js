import * as localStorage from 'utils/localStorage';
import { BrowserDetect } from 'utils/browser';
import { Counter } from 'utils/counter';
import { getReportCount } from 'api/stats';
import formValidator from 'form-validators';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/style.css';

const REQUEST_DELAY = 300;
const isLocalStorageSupported = localStorage.isSupported();

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

const initializeCarousel = () => {
  const $carousel = $('.carousel').carousel();
  const $homeCarouselIndicator = $('.home-carousel-indicator');

  $homeCarouselIndicator.on('click', function () {
    $homeCarouselIndicator.removeClass('active');
    $(this).addClass('active');
  });

  $carousel.on('slid.bs.carousel', function (evt) {
    if (($('.carousel div.active').index() + 1) === 4) {
      initAddress();
    }
  });
};

const initializePhoneValidator = () => {
  const $headerSearchPhone = $('#header-search-phone');
  const $phoneField = $('#phone');
  formValidator.phone.validate($headerSearchPhone, $phoneField, {
    onkeyup: false,
    onclick: false,
    onsubmit: true,
    submitHandler: function (form) {
      window.setTimeout(() => {
        const phoneNumber = $phoneField.val();
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        $phoneField.val(cleanNumber);
        form.submit();
      }, REQUEST_DELAY);
    }
  });
}

BrowserDetect.init();
initializeCarousel();
initializePhoneValidator();
getReportCount().then(initializeCounter);
$('.focus-me').focus();
$('a.smarty-popup-close').html('<span class="glyphicon glyphicon-remove-circle"></span>');
