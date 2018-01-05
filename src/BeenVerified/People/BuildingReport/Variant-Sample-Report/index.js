import { addRelativesModal, wizard } from 'components/building-report';
import { initialize } from '../Control/js/runner';

import './styles.css';

const buildingReportInstance = {
  addRelativesModal,
  wizard,
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);
