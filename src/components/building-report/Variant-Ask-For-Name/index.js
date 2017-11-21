import 'jquery-validation';
import Section from 'components/wizard/section';
import WizardManager from 'components/wizard/manager';

import { popularUseCases } from '../Control/steps/popularUseCases';
import { socialMediaScan } from '../Control/steps/socialMediaScan';
import { relatives } from '../Control/steps/relatives';
import { confirmFCRA } from '../Control/steps/fcraConfirmation';
import { confirmData } from '../Control/steps/confirmData';
import { preparingMonitoring } from '../Control/steps/preparingMonitoring';
import { generatingReport } from '../Control/steps/generatingReport';
import {
  criminalScan,
  noteOnUserComments,
  saveResults,
  searchPeople,
} from './steps';

function showSubHeadlines(totalSections) {
  var containerSelector = $(".wizard-content");
  var stepsContainerSelector = $(".wizard-header");
  var stepSelector = $(".wizard-step");
  var sections = $(containerSelector).find(stepSelector);
  var isModal = true;
  var validateNext = function () { return true; };
  var validateFinish = function () { return true; };
  var step = 1;
  var container = $(containerSelector).find(stepsContainerSelector);
  sections.hide();
  if (isModal) {
    $('#wizModal').on('hidden.bs.modal', function () {
      step = 1;
      $($(containerSelector + " .wizard-steps-panel .step-number")
        .removeClass("done")
        .removeClass("doing")[0])
        .toggleClass("doing");
    });
  }
  $('#wizModal').find(".wizard-steps-panel").remove();
  stepsContainerSelector.prepend('<div class="wizard-steps-panel steps-quantity-' + totalSections + '"></div>');
  var stepsPanel = $('#wizModal').find(".wizard-steps-panel");
  for (var s = 1; s <= 4; s++) {
    stepsPanel.append('<div class="step-number step-' + s + '"><div class="number">' + s + '</div></div>');
  }
  $('#wizModal').find(".wizard-steps-panel .step-" + step).toggleClass("doing").find('.number').html('&nbsp;');
}

function addRelativesModal() {
  section2.steps.splice(2, 0, relatives);
}

const section1 = Object.assign({}, Section);
const section2 = Object.assign({}, Section);
const section3 = Object.assign({}, Section);
const section4 = Object.assign({}, Section);

section1.init([popularUseCases]);
// NOTE: The relatives would be added dynamically if the person has relatives.
section2.init([criminalScan, socialMediaScan, /* RELATIVES */ noteOnUserComments, confirmFCRA, confirmData]);
section3.init([searchPeople, saveResults]);
section4.init([preparingMonitoring, generatingReport]);

const wizard = Object.assign({}, WizardManager);
const sections = [section1, section2, section3, section4];

wizard.init({
  sections,
  onCompleted() {
    window.location = $('body').data('next-page');
  }
});
showSubHeadlines(sections.length);

export { wizard, addRelativesModal };
