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

  var BrowserDetect = {
    init: function() {
      this.browser = this.searchString(this.dataBrowser) || 'Other';
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function(data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        this.versionSearchString = data[i].subString;

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      }
    },
    searchVersion: function(dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }

      var rv = dataString.indexOf('rv:');
      if (this.versionSearchString === 'Trident' && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3));
      } else {
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }
    },

    dataBrowser: [{
      string: navigator.userAgent,
      subString: 'Edge',
      identity: 'MS Edge'
    }, {
      string: navigator.userAgent,
      subString: 'Chrome',
      identity: 'Chrome'
    }, {
      string: navigator.userAgent,
      subString: 'MSIE',
      identity: 'Explorer'
    }, {
      string: navigator.userAgent,
      subString: 'Trident',
      identity: 'Explorer'
    }, {
      string: navigator.userAgent,
      subString: 'Firefox',
      identity: 'Firefox'
    }, {
      string: navigator.userAgent,
      subString: 'Safari',
      identity: 'Safari'
    }, {
      string: navigator.userAgent,
      subString: 'Opera',
      identity: 'Opera'
    }]
  };

  // Back To Top
  $('#scrollTop').click(function() {
    $('html, body').animate({
      scrollTop: $('.header').offset().top
    }, 500);
  });

  var $headerSearchPeople = $('#header-search-people');

  $headerSearchPeople.validate({
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

  var init = function() {
    BrowserDetect.init();

    $('.autofocus').focus();
  };

  init();
}());
