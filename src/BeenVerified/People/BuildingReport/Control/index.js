import { addRelativesModal, createWizard } from 'components/building-report';
import { initialize } from './js/runner';

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);
