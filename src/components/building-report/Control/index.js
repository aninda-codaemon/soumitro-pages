import 'jquery-validation';

import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

import {
  initiateQuestion,
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
} from './steps';

const section1 = Object.assign({}, Section);
const section2 = Object.assign({}, Section);
const section3 = Object.assign({}, Section);
const section4 = Object.assign({}, Section);
const section5 = Object.assign({}, Section);

function addRelativesModal(options = {}) {
  let relativesInstance = relatives(options.relatives);
  section3.steps.splice(2, 0, relativesInstance);
}

function createWizard(options = {}) {
  let initiateQuestionInstance = initiateQuestion(options.initiateQuestion);
  let popularUseCasesInstance = popularUseCases(options.popularUseCases);
  let noteOnUserCommentsInstance = noteOnUserComments(options.noteOnUserComments);
  let preparingMonitoringInstance = preparingMonitoring(options.preparingMonitoring);
  let confirmDataInstance = confirmData(options.confirmData);
  let criminalScanInstance = criminalScan(options.criminalScan);
  let socialMediaScanInstance = socialMediaScan(options.socialMediaScan);
  let confirmFCRAInstance = confirmFCRA(options.confirmFCRA);
  let saveResultsInstance = saveResults(options.saveResults);
  let generatingReportInstance = generatingReport(options.generatingReport);

  section1.init([initiateQuestionInstance]);

  section2.init([popularUseCasesInstance]);
  // NOTE: The relatives would be added dynamically if the person has relatives.
  section3.init([
    criminalScanInstance,
    socialMediaScanInstance,
    /* RELATIVES */
    noteOnUserCommentsInstance,
    confirmFCRAInstance,
  ]);
  section4.init([confirmDataInstance]);
  section5.init([
    saveResultsInstance,
    preparingMonitoringInstance,
    generatingReportInstance,
  ]);

  const wizard = Object.assign({}, WizardManager);
  const sections = [section1, section2, section3, section4, section5];

  wizard.init({
    sections,
    onCompleted() {
      window.location = `${$('body').data('next-page')}?hide-fcra=true`;
    },
  });

  let subTitle = 'Click the closest option for your needs, so we can customize your experience.';

  $('.modal-header')
    .append($('<p/>').addClass('subheader-text').text(subTitle));

  return wizard;
}

export { createWizard, addRelativesModal };
