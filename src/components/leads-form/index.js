import { track } from 'utils/track';
import { saveLeads } from 'api/leads';

const validateLeadsForm = $form => {
  var validator = $form.validate({
    'account[first_name]': 'required',
    'account[last_name]': 'required',
    'user[email]': {
      required: true,
      email: true
    },
    messages: {
      'account[first_name]': 'Please enter a first name',
      'account[last_name]': "Please enter a last name",
      'user[email]': 'Please enter a valid email address'
    }
  });
  $form.on('submit', function (evt) {
    evt.preventDefault();
    if (validator.form()) {
      track('Submitted Lead Form - Success');
      try {
        saveLeads($(this).serializeArray());
      } catch (err) { }
    }
  });
};

export { validateLeadsForm };
