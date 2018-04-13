import { addRelativesModal, createWizard } from 'components/building-report';
import { initialize } from '../Control/js/runner';

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

let isOldTitleToggle;
const triggerToggleTime = 105000;
const toggleIntervalTime = 2000;

const changeTabTitle = (isOldTitle = true) => {
  if (isOldTitle) {
    document.title = 'Report is Waiting';
    isOldTitleToggle = false;
  } else {
    document.title = 'Building BeenVerified Report';
    isOldTitleToggle = true;
  }
};

const initiateTitleToggle = () => {
  setInterval(() => { changeTabTitle(isOldTitleToggle); }, toggleIntervalTime);
};

setTimeout(initiateTitleToggle, triggerToggleTime);
