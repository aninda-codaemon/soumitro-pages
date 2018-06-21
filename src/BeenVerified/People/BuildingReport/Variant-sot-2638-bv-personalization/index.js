import { track } from 'utils/track/index';
import { addRelativesModal, createWizard } from 'components/building-report/Variant-sot-2638-bv-personalization/';
import { initialize } from './js/runner';

const shouldIncludeRelatives = true;
const shouldGetExtraTeaserDataOnLastStep = true;

$('.headline').hide();
$('.wizContent').hide();

const getBuildingReportInstance = (flowOption) => {
  let buildingReportObject = {};

  // switch (flowOption) {
  //   // case 'dating':
  //   //   // buildingReportObject = {
  //   //   //   addRelativesModalDating: () => addRelativesModalDating(),
  //   //   //   wizard: createWizardDating(),
  //   //   // };
  //   //   // return buildingReportObject;
  //   //   console.log('Option Dating');
  //   //   buildingReportObject = {
  //   //     addRelativesModal: () => addRelativesModal(),
  //   //     wizard: createWizard({}, flowOption),
  //   //   };
  //   // case 'myself':
  //   //   console.log('Option myself');
  //   //   buildingReportObject = {
  //   //     addRelativesModal: () => addRelativesModal(),
  //   //     wizard: createWizard({}, flowOption),
  //   //   };
  //   // default:
  //   //   buildingReportObject = {
  //   //     addRelativesModal: () => addRelativesModal(),
  //   //     wizard: createWizard(),
  //   //   };
  //   //   return buildingReportObject;
  // }

  console.log('Initialised Build Report with option: ', flowOption);
  buildingReportObject = {
    addRelativesModal: () => addRelativesModal(),
    wizard: createWizard({}, flowOption),
  };
  return buildingReportObject;
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
  e.stopPropagation();
  let searchSelection = e.currentTarget.dataset.search;
  console.log('From option wrapper: ', searchSelection);
  initiateModalFlow(searchSelection);
});

$('#gen-report-confirm2').click(() => {
  initiateModalFlow('other');
});


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
  let searchOption = e.currentTarget.dataset.search;
  trackGAEvent(searchOption);
});

$('#gen-report-confirm2').click((e) => {
  trackGAEvent('other');
});
