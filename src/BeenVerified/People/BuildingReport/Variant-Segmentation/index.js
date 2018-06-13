import { track } from 'utils/track/index';
import { addRelativesModal, createWizard, createWizardDating, addRelativesModalDating } from 'components/building-report';
import { initialize } from './js/runner';

const shouldIncludeRelatives = true;
const shouldGetExtraTeaserDataOnLastStep = true;

$('.headline').hide();
$('.wizContent').hide();

const getBuildingReportInstance = (flowOption) => {
  let buildingReportObject = {};
  switch (flowOption) {
    case 'dating':
      buildingReportObject = {
        addRelativesModalDating: () => addRelativesModalDating(),
        wizard: createWizardDating(),
      };
      return buildingReportObject;
    default:
      buildingReportObject = {
        addRelativesModal: () => addRelativesModal(),
        wizard: createWizard(),
      };
      return buildingReportObject;
  }
};

const initiateModalFlow = (flowOption) => {
  $('.initiate-report-wrapper').hide();
  $('.headline').show();
  $('.wizContent').show();
  $('.initiate-report-title-wrapper').hide();

  const buildingReportInstance = getBuildingReportInstance(flowOption);

  initialize(
    buildingReportInstance,
    shouldIncludeRelatives,
    shouldGetExtraTeaserDataOnLastStep,
  );
};

$('.option-wrapper').click((e) => {
  let searchSelection = e.currentTarget.dataset.search;
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
