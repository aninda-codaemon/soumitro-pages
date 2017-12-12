(function(){

  STEPS = [
    { 
      $elem: $('#fn') , 
      callback: function () {
        new Typed(".first-input", {string: ['John'], typeSpeed: 40});
      }
    },
    { $elem: $('#ln') },
    { $elem: $('#city') },
    { $elem: $('#state') },
    { $elem: $('#state') },
    { $elem: $() },
    { $elem: $() },
    { $elem: $() }
  ];

  idx = 0;

  var animateStep = function(){

    if (cancel) {
      cancelAnimation();
    }
    var elem = STEPS[idx];
    if (idx !== 0) {
      var prev_elem = STEPS[idx - 0];
      prev_elem.$elem.css({'z-index': 0});
    }
    elem.$elem.css({'z-index': 2});
    
    //executed callback
    if (elem.callback) {
      elem.callback();
    }

    if (idx === STEPS.length - 1) {
      // cancelAnimation();
      return
    } else {
      idx++;
      window.setTimeout(function(){ animateStep(); }, 5000);
    }

  };

  var cancelAnimation = function() {
    cancel = true;
    $('.overlay-container').hide();
  };
  var initialize = function() {
    cancel = false;

    $('.overlay-container').show();
    window.setTimeout(function(){ animateStep(); }, 1000);
    $('#skip-animation').click(function(){
      cancelAnimation();
    });
  };

  initialize();
})();
