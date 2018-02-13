import { initialize } from '../Control/js/runner';
import './styles.css';

var addCheckmarksHoverEvents = function addCheckmarksHoverEvents() {
  // add class for bubbles to hovered checkmark
  $('#results tr .checkmark-img').hover(
    function hoverInCallback() {
      $(this).closest('tr').addClass('active-row');
    },
    function hoverOutCallback() {
      $(this).closest('tr').removeClass('active-row');
    },
  );
};

initialize(addCheckmarksHoverEvents);
