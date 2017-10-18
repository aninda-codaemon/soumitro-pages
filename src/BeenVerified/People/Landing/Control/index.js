import _padStart from 'lodash/padStart';

import * as localStorage from 'utils/localStorage';
import { BrowserDetect } from 'utils/browser';
import { Counter } from 'utils/counter';
import { getReportCount } from 'api/stats';
import formValidator from 'form-validators';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/style.css';

const isLocalStorageSupported = localStorage.isSupported();

const initializeCounter = data => {
  const counterOptions = {
    startCount: data.startCount,
    slope: data.slope,
    afterUpdateCallback: function (currentCount) {
      let count = currentCount + '';
      let countItems = _padStart(count, 8, '0');
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
  const $addressField = $('#fullAddress');

  $homeCarouselIndicator.on('click', function () {
    $homeCarouselIndicator.removeClass('active');
    $(this).addClass('active');
  });

  $carousel.on('slid.bs.carousel', function (evt) {
    if (($('.carousel div.active').index() + 1) === 4) {
      formValidator.property.initializeLiveAddress($addressField);
    }
  });
};

const initializePeopleValidator = () => {
  const $headerSearchPeople = $('#header-search-people');
  formValidator.people.validate($headerSearchPeople);
};

const initializePhoneValidator = () => {
  const $headerSearchPhone = $('#header-search-phone');
  const $phoneField = $('#phone');
  formValidator.phone.validate($headerSearchPhone, $phoneField);
};

const initializeEmailValidator = () => {
  const $headerSearchEmail = $('#header-search-email');
  formValidator.email.validate($headerSearchEmail);
};

const initializePropertyValidator = () => {
  const $headerSearchProperty = $('#header-search-property');
  formValidator.property.validate($headerSearchProperty);
};

const initializeForms = () => {
  const validators = [
    initializePeopleValidator,
    initializePhoneValidator,
    initializeEmailValidator,
    initializePropertyValidator
  ];

  validators.forEach( initializeValidator => initializeValidator());
};

BrowserDetect.init();
initializeCarousel();
initializeForms();
getReportCount().then(initializeCounter);
$('.focus-me').focus();
$('a.smarty-popup-close').html('<span class="glyphicon glyphicon-remove-circle"></span>');
