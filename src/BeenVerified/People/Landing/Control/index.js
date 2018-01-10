import _padStart from 'lodash/padStart';

import * as localStorage from 'utils/localStorage';
import { BrowserDetect } from 'utils/browser';
import { getQueryArgs } from 'utils/queryArgs';
import { Counter } from 'utils/counter';
import { displayDynamicContent } from 'utils/dynamicContent';
import { getReportCount } from 'api/stats';
import formValidator from 'form-validators';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/style.css';

const queryArgs = getQueryArgs();

const initializeCounter = (data) => {
  const counterOptions = {
    startCount: data.startCount,
    slope: data.slope,
    afterUpdateCallback(currentCount) {
      let count = `${currentCount}`;
      let countItems = _padStart(count, 8, '0');
      for (let i = 0; i < countItems.length; i++) {
        $(`#tick_${i}`).html(countItems[i]);
      }
    },
  };
  const counterInstance = Counter.init(counterOptions);
  counterInstance.start();
  $('#counter').removeClass('hide');
};

const initializeCarousel = () => {
  const $carousel = $('.carousel').carousel();
  const $homeCarouselIndicator = $('.home-carousel-indicator');
  const $addressField = $('#fullAddress');

  $homeCarouselIndicator.on('click', function onCarouselIndicatorClick() {
    $homeCarouselIndicator.removeClass('active');
    $(this).addClass('active');
  });

  $carousel.on('slid.bs.carousel', () => {
    const $activeSection = $('.carousel div.active');
    const index = $activeSection.index() + 1;
    const PROPERTY_SECTION = 4;

    $activeSection.find('.first-input').focus();
    if (index === PROPERTY_SECTION) {
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
    initializePropertyValidator,
  ];

  validators.forEach(initializeValidator => initializeValidator());
};

const initialize = () => {
  BrowserDetect.init();
  initializeCarousel();
  initializeForms();
  getReportCount().then(initializeCounter);

  if (queryArgs) {
    displayDynamicContent(queryArgs);
  }
  $('.focus-me').focus();
  $('a.smarty-popup-close').html('<span class="glyphicon glyphicon-remove-circle"></span>');
};

localStorage.isSupported();
initialize();
