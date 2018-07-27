import { track } from 'utils/track/index';
import Step from 'components/wizard/step';
import { showExternalLoading, hideExternalLoading } from './shared';

const CONTINUE_SESSION_INDEX = 2;

function onAnythingElseStart(stepCompleted) {
  var self = this;
  const flowName = $('.flow-identifier').attr('data-flow').toLowerCase();
  const test = (chkVal) => {
    console.log('Checkbox value: ', chkVal);
  };

  $('#btn-finalize-contact').on('click', () => {
    if ($('input[name="contact-checkboxes"]:checkbox').is(':checked')) {
      $('input[name="contact-checkboxes"]:checkbox:checked').map(function(){
        const $el = $(this);        
        const gaMessage = `uc segment - ${flowName} - more info checkbox, ${$el.attr('value')}`;
        track(gaMessage);
        test(gaMessage);
      });   
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
