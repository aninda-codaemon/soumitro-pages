import amplify from 'utils/amplifyStore';
import peopleValidator from 'form-validators/people';
import { cleanSearchValues } from 'utils/strings';

const getSubmitHandler = onSubmit => function onSearchSubmit(form) {
  // close search menu if it's open (mobile)
  if ($('#nav-icon-toggle').hasClass('active')) {
    $('.navbar-toggle').click();
  }
  let serialArray = $(form).serializeArray();
  let formVals = serialArray.reduce((prev, obj) => {
    prev[obj.name] = obj.name && obj.name.toLowerCase() !== 'age' ? cleanSearchValues(obj.value) : obj.value;
    return prev;
  }, {});
  amplify.store('searchData', formVals);
  onSubmit(formVals);
};

const initializePeopleValidator = ({ onSubmit }) => {
  var $searchForm = $('#search-form');
  var $refineForm = $('#refine-modal-form');
  var $noResultsForm = $('#no-results-form');

  var searchRules = {
    submitHandler: getSubmitHandler(onSubmit),
  };

  peopleValidator.validate($searchForm, searchRules);
  peopleValidator.validate($refineForm, searchRules);
  peopleValidator.validate($noResultsForm, searchRules);

  $('#refine-modal-form').on('submit', () => {
    $('#refine-modal').modal('hide');
  });

  $('.navbar-toggle').click(() => {
    $('#nav-icon-toggle').toggleClass('active');
  });
};

export { initializePeopleValidator };
