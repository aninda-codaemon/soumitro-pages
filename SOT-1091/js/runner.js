(function () {
  // NoLimit/Heap init
  var trackNL = function (evtName, props) {
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
    trackNL("Safari Private Browsing");
  }

  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        this.versionSearchString = data[i].subString;

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }

      var rv = dataString.indexOf("rv:");
      if (this.versionSearchString === "Trident" && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3));
      } else {
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }
    },

    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Edge",
        identity: "MS Edge"
      },
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
      },
      {
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
      },
      {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
      }
        ]
  };

  // Back To Top
  $('#scrollTop').click(function () {
    $('html, body').animate({
      scrollTop: $('.header').offset().top
    }, 500);
  });

  // @TODO: validate search

  //if ($headerSearchPeople.length !== 0) {
  //
  //  $headerSearchPeople.validate({
  //    validClass: "success",
  //
  //    rules: {
  //      fn: "required",
  //      ln: "required"
  //    },
  //    messages: {
  //      fn: "Please enter a first name",
  //      ln: "Please enter a last name"
  //    },
  //
  //    onkeyup: false,
  //    onclick: false,
  //    onsubmit: true,
  //    submitHandler: function (form) {
  //      trackNL("Submitted Search Form - People");
  //      window.setTimeout(function () {
  //        form.submit();
  //      }, REQUEST_DELAY);
  //    }
  //  });
  //
  //}

  var init = function () {
    BrowserDetect.init();

    $('.focus-me').focus();
  };

  init();
}());


/**
 * Targeted Content P.O.C.
 */
(function ($, _) {

  var bv_info = {

  };

  /*
   * @private
   * Parses query arguments and returns them as an object.
   */
  var parseQueryArgs = function (query) {
    if (!query) {
      return null;
    }
    var args = _
      .chain(query.split('&'))
      .map(function (params) {
        var p = params.split('=');
        var key = p[0];
        var val = window.decodeURIComponent(p[1]);
        val = val.replace(/\/+$/g, ""); // clean up trailing slash
        val = val.replace(/\+/g, " "); // replace white spaces
        return [key, val];
      })
      .object()
      .value();
    return args;
  };

  var findDynamicContent = function () {
    return $("[data-bv-content]");
  };

  var displayTargetedContent = function (queryArgs, $dynamicElems) {
    var ref = queryArgs.pagetype,
      kw = ref && ref.toLowerCase().replace(' ', '');

    if (!ref) return;

    _.forEach($dynamicElems, function (elem) {
      var $elem = $(elem),
        $defaults = $elem.find("[data-bv-ref=default]");
      $target = $elem.find("[data-bv-ref=" + kw + "]");
      if (!$target || $target.length === 0) {
        $defaults.show();
      } else {
        $defaults.hide();
        $target.show();
      }
    });
  };

  var show = function () {
    $("body").removeClass("hide");
  };

  var decodeSearchArgs = function (keywordString) {
    var keywords = keywordString.split('+');
    keywords = _.map(keywords, function (kw) {
      if (kw) {
        return kw.toLowerCase();
      }
      return kw;
    });
    return keywords;
  };

  var initialize = function () {
    var query = window.location.search.substring(1),
      queryArgs = parseQueryArgs(query);

    var referrer = window.referrer;

    if (queryArgs) {
      $dynamicElems = findDynamicContent();
      displayTargetedContent(queryArgs, $dynamicElems);
    }
    $('#navCollapse').on('hidden.bs.collapse', function () {
      // do something…
      $('#nav-icon-closed').show();
      $('#nav-icon-open').hide();
    });
    $('#navCollapse').on('shown.bs.collapse', function () {
      // do something…
      $('#nav-icon-closed').hide();
      $('#nav-icon-open').show();
    });
    //mask for phone input
    $("#phone").mask('(000) 000-0000');
  };

  try {
    initialize();
    show();
  } catch (err) {
    show();
    throw err;
  }

  window.targeted = {
    initialize: initialize
  };

}(jQuery, _));
