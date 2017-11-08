import { initialize } from '../Control/js/runner';
import { downsell } from 'utils/downsell';
import './styles.css';

const shouldIncludeRelatives = true;
initialize(shouldIncludeRelatives);

//discount button event
$('#btn-discount').click(function () {
    window.location = $('body').data('next-page');
});

//Init downsell
(function addDontExitPlugin() {
    downsell.init({
        onBack: {
            elem: "#iModal-dontgo",
            cb: function() {}
        },
        onBreakingPlane: {
            elem: "#iModal-dontgo",
            cb: function() {}
        }
  });
})()
