var windowWidth = $(window).width();
var stateConverted = false;

const convertState = (name, to) => {
  var states = [
    { name: 'Alabama', abbrev: 'AL' },
    { name: 'Alaska', abbrev: 'AK' },
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'Arkansas', abbrev: 'AR' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'Connecticut', abbrev: 'CT' },
    { name: 'Delaware', abbrev: 'DE' },
    { name: 'Florida', abbrev: 'FL' },
    { name: 'Georgia', abbrev: 'GA' },
    { name: 'Hawaii', abbrev: 'HI' },
    { name: 'Idaho', abbrev: 'ID' },
    { name: 'Illinois', abbrev: 'IL' },
    { name: 'Indiana', abbrev: 'IN' },
    { name: 'Iowa', abbrev: 'IA' },
    { name: 'Kansas', abbrev: 'KS' },
    { name: 'Kentucky', abbrev: 'KY' },
    { name: 'Louisiana', abbrev: 'LA' },
    { name: 'Maine', abbrev: 'ME' },
    { name: 'Maryland', abbrev: 'MD' },
    { name: 'Massachusetts', abbrev: 'MA' },
    { name: 'Michigan', abbrev: 'MI' },
    { name: 'Minnesota', abbrev: 'MN' },
    { name: 'Mississippi', abbrev: 'MS' },
    { name: 'Missouri', abbrev: 'MO' },
    { name: 'Montana', abbrev: 'MT' },
    { name: 'Nebraska', abbrev: 'NE' },
    { name: 'Nevada', abbrev: 'NV' },
    { name: 'New Hampshire', abbrev: 'NH' },
    { name: 'New Jersey', abbrev: 'NJ' },
    { name: 'New Mexico', abbrev: 'NM' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'North Carolina', abbrev: 'NC' },
    { name: 'North Dakota', abbrev: 'ND' },
    { name: 'Ohio', abbrev: 'OH' },
    { name: 'Oklahoma', abbrev: 'OK' },
    { name: 'Oregon', abbrev: 'OR' },
    { name: 'Pennsylvania', abbrev: 'PA' },
    { name: 'Rhode Island', abbrev: 'RI' },
    { name: 'South Carolina', abbrev: 'SC' },
    { name: 'South Dakota', abbrev: 'SD' },
    { name: 'Tennessee', abbrev: 'TN' },
    { name: 'Texas', abbrev: 'TX' },
    { name: 'Utah', abbrev: 'UT' },
    { name: 'Vermont', abbrev: 'VT' },
    { name: 'Virginia', abbrev: 'VA' },
    { name: 'Washington', abbrev: 'WA' },
    { name: 'West Virginia', abbrev: 'WV' },
    { name: 'Wisconsin', abbrev: 'WI' },
    { name: 'Wyoming', abbrev: 'WY' },
  ];
  var returnthis = false;
  name = name.toUpperCase();
  $.each(states, (index, value) => {
    if (to === 'name') {
      if (value.abbrev === name) {
        returnthis = value.name;
        return false;
      }
    } else if (to === 'abbrev') {
      if (value.name.toUpperCase() === name) {
        returnthis = value.abbrev;
        return false;
      }
    }
    return false;
  });
  return returnthis;
};

const callToConvertStates = () => {
  $('.fullState').each(function converEachState(i, obj) {
    var abrevState = obj.innerText;
    var fullState = convertState(abrevState, 'name');
    this.innerText = fullState;
  });
};

const updateStates = () => {
  callToConvertStates();
  stateConverted = true;
};

const initializeResizeHandler = (determineCollapse, determineLayoutState) => {
  determineLayoutState();
  determineCollapse();
  $('[data-toggle="tooltip"]').tooltip();

  $(window).on('resize', function onResize() {
    var currentWidth = $(this).width();
    var resizeHappened = false;
    determineCollapse();

    if (currentWidth !== windowWidth) {
      windowWidth = currentWidth;
      resizeHappened = true;
    }
    // Fix for IE8 reporting fake window resizing when the document dimensions change.
    if (!resizeHappened) return;
    determineLayoutState();
  });

  $(window)
    .on('load resize', () => {
      if ($(window).width() < 767 && stateConverted === false) {
        updateStates();
      }
    })
    .on('gettingResults', () => {
      stateConverted = false;
    })
    .on('newResults', () => {
      updateStates();
    });
};

export { initializeResizeHandler };
