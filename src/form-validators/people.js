import _assignIn from 'lodash/assignIn';

import { track } from 'utils/track';

$.validator.addMethod('notEmail', function (value, element) {
  return this.optional(element) || !/^[ a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?(?:\.[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?)*$/.test(value);
}, 'Email addresses are not searchable here');

const submitHandler = form => {
  track('Submitted Search Form - People');
  form.submit();
};

const defaultOptions = {
  validClass: 'success',
  rules: {
    fn: {
      required: true,
      notEmail: true
    },
    ln: {
      required: true,
      notEmail: true
    },
  },
  submitHandler,
  messages: {
    fn: 'Please enter a first name',
    ln: 'Please enter a last name'
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