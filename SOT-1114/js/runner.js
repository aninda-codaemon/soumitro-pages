$(document).ready(function() {

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

  // focus on input
  $('.autofocus').focus();

  // validate search form
  $('.search-form').submit(function() {
    var $searchForm = $(this),
        $firstName = $searchForm.find('[name=fn]'),
        $lastName = $searchForm.find('[name=ln]');

    if ($firstName.val() === '') {
      var $formGroup = $firstName.closest('.form-group');
      $formGroup.addClass('error');

      $firstName.on('keyup', function() {
        $formGroup.removeClass('error');
      });

      return false;
    }
    else if ($lastName.val() === '') {
      var $formGroup = $lastName.closest('.form-group');
      $formGroup.addClass('error');

      $lastName.on('keyup', function() {
        $formGroup.removeClass('error');
      });

      return false;
    } else {
      $searchForm.find('.form-group').removeClass('error');
    }
  });

  // @TODO: fix affix
  // window.scroll is not responding for some reason...

  // remove this when affix is working
  $('#share-it').addClass('affix');

  // $('#share-it').affix({
  //   offset: {
  //     top: 200,
  //     bottom: function () {
  //       return (this.bottom = $('.search-footer').outerHeight(true))
  //     }
  //   }
  // });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 275) {
      $('#share-it').addClass('affix');
    } else if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      $('#share-it').addClass('affix-bottom');
    } else {
      $('#share-it').removeClass('affix');
    }
  });

});
