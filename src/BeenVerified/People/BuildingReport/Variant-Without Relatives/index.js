import { addRelativesModal, wizard } from 'components/building-report';
import { initialize } from '../Control/js/runner';

const buildingReportInstance = {
  addRelativesModal,
  wizard,
};
const shouldIncludeRelatives = false;
initialize(buildingReportInstance, shouldIncludeRelatives);
