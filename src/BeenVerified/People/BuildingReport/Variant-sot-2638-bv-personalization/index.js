import { track } from 'utils/track/index';
import { addRelativesModal, createWizard } from 'components/building-report/Variant-sot-2638-bv-personalization/';
import { initialize } from './js/runner';

// const shouldIncludeRelatives = true;
const shouldGetExtraTeaserDataOnLastStep = true;

$('.headline').hide();
$('.wizContent').hide();

const getBuildingReportInstance = (flowOption) => {
  let buildingReportObject = {};

  switch (flowOption) {
    case 'other':
      buildingReportObject = {
        addRelativesModal: () => addRelativesModal(),
        wizard: createWizard({'socialMediaScan': {'headerToDisplay': 1}}, flowOption),
      };
      break;
    case 'myself':
      buildingReportObject = {
        wizard: createWizard({'criminalScanRecords': {'headerToDisplay': 2}, 'socialMediaScan': {'headerToDisplay': 3}, 'anyThingElseProfessional': {'headerToDisplay': 1}}, flowOption),
      };
      break;
    case 'family':
      buildingReportObject = {
        wizard: createWizard({'criminalScanRecords': {'headerToDisplay': 3}, 'socialMediaScan': {'headerToDisplay': 4}, 'anyThingElseProfessional': {'headerToDisplay': 2}}, flowOption),
      };
      break;
    case 'dating':
      buildingReportObject = {
        wizard: createWizard({'criminalScanRecords': {'headerToDisplay': 4}, 'socialMediaScan': {'headerToDisplay': 5}}, flowOption),
      };
      break;
    case 'professional':
      buildingReportObject = {
        wizard: createWizard({'anyThingElseProfessional': {'headerToDisplay': 3}}, flowOption),
      };
      break;
    case 'contact':
      buildingReportObject = {
        wizard: createWizard({'socialMediaScan': {'headerToDisplay': 2}}, flowOption),
      };
      break;
    default:
      buildingReportObject = {
        wizard: createWizard({}, flowOption),
      };
  }
  return buildingReportObject;
};

const initiateModalFlow = (flowOption) => {
  let shouldIncludeRelatives = false;
  $('.initiate-report-wrapper').hide();
  $('.headline').show();
  $('.wizContent').show();
  $('.initiate-report-title-wrapper').hide();

  const buildingReportInstance = getBuildingReportInstance(flowOption);

  if (flowOption === 'other') {
    shouldIncludeRelatives = true;
  }

  initialize(
    buildingReportInstance,
    shouldIncludeRelatives,
    shouldGetExtraTeaserDataOnLastStep,
  );
};

function trackGAEvent(searchType) {
  switch (searchType) {
    case 'myself':
      track('UC Segment Choice - Search Myself');
      break;
    case 'contact':
      track('UC Segment Choice - Contact Info');
      break;
    case 'records':
      track('UC Segment Choice - Criminal Records');
      break;
    case 'dating':
      track('UC Segment Choice - Dating Safety');
      break;
    case 'family':
      track('UC Segment Choice - Family Safety');
      break;
    case 'professional':
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

$('.option-wrapper').click((e) => {
  e.stopPropagation();
  let searchSelection = e.currentTarget.dataset.search;
  trackGAEvent(searchSelection);
  initiateModalFlow(searchSelection);
});

$('#gen-report-confirm2').click(() => {
  trackGAEvent('other');
  initiateModalFlow('other');
});
