import { track } from 'utils/track/index';
import { addRelativesModal, createWizard } from 'components/building-report';
import { initialize } from './js/runner';


const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = true;
const shouldGetExtraTeaserDataOnLastStep = true;

$('.headline').hide();
$('.wizContent').hide();

const initiateModalFlow = () => {
  $('.initiate-report-wrapper').hide();
  $('.headline').show();
  $('.wizContent').show();
  $('.initiate-report-title-wrapper').hide();
  initialize(
    buildingReportInstance,
    shouldIncludeRelatives,
    shouldGetExtraTeaserDataOnLastStep,
  );
};

$('.option-wrapper').click(() => {
  initiateModalFlow();
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
      track('US Segment Choice - Professional Use');
      break;
    case 'Other':
      track('US Segment Choice - Other');
      break;
    case 'Skip This Step':
      track('US Segment Choice - Skip This Step');
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
