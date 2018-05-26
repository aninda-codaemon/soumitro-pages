import { track } from 'utils/track';
import { initialize } from './js/runner';

// GA Tracking event by search result position
$('#results').click((event) => {
  let expectedTarget = $(event.target).closest('tr.results-row');
  if (/results-row/.test(expectedTarget.attr('class'))) {
    let position = expectedTarget.data('position');
    track(`Search Result Position: ${++position}`);
  }
});

initialize();
