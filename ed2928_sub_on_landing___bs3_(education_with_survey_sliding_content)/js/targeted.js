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
    .map(function(params) {
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
  };

  try {
    initialize();
    show();
  } catch (err) {
    show();
    throw err;
  }

  window.targeted = {initialize: initialize};

}(jQuery, _));