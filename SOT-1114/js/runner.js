(function() {
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

  var $searchForm = $('.search-form');

  $searchForm.validate({
    validClass: "success",

    rules: {
      fn: "required",
      ln: "required"
    },
    messages: {
      fn: "Please enter a first name",
      ln: "Please enter a last name"
    },

    onkeyup: false,
    onclick: false,
    onsubmit: true,
    submitHandler: function(form) {
      trackNL("Submitted Search Form - People");
      window.setTimeout(function() {
        form.submit();
      }, REQUEST_DELAY);
    }
  });

  var onGeoSuccess = function(location) {

    var geocountry = location.address.countryCode,
      geostate = location.address.region,
      georegioncode = location.address.regionCode,
      geodemonym = "American",
      geoimageregion = "nws";

    var regions = {
      "AL": [{
        "name": "Alabama",
        "demonym": "Alabamian",
        "region": "sou"
      }],
      "AK": [{
        "name": "Alaska",
        "demonym": "Alaskan",
        "region": "mtn"
      }],
      "AS": [{
        "name": "American Samoa",
        "demonym": "American Samoans",
        "region": "pac"
      }],
      "AZ": [{
        "name": "Arizona",
        "demonym": "Arizonan",
        "region": "sws"
      }],
      "AR": [{
        "name": "Arkansas",
        "demonym": "Arkansan",
        "region": "sou"
      }],
      "CA": [{
        "name": "California",
        "demonym": "Californian",
        "region": "nws"
      }],
      "CO": [{
        "name": "Colorado",
        "demonym": "Coloradan",
        "region": "mtn"
      }],
      "CT": [{
        "name": "Connecticut",
        "demonym": "Connecticuter",
        "region": "new"
      }],
      "DE": [{
        "name": "Delaware",
        "demonym": "Delawarean",
        "region": "mid"
      }],
      "DC": [{
        "name": "Washington, D.C.",
        "demonym": "Washingtonian",
        "region": "crt"
      }],
      "FM": [{
        "name": "Federated States Of Micronesia",
        "demonym": "Micronesian",
        "region": "pac"
      }],
      "FL": [{
        "name": "Florida",
        "demonym": "Floridian",
        "region": "fla"
      }],
      "GA": [{
        "name": "Georgia",
        "demonym": "Georgian",
        "region": "sou"
      }],
      "GU": [{
        "name": "Guam",
        "demonym": "",
        "region": "pac"
      }],
      "HI": [{
        "name": "Hawaii",
        "demonym": "Hawaii resident",
        "region": "pac"
      }],
      "ID": [{
        "name": "Idaho",
        "demonym": "Idahoan",
        "region": "mtn2"
      }],
      "IL": [{
        "name": "Illinois",
        "demonym": "Illinoisan",
        "region": "chi"
      }],
      "IN": [{
        "name": "Indiana",
        "demonym": "Indianan",
        "region": "mws"
      }],
      "IA": [{
        "name": "Iowa",
        "demonym": "Iowan",
        "region": "htl"
      }],
      "KS": [{
        "name": "Kansas",
        "demonym": "Kansan",
        "region": "htl"
      }],
      "KY": [{
        "name": "Kentucky",
        "demonym": "Kentuckian",
        "region": "app"
      }],
      "LA": [{
        "name": "Louisiana",
        "demonym": "Louisianan",
        "region": "nla"
      }],
      "ME": [{
        "name": "Maine",
        "demonym": "Mainer",
        "region": "new"
      }],
      "MH": [{
        "name": "Marshall Islands",
        "demonym": "Marshall Islander",
        "region": "pac"
      }],
      "MD": [{
        "name": "Maryland",
        "demonym": "Marylander",
        "region": "mid"
      }],
      "MA": [{
        "name": "Massachusetts",
        "demonym": "Massachusettsan",
        "region": "new"
      }],
      "MI": [{
        "name": "Michigan",
        "demonym": "Michigander",
        "region": "mws"
      }],
      "MN": [{
        "name": "Minnesota",
        "demonym": "Minnesotan",
        "region": "htl"
      }],
      "MS": [{
        "name": "Mississippi",
        "demonym": "Mississippian",
        "region": "sou"
      }],
      "MO": [{
        "name": "Missouri",
        "demonym": "Missourian",
        "region": "htl"
      }],
      "MT": [{
        "name": "Montana",
        "demonym": "Montanan",
        "region": "mtn"
      }],
      "NE": [{
        "name": "Nebraska",
        "demonym": "Nebraskan",
        "region": "htl"
      }],
      "NV": [{
        "name": "Nevada",
        "demonym": "Nevadan",
        "region": "sws"
      }],
      "NH": [{
        "name": "New Hampshire",
        "demonym": "New Hampshirite",
        "region": "nhm"
      }],
      "NJ": [{
        "name": "New Jersey",
        "demonym": "New Jerseyan",
        "region": "nyc"
      }],
      "NM": [{
        "name": "New Mexico",
        "demonym": "New Mexican",
        "region": "sws"
      }],
      "NY": [{
        "name": "New York",
        "demonym": "New Yorker",
        "region": "nyc"
      }],
      "NC": [{
        "name": "North Carolina",
        "demonym": "North Carolinian",
        "region": "app"
      }],
      "ND": [{
        "name": "North Dakota",
        "demonym": "North Dakotan",
        "region": "htl"
      }],
      "MP": [{
        "name": "N. Mariana Islands",
        "demonym": "North Mariana Islander",
        "region": "pac"
      }],
      "OH": [{
        "name": "Ohio",
        "demonym": "Ohioan",
        "region": "mws"
      }],
      "OK": [{
        "name": "Oklahoma",
        "demonym": "Oklahoman",
        "region": "htl"
      }],
      "OR": [{
        "name": "Oregon",
        "demonym": "Oregonian",
        "region": "nws"
      }],
      "PW": [{
        "name": "Palau",
        "demonym": "Palauan",
        "region": "pac"
      }],
      "PA": [{
        "name": "Pennsylvania",
        "demonym": "Pennsylvanian",
        "region": "mid"
      }],
      "PR": [{
        "name": "Puerto Rico",
        "demonym": "Puerto Rican",
        "region": "pac"
      }],
      "RI": [{
        "name": "Rhode Island",
        "demonym": "Rhode Islander",
        "region": "new"
      }],
      "SC": [{
        "name": "South Carolina",
        "demonym": "South Carolinian",
        "region": "sou"
      }],
      "SD": [{
        "name": "South Dakota",
        "demonym": "South Dakotan",
        "region": "mtn2"
      }],
      "TN": [{
        "name": "Tennessee",
        "demonym": "Tennessean",
        "region": "app"
      }],
      "TX": [{
        "name": "Texas",
        "demonym": "Texan",
        "region": "tex"
      }],
      "UT": [{
        "name": "Utah",
        "demonym": "Utahn",
        "region": "mtn"
      }],
      "VT": [{
        "name": "Vermont",
        "demonym": "Vermonter",
        "region": "nhm"
      }],
      "VI": [{
        "name": "Virgin Islands",
        "demonym": "Virgin Islander",
        "region": "pac"
      }],
      "VA": [{
        "name": "Virginia",
        "demonym": "Virginian",
        "region": "app"
      }],
      "WA": [{
        "name": "Washington",
        "demonym": "Washingtonian",
        "region": "mtn"
      }],
      "WV": [{
        "name": "West Virginia",
        "demonym": "West Virginian",
        "region": "app"
      }],
      "WI": [{
        "name": "Wisconsin",
        "demonym": "Wisconsinite",
        "region": "mws"
      }],
      "WY": [{
        "name": "Wyoming",
        "demonym": "Wyomingite",
        "region": "mtn"
      }]
    };

    if (typeof(location) !== 'undefined' && regions.hasOwnProperty(georegioncode)) {
      geoimageregion = regions[georegioncode][0].region;
      geodemonym = regions[georegioncode][0].demonym;

      if (typeof(geostate) === 'undefined') {
        geostate = regions[georegioncode][0].name;
      }
    }

    if (typeof georegioncode !== 'undefined' && georegioncode !== null && georegioncode != "null") {
      $("select[name='state']").val(georegioncode);
    } else {
      $("select[name='state']").val("All");
    }

    if (geocountry === "US") {

      if (typeof geostate !== 'undefined' && geostate.length > 0) {
        $('span.geostate').each(function() {
          $(this).html(" " + $(this).attr("data-prep") + " " + geostate);
        });
      }

      $('span.geodemonym').each(function() {
        $(this).html(geodemonym + "s ");
      })

    }
  }

  // @TODO: fix affix (lol)

  $('#share').affix({
    offset: {
      top: 180,
      bottom: function () {
        return (this.bottom = $('.search-footer').outerHeight(true))
      }
    }
  });

  var init = function() {
    $('.autofocus').focus();
  };

  init();
}());
