;(function($){
  var searchData = localStorage.getItem('__amplify__propertyTeaserData') ? JSON.parse(localStorage.getItem('__amplify__propertyTeaserData')) : {},
      leadData = localStorage.getItem('__amplify__leadData') ? JSON.parse(localStorage.getItem('__amplify__leadData')).data : {};

  if (searchData) {
    searchData = searchData.data;
    if (searchData.teasers[0]){
      teaser = searchData.teasers[0];
    }
  }

  // if (leadData) {
  //   leadData = {
  //     first_name: leadData['account[first_name]'],
  //     last_name: leadData['account[last_name]'],
  //     email: leadData['user[email]']
  //   };
  // }


  Vue.config.devtools = true;


  var county = function() {
    var deeds = teaser.deeds;

    if (!deeds || _empty(deeds[0])){
      return false;
    } else {
      return deeds[0].county.properCaps() + " County";
    }
  };

  var salePrice = function() {
    if (_empty(teaser.last_sale_price)) {
      return false;
    }
    if (teaser.last_sale_price) {
      return false;
    }
    if (teaser.last_sale_price > 1000000) {
      return teaser.last_sale_price.toString().moneyRange(1000000).numberize();
    } else {
      return teaser.last_sale_price.toString().moneyRange(100000).numberize();
    }
  };
  var buildingClass = function(){

    if (_empty(teaser.buildings)) {
      return false;
    }

    var type = {
      1: "Residential",
      2: "Residential",
      3: "Residential",
      4: "Residential",
      5: "Residential",
      6: "Residential",
      7: "Residential",
      8: "Commercial",
      9: "Miscellaneous",
      10: "Residential"
    };
    return type[teaser.buildings[0].class];
  };

  var propertyTax = function() {
    var taxes = teaser.taxes;

    if (!taxes || _empty(taxes.bills) || !taxes.bills[0].amount) {
      return false;
    } else {
      return taxes.bills[0].amount + "$/yr in taxes";
    }
  };

  var yearBuilt = function() {
    // debugger
    var buildings = teaser.buildings;
    if (!buildings || _empty(buildings[0]) || !buildings[0].year_built){
      return false;
    } else {
      return "Built between " + buildings[0].year_built.toString().yearRange(25);
    }
  };

  var stories = function() {
    var buildings = teaser.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].number_of_stories){
      return false;
    } else {
      return buildings[0].number_of_stories.toString().roomRange() + " stories";
    }
  };


  var lotSize = function() {
    var dimensions = teaser.dimensions || {},
        lotSize = (dimensions.width || 0) * (dimensions.depth || 0);

    if (_empty(lotSize)) {
      return false;
    }

    if (lotSize > 43560/2) {
      return ((parseFloat(lotSize) / 43560).toFixed(2)).numberRange(0.75) + " acre lot size";
    } else {
      return lotSize.toString().numberRange(2750).numberize() + "ft2 lot size";
    }
  };


  var rooms = function() {
    var buildings = teaser.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].rooms){
      return false;
    } else {
      return buildings[0].rooms.total.toString().roomRange() + " rooms";
    }
  };

  var buildings = function() {
    if (_empty(teaser.number_of_buildings)) {
      return false;
    }
    return teaser.number_of_buildings.toString().roomRange() + " buildings";
  };


  var bedrooms = function() {
    var buildings = teaser.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].rooms){
      return false;
    } else {
      return buildings[0].rooms.bed.toString().roomRange() + " bedrooms";
    }
  };

  var bathrooms = function() {
    var buildings = teaser.buildings;

    if (!buildings || _empty(buildings[0]) || !buildings[0].rooms){
      return false;
    } else {
      return buildings[0].rooms.baths.total.toString().roomRange() + " bathrooms";
    }
  };

  Vue.use(window.vuelidate.default);
  var required = window.validators.required,
      email = window.validators.email;

  var app = new Vue({
    el: '#app',
    data: {
      address: searchData.address,
      teaser: searchData.teasers[0] || searchData.teasers,
      dataRows: [
        {name: "county", iconName: "bvicon-county", value: county()},
        {name: "sale-price", iconName: "bvicon-sold-1", value: salePrice()},
        {name: "building-class", iconName: "bvicon-residential", value: buildingClass()},
        {name: "taxes", iconName: "bvicon-dollarbag", value: propertyTax()},
        {name: "built", iconName: "bvicon-built", value: yearBuilt()},
        {name: "stories", iconName: "bvicon-stories", value: stories()},
        {name: "lot-size", iconName: "bvicon-ruler", value: lotSize()},
        {name: "rooms", iconName: "bvicon-rooms", value: rooms()},
        {name: "buildings", iconName: "bvicon-buildings", value: buildings()},
        {name: "bedrooms", iconName: "bvicon-bedroom", value: bedrooms()},
        {name: "bathrooms", iconName: "bvicon-bathroom", value: bathrooms()},
      ],
      first_name: "",
      last_name : "",
      email: "",
      first_error: "Type Name",
      last_error: "Type Last Name",
      email_error: "Type an e-mail"
    },
    methods: {
      isFullAddress: function() {
        if (this.teaser.parcel_address.full) {
          return true;
        }
      },

      showStreet: function() {

        var parcel_address = this.teaser.parcel_address;
          if (!parcel_address || !parcel_address.parsed) {
            return "";
          }
          var number = parcel_address.parsed.primary_address_number,
              street = parcel_address.parsed.street_name + " " + parcel_address.parsed.street_type;
          return number + " " + street;
      },

      secondLine: function() {
        var parcel_address = this.teaser.parcel_address;
        if (!parcel_address || !parcel_address.parsed) {
          return "";
        }
        return parcel_address.parsed.city + ", " + parcel_address.parsed.state + " " + parcel_address.parsed.zip5;
      },

      ownersName:function() {

        var owners = this.teaser.owners;

        if (!owners || _empty(owners[0])){
          return false;
        }
        return owners[0].name.full.properCaps();
      },

      submitHandler: function(e){
        e.preventDefault();
      },

      firstInput: function(){
        this.first_error = 'Please enter a first name';
        $v.first_name.$touch();
      },

      lastInput: function(){
        this.last_error = 'Please enter a last name';
        $v.last_name.$touch();
      },

      emailInput: function(){
        this.email_error = 'Please enter a valid email';
        $v.email.$touch();
      },
    },

    validations: {
      first_name: {
        required: required
      },

      last_name: {
        required: required
      },
      email: {
        required: required,
        email: email
      }
    }
  });

  window.$v = app.$v;


})(jQuery);
