import { addRelativesModal, createWizard } from 'components/building-report/Variant-Ask-For-Name';
import { initialize } from '../Control/js/runner';
import './style.scss';

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = false;
initialize(buildingReportInstance, shouldIncludeRelatives);
