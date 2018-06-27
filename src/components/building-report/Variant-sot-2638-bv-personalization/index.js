import 'jquery-validation';

import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

import {
  popularUseCases,
  noteOnUserComments,
  preparingMonitoring,
  confirmData,
  criminalScan,
  socialMediaScan,
  confirmFCRA,
  saveResults,
  generatingReport,
  relatives,
  datingUseCases,
  contactInfoSearch,
  anythingElse,
  monitoringDating,
  fcraDating,
  saveReportDating,
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

function createWizard(options = {}, flowOption = 'other') {
  console.log('Flow option from components index: ', flowOption);
  console.log(options);
  let sectionContainer1 = [];
  let sectionContainer2 = [];
  let sectionContainer3 = [];
  let sectionContainer4 = [];
  let popularUseCasesInstance = popularUseCases(options.popularUseCases);
  let noteOnUserCommentsInstance = noteOnUserComments(options.noteOnUserComments);
  let preparingMonitoringInstance = preparingMonitoring(options.preparingMonitoring);
  let confirmDataInstance = confirmData(options.confirmData);
  let criminalScanInstance = criminalScan(options); // criminalScan(options.criminalScan);
  let socialMediaScanInstance = socialMediaScan(options); // socialMediaScan(options.socialMediaScan);
  let confirmFCRAInstance = confirmFCRA(options.confirmFCRA);
  let saveResultsInstance = saveResults(options.saveResults);
  let generatingReportInstance = generatingReport(options.generatingReport);
  let datingUseCasesInstance = datingUseCases(options.datingUseCases);
  let contactInfoSearchInstance = contactInfoSearch(options.contactInfoSearch);
  let anythingElseInstance = anythingElse(options.anythingElse);
  let monitoringDatingInstance = monitoringDating(options.monitoringDating);fcraDating
  let fcraDatingInstance = fcraDating(options.fcraDating);
  let saveReportDatingInstance = saveReportDating(options.saveReportDating);

  switch (flowOption) {
    case 'dating':
      sectionContainer1 = [datingUseCasesInstance];
      sectionContainer2 = [criminalScanInstance];
      sectionContainer3 = [socialMediaScanInstance];
      sectionContainer4 = [contactInfoSearchInstance, anythingElseInstance, saveReportDatingInstance, monitoringDatingInstance, fcraDatingInstance];
      break;
    default:
      sectionContainer1 = [popularUseCasesInstance];
      sectionContainer2 = [criminalScanInstance, socialMediaScanInstance, noteOnUserCommentsInstance, confirmFCRAInstance];
      sectionContainer3 = [confirmDataInstance];
      sectionContainer4 = [saveResultsInstance, preparingMonitoringInstance, generatingReportInstance];
  }

  section1.init(sectionContainer1);
  // NOTE: The relatives would be added dynamically if the person has relatives.
  section2.init(sectionContainer2);
  section3.init(sectionContainer3);
  section4.init(sectionContainer4);

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