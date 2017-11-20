import { addRelativesModal, wizard } from 'components/building-report/Variant-Ask-For-Name';
import { initialize } from '../Control/js/runner';
import './style.scss';

const buildingReportInstance = {
  addRelativesModal,
  wizard,
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);
