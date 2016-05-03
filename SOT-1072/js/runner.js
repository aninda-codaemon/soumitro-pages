(function() {

    var trackNL = function(evtName, props) {
      if (typeof nolimit !== 'undefined' && nolimit.track) {
        if (props) {
          nolimit.track(evtName, props);
        } else {
          nolimit.track(evtName);
        }
      }
      if (typeof heap !== 'undefined' && heap.track) {
        if (props) {
          heap.track(evtName, props);
        } else {
          heap.track(evtName);
        }
      }
    };

  	// Test for Safari private browsing mode
    try { localStorage.test = 2; } catch (e) {
      trackNL("Safari Private Browsing");
    }

}());

// Set current year in footer
(function() {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');

    $currentYear.html(currentYear);
}());
