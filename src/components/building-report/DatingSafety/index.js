import 'jquery-validation';

import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

import {
  datingUseCases,
  noteOnUserComments,
  preparingMonitoring,
  confirmData,
  criminalScan,
  socialMediaScan,
  confirmFCRA,
  saveResults,
  generatingReport,
  relatives,
} from './steps';

function showSubHeadlines(totalSections) {
  var containerSelector = $('.wizard-content');
  var stepsContainerSelector = $('.wizard-header');
  var stepSelector = $('.wizard-step');
  var sections = $(containerSelector).find(stepSelector);
  var isModal = true;
  var step = 1;
  sections.hide();
  $(sections[0]).show();
  if (isModal) {
    $('#wizModal').on('hidden.bs.modal', () => {
      step = 1;
      $($(`${containerSelector} .wizard-steps-panel .step-number`)
        .removeClass('done')
        .removeClass('doing')[0])
        .toggleClass('doing');

      $($(`${containerSelector} .wizard-step`)
        .hide()[0])
        .show();
    });
  }
  $('#wizModal').find('.wizard-steps-panel').remove();
  stepsContainerSelector.prepend(`<div class="wizard-steps-panel steps-quantity-${totalSections}"></div>`);
  let stepsPanel = $('#wizModal').find('.wizard-steps-panel');
  for (let s = 1; s <= 4; s++) {
    stepsPanel.append(`<div class="step-number step-${s}"><div class="number">${s}</div></div>`);
  }
  $('#wizModal')
    .find(`.wizard-steps-panel .step-${step}`)
    .toggleClass('doing')
    .find('.number')
    .html('&nbsp;');
}

const section1 = Object.assign({}, Section);
const section2 = Object.assign({}, Section);
const section3 = Object.assign({}, Section);
const section4 = Object.assign({}, Section);

function addRelativesModal(options = {}) {
  let relativesInstance = relatives(options.relatives);
  section2.steps.splice(2, 0, relativesInstance);
}

function createWizard(options = {}) {
  let datingUseCasesInstance = datingUseCases(options.datingUseCases);
  let noteOnUserCommentsInstance = noteOnUserComments(options.noteOnUserComments);
  let preparingMonitoringInstance = preparingMonitoring(options.preparingMonitoring);
  let confirmDataInstance = confirmData(options.confirmData);
  let criminalScanInstance = criminalScan(options.criminalScan);
  let socialMediaScanInstance = socialMediaScan(options.socialMediaScan);
  let confirmFCRAInstance = confirmFCRA(options.confirmFCRA);
  let saveResultsInstance = saveResults(options.saveResults);
  let generatingReportInstance = generatingReport(options.generatingReport);

  section1.init([datingUseCasesInstance]);
  // NOTE: The relatives would be added dynamically if the person has relatives.
  section2.init([
    criminalScanInstance,
    socialMediaScanInstance,
    /* RELATIVES */
    noteOnUserCommentsInstance,
    confirmFCRAInstance,
  ]);
  section3.init([confirmDataInstance]);
  section4.init([
    saveResultsInstance,
    preparingMonitoringInstance,
    generatingReportInstance,
  ]);

  const wizard = Object.assign({}, WizardManager);
  const sections = [section1, section2, section3, section4];

  wizard.init({
    sections,
    onCompleted() {
      window.location = `${$('body').data('next-page')}?hide-fcra=true`;
    },
  });

  showSubHeadlines(sections.length);

  return wizard;
}

export { createWizard, addRelativesModal };
