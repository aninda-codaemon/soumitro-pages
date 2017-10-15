import mask from 'jquery-mask-plugin';
import _assignIn from 'lodash/assignIn';
import { track } from 'utils/track';

const PHONE_MASK = '(000) 000-0000';
const PHONE_REGEX = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/;
const INVALID_PHONE_MESSAGE = 'Please enter a valid phone number. e.g. (212) 555-6789';
const MAX_CHARACTERS_PHONE_NUMBER = 9;
const defaultOptions = {
  validClass: 'success',
  rules: {
    phone: {
      required: true,
      phoneUS: true
    }
  },
  messages: {
    phone: INVALID_PHONE_MESSAGE
  }
};

$.validator.addMethod('phoneUS', function(phoneNumber, element) {
  phoneNumber = phoneNumber.replace(/\s+/g, '');
  return this.optional(element) || phoneNumber.length > MAX_CHARACTERS_PHONE_NUMBER && phoneNumber.match(PHONE_REGEX);
}, INVALID_PHONE_MESSAGE);

const basicSubmitActions = () => {
  track('Submitted Search Form - Phone');
}

const validate = ($form, $phoneField, options) => {
  const newOptions = _assignIn(defaultOptions, options);
  newOptions.submitHandler = (...args) => {
    basicSubmitActions(...args);
    options.submitHandler && options.submitHandler(...args);;
  }
  $phoneField.mask(PHONE_MASK);
  $form.validate(newOptions);
};

export default {
  validate
};
