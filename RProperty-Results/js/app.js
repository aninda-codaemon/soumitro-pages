;(function($){

  var searchData = localStorage.getItem('__amplify__propertyTeaserData') ? JSON.parse(localStorage.getItem('__amplify__propertyTeaserData')) : {},
      leadData = localStorage.getItem('__amplify__leadData') ? JSON.parse(localStorage.getItem('__amplify__leadData')).data : {},
      teaser = {};

  if (searchData && !_empty(searchData)) {

    if (searchData.data && searchData.data.teasers[0]){
      teaser = searchData.data.teasers[0];
      searchData = searchData.data;
    }
  }

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
      teaser: searchData.teasers ? searchData.teasers[0] : {},
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
      first_name: leadData['account[first_name]'],
      last_name : leadData['account[last_name]'],
      email: leadData['user[email]'],
      checked: false,
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
        // debugger
        if ($v.$invalid) {
          this.firstInput();
          this.lastInput();
          this.emailInput();
          $v.checked.$touch();
          e.preventDefault();
        } else {
          this.postLead();
        }
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

      checkboxError: function() {
        if ($v.checked.$invalid && $v.checked.$dirty){
          return true;
        } else {
          return false;
        }
      },

      getPageURL: function () {
        try {
          return document.location.href.split('?')[0];
        } catch (err) {
          return '';
        }
      },

      cookie : function (key, val) {
        if (arguments.length === 2) {
          document.cookie = key + '=' + escape(val) + '; path=/; domain=.beenverified.com';
          return;
        }

        var kvps = document.cookie.split(';'),
          kvpsLen = kvps.length,
          i = 0,
          findAll = arguments.length === 0,
          cookieDict = {};

        for (; i < kvpsLen; i += 1) {
          var kvp = kvps[i].split('=');
          if (kvp.length !== 2) continue;
          var k = kvp[0],
            v = kvp[1];
          if (findAll) {
            cookieDict[k.trim()] = v.trim();
          } else if (k.trim() === key) {
            return v;
          }
        }
        return findAll ? cookieDict : undefined;
      },

      marketLandValue : function() {
        var market = this.teaser.values.market;
        if (_empty(market) || !(market[0].land)) {
          return '';
        }
        var marketLandValue =  market[0].land;
        if (marketLandValue > 1000000) {
          return marketLandValue.toString().moneyRange(1000000).numberize();
        } else {
          return marketLandValue.toString().moneyRange(100000).numberize();
        }
      },

      buildingClass : function(){

        if (_empty(this.teaser.buildings)) {
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
        return type[this.teaser.buildings[0].class];
      },

      constructionType : function() {
        if (_empty(teaser.buildings)) {
          return '';
        }
        var type = {
          1: "Concrete",
          2: "Masonry",
          3: "Steel",
          4: "Wood Frame",
          5: "Steel/Concrete",
          6: "Special",
          7: "Non-combustible",
          8: "Pole",
          9: "Metal Stud",
          10: "Brick",
          11: "Log"
        };
        return type[teaser.buildings[0].construction_type];
      },

      propertyTaxes : function() {

        var taxes = teaser.taxes.bills[0];
        if (_empty(taxes) || !teaser.taxes.bills[0].amount){
          return '';
        }
        var taxAmount = taxes.amount;
        var moneyRange = taxAmount > 100000 ? 25000 : 2500;
        return taxAmount.toString().moneyRange(moneyRange).numberize();
      },

      lotSize : function() {
        var dimensions = teaser.dimensions;
        if (_empty(dimensions) || dimensions.size === 0) {
          return '';
        }
        var lotSize = dimensions.size;
        if (lotSize > 43560/2) {
          return ((parseFloat(lotSize) / 43560).toFixed(2)).numberRange(0.75);
        } else {
          return lotSize.toString().numberRange(2750).numberize();
        }
      },


      postLead: function(){

        var teaser = this.teaser;

        var leadData = {};
        var recordSearchData = {
          source_flow: 'reverse property',
          source_url: this.getPageURL(),
          source_visitor: this.cookie('bv_sess') || '',
          prop_searched: this.address,
          prop_street: this.showStreet() || '',
          prop_unit: teaser.parcel_address.parsed.unit_designator || '',
          prop_city: teaser.parcel_address.parsed.city || '',
          prop_state: teaser.parcel_address.parsed.state || '',
          prop_zip: teaser.parcel_address.parsed.zip5 || '',
          prop_zipfull: teaser.parcel_address.parsed.zip5 ? (teaser.parcel_address.parsed.zip5 + (_empty(teaser.parcel_address.parsed.zip4)? "" : "-"+ teaser.parcel_address.parsed.zip4)) : "",
          prop_owner: this.ownersName() || '',
          prop_mkt_val: _empty(teaser.values.market) ?  "" : teaser.values.market[0].land,
          prop_mkt_val_display: this.marketLandValue() || '',
          prop_build_class: this.buildingClass() || '',
          prop_build_date: (teaser.buildings && teaser.buildings[0]) ? teaser.buildings[0].year_built : "",
          prop_build_date_display: (teaser.buildings && teaser.buildings[0]) ? teaser.buildings[0].year_built.toString().yearRange(25) : "",
          prop_constr_type: this.constructionType() || '',
          prop_county: (_empty(teaser.deeds) || !(teaser.deeds[0].county)) ? "" : teaser.deeds[0].county.properCaps(),
          prop_rooms: _empty(teaser.buildings) ? "" : teaser.buildings[0].rooms.total,
          prop_rooms_display: _empty(teaser.buildings) ? " " : teaser.buildings[0].rooms.total.toString().roomRange(),
          prop_baths: (_empty(teaser.buildings) || (_empty(teaser.buildings[0].rooms.baths.total))) ? " " : teaser.buildings[0].rooms.baths.total.toString(),
          prop_baths_display: (_empty(teaser.buildings) || (_empty(teaser.buildings[0].rooms.baths.total))) ? " " : teaser.buildings[0].rooms.baths.total.toString().roomRange(),
          prop_beds: (_empty(teaser.buildings)) ? " " : teaser.buildings[0].rooms.bed.toString(),
          prop_beds_display: (_empty(teaser.buildings)) ? " " : teaser.buildings[0].rooms.bed.toString().roomRange(),
          prop_stories: (_empty(teaser.buildings) || (!teaser.buildings[0].number_of_stories)) ? " " : teaser.buildings[0].number_of_stories,
          prop_stories_display: (_empty(teaser.buildings) || (!teaser.buildings[0].number_of_stories)) ? " " : teaser.buildings[0].number_of_stories.toString().roomRange(),
          prop_residents: teaser.residents && teaser.residents.length || '',
          prop_residents_display: teaser.residents && teaser.residents.length.toString().numberRange(5) || '',
          prop_est_tax: (_empty(teaser.taxes.bills) || !teaser.taxes.bills[0].amount) ? "" : teaser.taxes.bills[0].amount,
          prop_est_tax_display: this.propertyTaxes() || '',
          prop_units: (_empty(teaser.buildings) || !teaser.buildings[0].number_of_units) ? "" : teaser.buildings[0].number_of_units,
          prop_units_display: (_empty(teaser.buildings) || !teaser.buildings[0].number_of_units) ? "" : teaser.buildings[0].number_of_units.toString().roomRange(),
          prop_buildings: _empty(teaser.buildings) ? "" : teaser.buildings.length,
          prop_buildings_display: _empty(teaser.buildings) ? "" : teaser.buildings.length.toString().roomRange(),
          prop_sqft: (_empty(teaser.dimensions) || !teaser.dimensions.size) ? "" : teaser.dimensions.size,
          prop_sqft_display: this.lotSize() || '',
          prop_lat: this.teaser.parcel_address.geo.latitude || '',
          prop_long: this.teaser.parcel_address.geo.longitude || '',
          mapbox_access_token: 'pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw'

        };

        leadData['lead[first_name]'] = this.first_name;
        leadData['lead[last_name]'] = this.last_name;
        leadData['lead[email]'] = this.email;
        leadData['lead[report_type]'] = 'reverse_property';
        leadData['lead[report_data]'] = JSON.stringify(recordSearchData);
        debugger

        this.$http.post('https://www.beenverified.com/api/v4/leads.json', leadData);
        var localObject = {
            "account[first_name]" : this.first_name,
            "account[last_name]" : this.last_name,
            "user[email]" : this.email
        };

        localStorage.setItem('__amplify__leadData', JSON.stringify(localObject)).then(function(){});

      }
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
      },

      checked: {
        required: required
      }
    }
  });

  window.$v = app.$v;


})(jQuery);
