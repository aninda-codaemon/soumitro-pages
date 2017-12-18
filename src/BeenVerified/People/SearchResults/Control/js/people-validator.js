import amplify from 'utils/amplifyStore';
import peopleValidator from 'form-validators/people';

var searchRules = {
  submitHandler: () => {},
  rules: {
    fn: {
      required: true,
      notEmail: true,
    },
    ln: {
      required: true,
      notEmail: true,
    },
    mi: {
      notEmail: true,
    },
    age: {
      notEmail: true,
    },
    city: {
      notEmail: true,
    },
  },
};

const getSubmitHandler = onSubmit => function onSearchSubmit(form) {
  // close search menu if it's open (mobile)
  if ($('#nav-icon-toggle').hasClass('active')) {
    $('.navbar-toggle').click();
  }
  let serialArray = $(form).serializeArray();
  let formVals = serialArray.reduce((prev, obj) => {
    prev[obj.name] = obj.value;
    return prev;
  }, {});
  amplify.store('searchData', formVals);
  onSubmit(formVals);
};

const initializePeopleValidator = ({ onSubmit }) => {
  var $searchForm = $('#search-form');
  var $refineForm = $('#refine-modal-form');
  var $noResultsForm = $('#no-results-form');

  searchRules.submitHandler = getSubmitHandler(onSubmit);

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
