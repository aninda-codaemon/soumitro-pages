import * as localStorage from 'utils/localStorage';
import { BrowserDetect } from 'utils/browser';
import { getQueryArgs } from 'utils/queryArgs';
import formValidator from 'form-validators';
import { track } from 'utils/track/index'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './css/styles.css';

const queryArgs = getQueryArgs();
const isLocalStorageSupported = localStorage.isSupported();

const initializePeopleValidator = () => {
  const $headerSearchPeople = $('#header-search-people');
  formValidator.people.validate($headerSearchPeople);
};

const initialize = () => {
  BrowserDetect.init();
  initializePeopleValidator();

  if (queryArgs) {

  }
}
