import { track } from 'utils/track';
import { saveLeads } from 'api/leads';
import * as Mailcheck from 'mailcheck';
// import { mailcheck } from 'mailcheck';


const noop = () => {};
const validateLeadsForm = ($form, onSubmit = noop) => {
  var validator = $form.validate({
    'account[first_name]': 'required',
    'account[last_name]': 'required',
    'user[email]': {
      required: true,
      email: true,
    },
    messages: {
      'account[first_name]': 'Please enter a first name',
      'account[last_name]': 'Please enter a last name',
      'user[email]': 'Please enter a valid email address',
    },
  });
  $form.on('submit', function onFormSubmit(evt) {
    evt.preventDefault();
    if (validator.form()) {
      track('Submitted Lead Form - Success');
      try {
        saveLeads($(this).serializeArray());
        onSubmit();
      } catch (err) {
        track(err);
      }
    }
  });


  $('#lead_email').blur(function(){
    Mailcheck.run({
      email: $(this).val(),
      suggested: function(suggestion){
        $('#email_suggestion a').html(suggestion.full);
        $('#email_suggestion').show();
        $('#email_suggestion').on('click', {suggestion}, function(event){
          $('#lead_email').val(event.data.suggestion.full);
          window.setTimeout(function(){
            $('#lead_email').blur(); }, 250);
        });
      },
      empty: function() {
        $('#email_suggestion').hide();
      }
    });
  });

};

export { validateLeadsForm };
