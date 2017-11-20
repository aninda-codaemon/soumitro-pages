import { SEARCH_QUERY } from 'constants/storage'; 
import formValidator from 'form-validators/people';
import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from 'components/wizard/step';

const $searchForm = $('#search-people-form');

const submitHandler = (form, stepCompleted) => {
  const query = $(form).serializeArray().reduce((prev, { name, value }) => {
    prev[name] = value;
    return prev;
  }, {});
  amplify.store(SEARCH_QUERY, query);
  stepCompleted();
}

const initializePeopleValidator = ($form, stepCompleted) => {
  formValidator.validate($form, {
    submitHandler: (form) => submitHandler(form, stepCompleted),
  });
};

function onSearchPeopleStart(stepCompleted) {
  var duration = this.duration;
  initializePeopleValidator($searchForm, stepCompleted);
  $searchForm.find('.focus-me').focus();
}

const searchPeople = Object.assign({}, Step);
searchPeople.init({
  title: 'Search for anyone',
  $elem: $('#search-people'),
  onStart: onSearchPeopleStart,
});

export { searchPeople };
