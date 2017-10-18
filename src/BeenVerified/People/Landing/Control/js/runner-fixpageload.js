/**
 * Targeted Content P.O.C.
 */
(function ($, _) {
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

  var initialize = function () {
    var query = window.location.search.substring(1),
      queryArgs = parseQueryArgs(query);

    var referrer = window.referrer;

    if (queryArgs) {
      $dynamicElems = findDynamicContent();
      displayTargetedContent(queryArgs, $dynamicElems);
    }
    //mask for phone input
    $("#phone").mask('(000) 000-0000');
  };

  try {
    initialize();
  } catch (err) {
    throw err;
  }

  window.targeted = {
    initialize: initialize
  };

}(jQuery, _));
