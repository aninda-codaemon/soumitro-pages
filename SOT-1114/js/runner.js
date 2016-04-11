(function() {
  // NoLimit/Heap init
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
  try {
    localStorage.test = 2;
  } catch (e) {
    trackNL('Safari Private Browsing');
  }

  var $searchForm = $('.search-form');

  $searchForm.validate({
    validClass: "success",

    rules: {
      fn: "required",
      ln: "required"
    },
    messages: {
      fn: "Please enter a first name",
      ln: "Please enter a last name"
    },

    onkeyup: false,
    onclick: false,
    onsubmit: true,
    submitHandler: function(form) {
      trackNL("Submitted Search Form - People");
      window.setTimeout(function() {
        form.submit();
      }, REQUEST_DELAY);
    }
  });

  // @TODO: fix affix (lol)

  $('#share').affix({
    offset: {
      top: 180,
      bottom: function () {
        return (this.bottom = $('.search-footer').outerHeight(true))
      }
    }
  });

  var init = function() {
    $('.autofocus').focus();
  };

  init();
}());
