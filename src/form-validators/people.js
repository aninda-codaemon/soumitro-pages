import 'jquery-validation';
import _assignIn from 'lodash/assignIn';

import { track } from 'utils/track';

$.validator.addMethod('notEmail', function notEmail(value, element) {
  return this.optional(element) || !/^[ a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?(?:\.[ a-zA-Z0-9](?:[ a-zA-Z0-9-]{0,61}[ a-zA-Z0-9])?)*$/.test(value); // eslint-disable-line
}, 'Email addresses are not searchable here');

$.validator.addMethod('atLeastOneLetter', value => (value ? /[a-z]+/i.test(value) : true), 'Alphabetic characters required');

$.validator.addMethod('noEmptySpacesOnly', value => (value === '' || value.trim().length !== 0), 'Empty/blank search not allow');

$.validator.addMethod('numbersOrEmpty', value => (value.trim() === '' || (value.trim() !== '' && /^[0-9]+$/.test(value))), 'Only #s allow');

const submitHandler = (form) => {
  track('Submitted Search Form - People');
  form.submit();
};

const defaultOptions = {
  validClass: 'success',
  rules: {
    fn: {
      required: true,
      notEmail: true,
      noEmptySpacesOnly: true,
      atLeastOneLetter: true,
    },
    ln: {
      required: true,
      notEmail: true,
      noEmptySpacesOnly: true,
      atLeastOneLetter: true,
    },
    mi: {
      notEmail: true,
      atLeastOneLetter: true,
    },
    age: {
      notEmail: true,
      numbersOrEmpty: true,
    },
    city: {
      notEmail: true,
      atLeastOneLetter: true,
    },
  },
  submitHandler,
  messages: {
    fn: 'Please enter a first name',
    ln: 'Please enter a last name',
    mi: 'Please enter valid middle name',
    city: 'Please enter valid city',
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
  validate,
};
