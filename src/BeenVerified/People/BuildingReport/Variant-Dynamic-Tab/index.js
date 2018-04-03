import { addRelativesModal, createWizard } from 'components/building-report';
import { initialize } from '../Control/js/runner';
import * as localStorage from 'utils/localStorage';
import amplify from 'utils/amplifyStore';

let options = {
  popularUseCases: {
    duration: 24,
  },
  socialMediaScan: {
    duration: 24,
  },
  saveResults: {
    duration: 9,
  },
  generatingReport: {
    duration: 90,
  },
  confirmFCRA: {
    duration: 16,
  },
};

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(options),
};

const shouldIncludeRelatives = false;
initialize(buildingReportInstance, shouldIncludeRelatives);

// let tabTitle = document.title;
let isOldTitle;

const changeTabTitle = (isOldTitle2 = true) => {
  if (isOldTitle2) {
    document.title = 'Report is Ready';
    isOldTitle = false;
  } else {
    document.title = 'Building BeenVerified Report';
    isOldTitle = true;
  }
};

const initiateTitleToggle = () => {
  setInterval(() => { changeTabTitle(isOldTitle); }, 2000);
};

setTimeout(initiateTitleToggle(), 14500);
