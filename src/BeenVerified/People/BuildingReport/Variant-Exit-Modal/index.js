import { addRelativesModal, createWizard } from 'components/building-report';
import { downsell } from 'utils/downsell';
import { initializeReloadCachedPageHandler } from 'utils/browser';
import { initialize } from '../Control/js/runner';
import './styles.css';

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);

$('#btn-discount').click(() => {
  window.location = $('body').data('next-page');
});

const InitializeDownsell = () => {
  initializeReloadCachedPageHandler();

  downsell.init({
    onBack: {
      elem: '#iModal-dontgo',
    },
    onBreakingPlane: {
      elem: '#iModal-dontgo',
    },
  });
};

InitializeDownsell();

