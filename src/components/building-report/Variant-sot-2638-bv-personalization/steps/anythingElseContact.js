import Step from 'components/wizard/step';
import { showExternalLoading, hideExternalLoading } from './shared';

const CONTINUE_SESSION_INDEX = 2;

function onAnythingElseStart(stepCompleted) {
  var self = this;
  $('#btn-finalize-contact').on('click', () => {
    if ($('input[name="contact-checkboxes"]:checkbox').is(':checked')) {      
      showExternalLoading(stepCompleted, self.duration, CONTINUE_SESSION_INDEX);
      $('.r-arrow').hide();
    } else {      
      stepCompleted();
    }
  });

  $('#skip-anything-else-contact').on('click', (e) => {
    e.preventDefault();
    stepCompleted();
  });
}

function createComponent(options = {}) {
  const anythingElseFlow = Object.assign({}, Step);
  let newConfig = Object.assign({
    title: 'Anything Else You Want To Know?',
    $elem: $('#anythingElseModalContact'),
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
