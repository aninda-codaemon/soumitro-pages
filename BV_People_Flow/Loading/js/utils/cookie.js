(function () {
  var areCookiesEnabled = function () {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){
        document.cookie="testcookie";
        cookieEnabled = (document.cookie. indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled) ? true : false;
  };

  if (!areCookiesEnabled()) {
    if (typeof heap !== "undefined" && heap.track) {
      heap.track("Cookies Disabled");
    }
  }
}());