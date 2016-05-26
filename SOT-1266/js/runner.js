;(function ($) {
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

  var reportHeap = function (evt, opt) {
    if (typeof window.heap !== "undefined" && heap.track) {
      heap.track(evt, opt);
    }
  };

  // Test for Safari private browsing mode
  try {
    localStorage.test = 2;
  } catch (e) {
    trackNL('Safari Private Browsing');
  }

  // Make sure the first plan is selected - IE10 fix
  var $planRows = $("input[name=subscription_plan_name]");
  if ($planRows.length > 0) {
    $planRows[0].click();
  }

  // Initialize cvv popover for Bootstrap 3
  $('.img-cards').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      title:'<h6 class="title">What is a Security Code?</h6>',
      html: true,
      content: function () {
        return '<p class="sub-title">Visa, MasterCard, and Discover</p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6"><p class="popover-text"><strong class="text-break">Back of Card</strong>Three digits located on the right of the signature strip.</p></div></div><p class="sub-title">American Express</p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6"><p class="popover-text"><strong class="text-break">Front of Card</strong>Four digits located on either the left or right side.</p></div>';
      }
  });

  // Initialize security popover for Bootstrap 3
  $('.img-secure').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      html: true,
      content: function () {
        return '<p class="popover-text"><i class="fa fa-lock icon"></i> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
      }
  });

  // Set current year inside footer
  ;(function ($) {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        $currentYear = $('.current-year');
    $currentYear.html(currentYear);
  }(jQuery));

  var init = function() {
    $('.focus-on').focus();
  };

  init();
}(jQuery));
