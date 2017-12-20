import { addRelativesModal, createWizard } from 'components/building-report';
import { initialize } from '../Control/js/runner';

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = false;
initialize(buildingReportInstance, shouldIncludeRelatives);
