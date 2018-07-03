import Step from 'components/wizard/step';

function onProfileSearchStart(stepCompleted) {
  var { duration } = this;
  const $progressBar = $('#prof-profile-search-progress-bar .progress-bar');
  var barProgress = $progressBar.animate(
    { width: '100%' },
    { duration },
  );
  $.when(barProgress).done(stepCompleted);
}

function createComponent(options = {}) {
  const profileSearch = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Professional Profile Search',
    $elem: $('#professionalProfileSearch'),
    onStart: onProfileSearchStart,
    duration: 30,
  }, options);

  profileSearch.init(newConfig);
  return profileSearch;
}

export default createComponent;
