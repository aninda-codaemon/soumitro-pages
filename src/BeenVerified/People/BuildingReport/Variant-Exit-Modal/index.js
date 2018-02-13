import { addRelativesModal, createWizard } from 'components/building-report';
import { downsell } from 'utils/downsell';
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
  /* This code makes the downsell works a bit better in safari,
    because the back button has a weird behavior in mobile devices */
  $(window).on('pageshow', (event) => {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });

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

