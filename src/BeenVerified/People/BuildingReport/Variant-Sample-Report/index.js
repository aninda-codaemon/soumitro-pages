import { addRelativesModal, wizard } from 'components/building-report';
import { initialize } from './js/runner';

const buildingReportInstance = {
  addRelativesModal,
  wizard,
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);
