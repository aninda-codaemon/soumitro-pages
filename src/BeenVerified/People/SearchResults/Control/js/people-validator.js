import amplify from 'utils/amplifyStore';
import peopleValidator from 'form-validators/people';
import { cleanSearchValues } from 'utils/strings';

const MODIFY_YOUR_SEARCH = 'search-form';
const SKIP_SEG_FILE = '2597_263';

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
  if (form.id === MODIFY_YOUR_SEARCH && window.location.href.indexOf(SKIP_SEG_FILE) >= 0) {
    const args = $(form).serialize();
    const { origin, pathname } = window.location;
    window.location = `${origin}${pathname}?${args}`;
  }
  onSubmit(formVals);
};

const initializePeopleValidator = ({ onSubmit }) => {
  var $searchForm = $(`#${MODIFY_YOUR_SEARCH}`);
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
