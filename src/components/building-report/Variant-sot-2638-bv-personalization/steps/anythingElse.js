import Step from 'components/wizard/step';
import { showExternalLoading, hideExternalLoading } from './shared';

const CONTINUE_SESSION_INDEX = 2;

function onAnythingElseStart(stepCompleted) {
  var self = this;
  $('#btn-finalize').on('click', () => {
    showExternalLoading(stepCompleted, self.duration, CONTINUE_SESSION_INDEX);
    $('.r-arrow').hide();
  });

  $('#skip-anything-else').on('click', (e) => {
    e.preventDefault();
    stepCompleted();
  });
}

function createComponent(options = {}) {
  const anythingElseFlow = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Anything Else You Want To Know?',
    $elem: $('#anythingElseModal'),
    duration: 30,
    onStart: onAnythingElseStart,
    $modal: $('#loadingModal'),
    openModal: (stepCompleted, duration) =>
      showExternalLoading(stepCompleted, duration, CONTINUE_SESSION_INDEX),
    closeModal: () => hideExternalLoading(CONTINUE_SESSION_INDEX),
  }, options);

  anythingElseFlow.init(newConfig);
  return anythingElseFlow;
}

export default createComponent;
