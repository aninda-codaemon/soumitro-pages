$(document).ready(function() {

  // get location by ip
  // set demonym using fetched location
  $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done (function(location) {
    var geostate = location.state,
        geodemonym = 'Americans',
        states = [
          {
            'name': 'Alabama',
            'demonym': 'Alabamian',
            'value': 'AL'
          },
          {
            'name': 'Alaska',
            'demonym': 'Alaskan',
            'value': 'AK'
          },
          {
            'name': 'Arizona',
            'demonym': 'Arizonan',
            'value': 'AZ'
          },
          {
            'name': 'Arkansas',
            'demonym': 'Arkansan',
            'value': 'AR'
          },
          {
            'name': 'California',
            'demonym': 'Californian',
            'value': 'CA'
          },
          {
            'name': 'Colorado',
            'demonym': 'Coloradan',
            'value': 'CO'
          },
          {
            'name': 'Connecticut',
            'demonym': 'Connecticuter',
            'value': 'CT'
          },
          {
            'name': 'Delaware',
            'demonym': 'Delawarean',
            'value': 'DE'
          },
          {
            'name': 'Florida',
            'demonym': 'Floridian',
            'value': 'FL'
          },
          {
            'name': 'Georgia',
            'demonym': 'Georgian',
            'value': 'GA'
          },
          {
            'name': 'Hawaii',
            'demonym': 'Hawaiian',
            'value': 'HI'
          },
          {
            'name': 'Idaho',
            'demonym': 'Idahoan',
            'value': 'ID'
          },
          {
            'name': 'Illinois',
            'demonym': 'Illinoisan',
            'value': 'IL'
          },
          {
            'name': 'Indiana',
            'demonym': 'Indianan',
            'value': 'IN'
          },
          {
            'name': 'Iowa',
            'demonym': 'Iowan',
            'value': 'IA'
          },
          {
            'name': 'Kansas',
            'demonym': 'Kansan',
            'value': 'KS'
          },
          {
            'name': 'Kentucky',
            'demonym': 'Kentuckian',
            'value': 'KY'
          },
          {
            'name': 'Louisiana',
            'demonym': 'Louisianan',
            'value': 'LA'
          },
          {
            'name': 'Maine',
            'demonym': 'Mainer',
            'value': 'ME'
          },
          {
            'name': 'Maryland',
            'demonym': 'Marylander',
            'value': 'MD'
          },
          {
            'name': 'Massachusetts',
            'demonym': 'Massachusettsan',
            'value': 'MA'
          },
          {
            'name': 'Michigan',
            'demonym': 'Michigander',
            'value': 'MI'
          },
          {
            'name': 'Minnesota',
            'demonym': 'Minnesotan',
            'value': 'MN'
          },
          {
            'name': 'Mississippi',
            'demonym': 'Mississippian',
            'value': 'MS'
          },
          {
            'name': 'Missouri',
            'demonym': 'Missourian',
            'value': 'MO'
          },
          {
            'name': 'Montana',
            'demonym': 'Montanan',
            'value': 'MT'
          },
          {
            'name': 'Nebraska',
            'demonym': 'Nebraskan',
            'value': 'NE'
          },
          {
            'name': 'Nevada',
            'demonym': 'Nevadan',
            'value': 'NV'
          },
          {
            'name': 'New Hampshire',
            'demonym': 'New Hampshirite',
            'value': 'NH'
          },
          {
            'name': 'New Jersey',
            'demonym': 'New Jerseyan',
            'value': 'NJ'
          },
          {
            'name': 'New Mexico',
            'demonym': 'New Mexican',
            'value': 'NM'
          },
          {
            'name': 'New York',
            'demonym': 'New Yorker',
            'value': 'NY'
          },
          {
            'name': 'North Carolina',
            'demonym': 'North Carolinian',
            'value': 'NC'
          },
          {
            'name': 'North Dakota',
            'demonym': 'North Dakotan',
            'value': 'ND'
          },
          {
            'name': 'Ohio',
            'demonym': 'Ohioan',
            'value': 'OH'
          },
          {
            'name': 'Oklahoma',
            'demonym': 'Oklahoman',
            'value': 'OK'
          },
          {
            'name': 'Oregon',
            'demonym': 'Oregonian',
            'value': 'OR'
          },
          {
            'name': 'Pennsylvania',
            'demonym': 'Pennsylvanian',
            'value': 'PA'
          },
          {
            'name': 'Rhode Island',
            'demonym': 'Rhode Islander',
            'value': 'RI'
          },
          {
            'name': 'South Carolina',
            'demonym': 'South Carolinian',
            'value': 'SC'
          },
          {
            'name': 'South Dakota',
            'demonym': 'South Dakotan',
            'value': 'SD'
          },
          {
            'name': 'Tennessee',
            'demonym': 'Tennessean',
            'value': 'TN'
          },
          {
            'name': 'Texas',
            'demonym': 'Texan',
            'value': 'TX'
          },
          {
            'name': 'Utah',
            'demonym': 'Utahn',
            'value': 'UT'
          },
          {
            'name': 'Vermont',
            'demonym': 'Vermonter',
            'value': 'VT'
          },
          {
            'name': 'Virginia',
            'demonym': 'Virginian',
            'value': 'VA'
          },
          {
            'name': 'Washington',
            'demonym': 'Washingtonian',
            'value': 'WA'
          },
          {
            'name': 'Washington, D.C.',
            'demonym': 'Washingtonian',
            'value': 'DC'
          },
          {
            'name': 'West Virginia',
            'demonym': 'West Virginian',
            'value': 'WV'
          },
          {
            'name': 'Wisconsin',
            'demonym': 'Wisconsinite',
            'value': 'WI'
          },
          {
            'name': 'Wyoming',
            'demonym': 'Wyomingite',
            'value': 'WY'
          }
        ];

    states.filter(function(state) {
      // if the user's current state matches to our data
      if (state.name === geostate) {
        // set state value to current user's state
        $('.search-form select[name=state]').val(state.value);

        // focus on input
        $('.autofocus').focus();

        // set geodemonym to current user's state
        $('.geodemonym').html(state.demonym + 's');
      }
    });

  });

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
  // window.scroll func not responding...

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
      debugger;
      $('#share-it').addClass('affix');
    } else if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      debugger;
      $('#share-it').addClass('affix-bottom');
    } else {
      debugger;
      $('#share-it').removeClass('affix');
    }
  });

});
