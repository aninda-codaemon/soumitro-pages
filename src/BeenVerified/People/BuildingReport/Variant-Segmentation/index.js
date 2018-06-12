import { track } from 'utils/track/index';
import { addRelativesModal, createWizard, createWizardDating, addRelativesModalDating } from 'components/building-report';
import { initialize } from './js/runner';

let searchSelection;
// const buildingReportInstance = {

//   addRelativesModal: () => addRelativesModal(),
//   wizard: createWizard(),
// };
let buildingReportInstance;
const shouldIncludeRelatives = true;
const shouldGetExtraTeaserDataOnLastStep = true;

$('.headline').hide();
$('.wizContent').hide();

const setBuildingReportInstance = (flowOption) => {
  let buildingReportObject = {};
  switch (flowOption) {
    case 'dating':
      debugger; // eslint-disable-line
      buildingReportObject = {
        addRelativesModalDating: () => addRelativesModalDating(),
        wizard: createWizardDating(),
      };
      break;
    default:
      buildingReportObject = {
        addRelativesModal: () => addRelativesModal(),
        wizard: createWizard(),
      };
      break;
  }
  buildingReportInstance = buildingReportObject;
  return buildingReportInstance;
};

const initiateModalFlow = (flowOption) => {
  $('.initiate-report-wrapper').hide();
  $('.headline').show();
  $('.wizContent').show();
  $('.initiate-report-title-wrapper').hide();

  setBuildingReportInstance(flowOption);

  initialize(
    buildingReportInstance,
    shouldIncludeRelatives,
    shouldGetExtraTeaserDataOnLastStep,
  );
};

$('.option-wrapper').click((e) => {
  searchSelection = e.currentTarget.dataset.search;
  initiateModalFlow(searchSelection);
});

$('#gen-report-confirm2').click(() => {
  initiateModalFlow();
});


function trackGAEvent(searchType) {
  switch (searchType) {
    case 'Search Myself':
      track('UC Segment Choice - Search Myself');
      break;
    case 'Contact Info':
      track('UC Segment Choice - Contact Info');
      break;
    case 'Criminal Records':
      track('UC Segment Choice - Criminal Records');
      break;
    case 'Dating &#38; Cheaters':
      track('UC Segment Choice - Dating Safety');
      break;
    case 'Family Safety':
      track('UC Segment Choice - Family Safety');
      break;
    case 'Professional Use':
      track('UC Segment Choice - Professional Use');
      break;
    case 'Other':
      track('UC Segment Choice - Other');
      break;
    case 'Skip This Step':
      track('UC Segment Choice - Skip This Step');
      break;
    default:
      return searchType;
  }
  return searchType;
}

$('.list-wrapper').click((e) => {
  trackGAEvent(e.target.innerHTML);
});

$('#gen-report-confirm2').click((e) => {
  trackGAEvent(e.target.innerHTML);
});
