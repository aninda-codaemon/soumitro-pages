import 'jquery-validation';
import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

import {
  popularUseCases,
  socialMediaScan,
  relatives,
  confirmFCRA,
  confirmData,
  preparingMonitoring,
  generatingReport,
} from '../Control/steps';

import {
  searchPeople,
  criminalScan,
  noteOnUserComments,
  saveResults,
} from './steps';


function showSubHeadlines(totalSections) {
  var containerSelector = $('.wizard-content');
  var stepsContainerSelector = $('.wizard-header');
  var stepSelector = $('.wizard-step');
  var sections = $(containerSelector).find(stepSelector);
  var isModal = true;
  var step = 1;
  sections.hide();
  if (isModal) {
    $('#wizModal').on('hidden.bs.modal', () => {
      step = 1;
      $($(`${containerSelector} .wizard-steps-panel .step-number`)
        .removeClass('done')
        .removeClass('doing')[0])
        .toggleClass('doing');
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

function addRelativesModal() {
  section2.steps.splice(2, 0, relatives);
}

function createWizard(options = {}) {
  let popularUseCasesInstance = popularUseCases(options.popularUseCases);
  let noteOnUserCommentsInstance = noteOnUserComments(options.noteOnUserComments);
  let preparingMonitoringInstance = preparingMonitoring(options.preparingMonitoring);
  let confirmDataInstance = confirmData(options.confirmData);
  let criminalScanInstance = criminalScan(options.criminalScan);
  let socialMediaScanInstance = socialMediaScan(options.socialMediaScan);
  let confirmFCRAInstance = confirmFCRA(options.confirmFCRA);
  let saveResultsInstance = saveResults(options.saveResults);
  let generatingReportInstance = generatingReport(options.generatingReport);
  let searchPeopleInstance = searchPeople(options.searchPeople);

  section1.init([popularUseCasesInstance]);
  // NOTE: The relatives would be added dynamically if the person has relatives.
  section2.init([criminalScanInstance,
    socialMediaScanInstance,
    /* RELATIVES */
    noteOnUserCommentsInstance,
    confirmFCRAInstance,
    confirmDataInstance,
  ]);
  section3.init([searchPeopleInstance, saveResultsInstance]);
  section4.init([preparingMonitoringInstance, generatingReportInstance]);

  const wizard = Object.assign({}, WizardManager);
  const sections = [section1, section2, section3, section4];

  wizard.init({
    sections,
    onCompleted() {
      window.location = $('body').data('next-page');
    },
  });
  showSubHeadlines(sections.length);

  return wizard;
}

export { createWizard, addRelativesModal };

