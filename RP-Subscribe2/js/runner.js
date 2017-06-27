$(function() {
  planType = "";

  /* Initialize cvv popover for Bootstrap 3 */
  $('.cvv-img').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      title:'<p><strong>What is a Security Code?</strong></p>',
      html: true,
      content: function () {
          return '<p><strong>Visa, MasterCard, and Discover</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-visa.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Back of Card</strong><br>Three digits located on the right of the signature strip.</small></p></div></div><p><strong>American Express</strong></p><div class="row"><div class="col-xs-6"><img class="img-responsive" src="//manaron.s3.amazonaws.com/srg/hompage/web/img/cc-amex.png"></div><div class="col-xs-6 pop-text"><p><small><strong>Front of Card</strong><br>Four digits located on either the left or right side.</small></p></div>';
      }
  });
  /* Initialize security popover for Bootstrap 3 */
  $('#secure-lock').popover({
      container: 'body',
      trigger: 'hover focus',
      placement:'auto',
      html: true,
      content: function () {
          return '<p><span class="glyphicon glyphicon-lock"></span> BeenVerified deploys the latest and greatest strategies, including Secure 256-bit SSL technology, to keep your personal information and payment data safe from unauthorized 3rd parties.</p>';
      }
  });
  $('#secure-text').on('hover' , function () {
    $('#secure-lock').popover('toggle');
  });

  // Update terms & conditions based on selected plan
  var updatePlanLegal = function (plan) {
    if (plan === "all") {
      $('#legal-price').text('$44.58');
      $('#legal-type').text('three months');
      $('#subscription-price').text('$44.58');
      $('#subscription').text("Three Month Search Membership");
    }
  };

  // Secure Credit Card lock animation
  var $secureLockIcon = $('#secure-lock'),
      $ccInput = $('#credit_card_card_number'),
      $secureText = $('#secure-text');

      // $secureText.hide();

  $ccInput.on('focus' , function () {
      $secureLockIcon.addClass('secure-this');
      $secureText.fadeIn();
  });

  $ccInput.on('change blur' , function () {
    var ccInputLength = $ccInput.val().length;

    if (!ccInputLength) {
      $secureText.hide();
      $secureLockIcon.removeClass('secure-this');
    }
  });

  // Clicking Credit Card logo will focus on input field
  var $ccAccept = $('.cc-accept');

  $ccAccept.on('click' , function () {
    $ccInput.focus();
  });

  var verifySeal = function () {
    $(".verify-seal").on("click", function () {
      var left  = ($(window).width()/2)-(900/2),
          top   = ($(window).height()/2)-(600/2),
          popup = window.open ("https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.beenverified.com&lang=en", "popup", "width=900, height=600, top="+top+", left="+left);
    });
  };

  //added this fix to prevent freeze on page when paypal popup is exed out before loading is finished

  $(document).on('DOMNodeRemoved', function(e){

    if ($(e.target).is($('iframe'))){
      if ($(e.target)[0].name.includes("lightbox_container")){

        paypal.checkout.closeFlow();
        $('#spinner').hide();
        $('#create_button').removeAttr('disabled');
      }
    }
  });

  var getQueryArgs = function () {
    var query = window.location.search.substring(1); // drop '?' char
    if (!query) {
      return false;
    }
    var args = _
    .chain(query.split('&'))
    .map(function(params) {
      var p = params.split('=');
      var key = p[0];
      var val = window.decodeURIComponent(p[1]);
      val = val.replace(/\/+$/, ""); // clean up trailing slash
      return [key, val];
    })
    .object()
    .value();

    if (args.state === 'All') {
      args.state = '';
    }

    return args;
  };

  var setHiddenInput = function(plan) {
    $('.plan_name_radio').prop('checked', false);
    if (plan === 'phone') {
      $('#22_1_month_nofree_afill_no_bjl').prop('checked', true);
    } else {
      $('#44_58_3_months_nofree_affil').prop('checked', true);
    }
  };

  var initialize = function() {
    var query = getQueryArgs();
    verifySeal();

    if (query.plan){
      planType = query.plan;
      setHiddenInput(query.plan);
      updatePlanLegal(query.plan);
    } else {
      window.location.href = $('body').data('previous-page');
    }

  };

  initialize();
});
