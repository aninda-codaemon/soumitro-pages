import { SEARCH_QUERY } from 'constants/storage'; 
import formValidator from 'form-validators/people';
import amplify from 'utils/amplifyStore';
import { nameize } from 'utils/strings';
import Step from 'components/wizard/step';
import { showExternalModal, hideExternalModal } from '../../Control/steps/shared';

const SAVE_RESULTS_INDEX = 0;
const $searchForm = $('#search-people-form');

const submitHandler = (form, duration, stepCompleted) => {
  const query = $(form).serializeArray().reduce((prev, { name, value }) => {
    prev[name] = value;
    return prev;
  }, {});
  amplify.store(SEARCH_QUERY, query);
  showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX);
}

const initializePeopleValidator = ($form, duration, stepCompleted) => {
  formValidator.validate($form, {
    submitHandler: (form) => submitHandler(form, duration, stepCompleted),
  });
};

function onSearchPeopleStart(stepCompleted) {
  const duration = this.duration;
  const img = $('#crt-acct-load').find('img');
  initializePeopleValidator($searchForm, duration, stepCompleted);
  $searchForm.find('.focus-me').focus();
  img.attr('src', img.attr('data-src'));
}

const searchPeople = Object.assign({}, Step);
const skipSavingResultModal = true;
searchPeople.init({
  title: 'Search for anyone',
  $elem: $('#search-people'),
  duration: 18,
  onStart: onSearchPeopleStart,
  $modal: $('#externalModal'),
  openModal: (stepCompleted, duration) => showExternalModal(stepCompleted, duration, SAVE_RESULTS_INDEX, skipSavingResultModal),
  closeModal: () => hideExternalModal(SAVE_RESULTS_INDEX)
});

export { searchPeople };
