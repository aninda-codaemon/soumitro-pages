import _assignIn from 'lodash/assignIn';

import { track } from 'utils/track';

const submitHandler = form => {
  track('Submitted Search Form - Email');
  form.submit();
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