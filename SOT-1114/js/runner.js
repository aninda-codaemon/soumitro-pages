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

  // Test for Safari private browsing mode
  try {
    localStorage.test = 2;
  } catch (e) {
    trackNL('Safari Private Browsing');
  }

  // focus on input
  $('.autofocus').focus();

  // validate search form
  $('.search-form').submit(function() {
    var searchForm = $(this);

    if (searchForm.find('[name=fn]').val() === '') {
      console.log('first name error');
      return false;
    }
    if (searchForm.find('[name=ln]').val() === '') {
      console.log('last name error');
      return false;
    }
  });

  // @TODO: fix affix

  $('#share').affix({
    offset: {
      top: 180,
      bottom: function () {
        return (this.bottom = $('.search-footer').outerHeight(true))
      }
    }
  });

  $(window).scroll(function() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > 100 && $(window).scrollTop() < 150) {
      console.log('scroll zone');
    }
  });

});
