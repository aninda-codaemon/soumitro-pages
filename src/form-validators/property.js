import _assignIn from 'lodash/assignIn';
import 'liveaddress';

import amplify from 'utils/amplifyStore';
import { track } from 'utils/track';

const initializeLiveAddress = ($propertyField) => {
  const liveaddress = $.LiveAddress({
    debug: false,
    key: '137296413373292866',
    addresses: [{
      freeform: $propertyField,
    }],
    ambiguousMessage: 'Choose the exact address',
    invalidMessage: 'We did not find that address in our records<br><span class="line_two">Be sure to include a building number and leave out resident names</span>',
    stateFilter: 'AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY',
    submitVerify: true,
  });

  liveaddress.on('AddressWasAmbiguous', (event, data, previousHandler) => previousHandler(event, data));

  // refocus search form if invalid
  liveaddress.on('InvalidAddressRejected', () => $propertyField.focus());

  liveaddress.on('AddressChanged', (event, data, previousHandler) => {
    $propertyField.removeClass('success');
    previousHandler(event, data);
  });

  liveaddress.on('AddressAccepted', (event, data, previousHandler) => {
    var { response: { chosen } } = data.response.chosen;

    amplify.store('propertySearchData', {
      address: `${chosen.delivery_line_1} ${chosen.last_line}`,
      street: chosen.delivery_line_1 || '',
      last_line: chosen.last_line || '',
      city: chosen.components.city_name || '',
      state: chosen.components.state_abbreviation || '',
      unit: chosen.components.secondary_number || '',
      zip5: chosen.components.zipcode || '',
      zip4: chosen.components.plus4_code || '',
    });
    amplify.store('propertyCurrentRecord', {
      _framerida_click: 'store propertyCurrentRecord',
      _framerida_mapped: 'TeaserRecord',
      parcel_address: {
        address: `${chosen.delivery_line_1} ${chosen.last_line}`,
        full: chosen.delivery_line_1 || '',
        parts: {
          carrier_route: chosen.metadata.carrier_route || '',
          city: chosen.components.city_name || '',
          house_number: chosen.components.primary_number || '',
          post_direction: chosen.components.street_postdirection || '',
          pre_direction: chosen.components.street_predirection || '',
          state: chosen.components.state_abbreviation || '',
          street_name: chosen.components.street_name || '',
          street_type: chosen.components.street_suffix || '',
          unit: chosen.components.secondary_number || '',
          zip: chosen.components.zipcode || '',
          zip4: chosen.components.plus4_code || '',
        },
      },
    });

    $propertyField.addClass('success');
    $propertyField.focus();

    previousHandler(event, data);
  });
};

const submitHandler = (form) => {
  track('Submitted Search Form - Reverse Property');
  form.submit();
};

const defaultOptions = {
  rules: {
    $fullAddress: 'required',
  },
  messages: {
    address: 'Please enter an address',
  },
  onkeyup: false,
  onclick: false,
  onsubmit: true,
  submitHandler,
};

const validate = ($form, options = {}) => {
  const newOptions = _assignIn(defaultOptions, options);
  $form.validate(newOptions);
};

export default {
  validate,
  initializeLiveAddress,
};
