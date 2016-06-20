(function () { "use strict";

  $('.sort-name').on('click', function(){
    tinysort('div#others>div.result');
  });
  $('.sort-age').on('click', function(){
    tinysort('div#others>div.result','p.age')
  });
  $('.sort-city').on('click', function(){
    tinysort('div#others>div.result','span.address-city');
  });
  $('.sort-state').on('click', function(){
    tinysort('div#others>div.result','span.address-state');
  });

}());
