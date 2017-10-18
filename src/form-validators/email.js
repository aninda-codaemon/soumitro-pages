import _assignIn from 'lodash/assignIn';
import base64 from 'hi-base64';

import { track } from 'utils/track';

const submitHandler = (form, event) => {
  const $form = $(form);
  const nextPage = $form.prop('action');
  const urlArray = $form.serializeArray();
  const encodedEmail = encodeURIComponent(base64.encode(urlArray[0].value));

  track('Submitted Search Form - Email');
  event.preventDefault();
  window.location = `${nextPage}?emailaddress=${encodedEmail}`;
};

const defaultOptions = {
  validClass: 'success',
  rules: {
    emailaddress: {
      required: true,
      email: true
    },
  },
  submitHandler,
  messages: {
    emailaddress: "Please enter an Email Address"
  },
  onkeyup: false,
  onclick: false,
  onsubmit: true,
};

const validate = ($form, options = {}) => {
  const newOptions = _assignIn(defaultOptions, options);
  $form.validate(newOptions);
};

export default {
  validate
};