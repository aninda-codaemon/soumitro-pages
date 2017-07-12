(function() {
  var TeaserRecord, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  TeaserRecord = (function() {
    var FEW_DATAPOINTS = 5;
    var ENOUGH_DATAPOINTS = 7;
    function TeaserRecord(record) {
      record.deeds = sortByTransferDate(record.deeds || []);
      this.record = record;
      this.bvid = this.record._id;
      //this.age = this.record.age;
      this.index = null;
      this.personHash = base64.encode(JSON.stringify(this.record));
    }

    function sortByTransferDate(deeds) {
      return deeds.sort(function(a, b) {
        var dateA = _.get(a, 'transfer.recorder.date.full');
        var dateB = _.get(b, 'transfer.recorder.date.full');

        var newDateA = new Date(dateA);
        var newDateB = new Date(dateB);

        if(newDateA === newDateB) {
          return 0;
        }

        return newDateA < newDateB ? 1 : -1;
      });
    }

    TeaserRecord.prototype.theInput = function() {
      return this.record;
    };

    TeaserRecord.prototype._makeNameFromFull = function(nameObject) {
      var name;
      if (_empty(nameObject) && _empty(nameObject.names[0].full)) {
        return null;
      } else {
        name = nameObject.names[0].full.shortenName().redact();
        return name;
      }
    };

    TeaserRecord.prototype._makeName = function(nameObject) {
      var name;
      if (_empty(nameObject) && _empty(nameObject.names[0].parts.last_name)) {
        return null;
      } else {
        name = _.chain([nameObject.names[0].parts.first_name, nameObject.names[0].parts.last_name]).map(function(key) {
          return key.redact();
        }).filter(function(namePart) {
          return !_empty(namePart);
        }).value().join(" ");
        return name;
      }
    };

    TeaserRecord.prototype.marketLandValue = function() {
      var marketLandValue = _.get(this.record, 'values.market[0].land');
      if (_empty(marketLandValue) || marketLandValue === 0) {
        return '';
      }
      if (marketLandValue > 1000000) {
        return marketLandValue.toString().moneyRange(1000000).numberize();
      } else {
        return marketLandValue.toString().moneyRange(100000).numberize();
      }
    };

    TeaserRecord.prototype.getTotalAvailableDataPoints = function (datapoints) {
      datapoints = datapoints || [
        this.county(),
        this.salePrice(),
        this.buildingClass(),
        this.propertyTaxes(),
        this.yearBuilt(),
        this.stories(),
        this.lotSize(),
        this.totalRooms(),
        this.buildings(),
        this.bedrooms(),
        this.bathrooms()
      ];

      return _.filter(datapoints, function(value) {
        return !_empty(value) && value !== '';
      }).length;
    };
    
    TeaserRecord.prototype.showDataPointsOnMobile = function() {
      var mobileDataPoints = [
        this.salePrice(),
        this.propertyTaxes(),
        this.yearBuilt(),
        this.lotSize()
      ];
      var totalDataPoints = this.getTotalAvailableDataPoints(mobileDataPoints);
      var owner = this.owner();
      var isOwnerEmpty = _empty(owner) || owner === '';
      return totalDataPoints >= 3 || (!isOwnerEmpty && totalDataPoints >= 2);
    };

    TeaserRecord.prototype.showPreviewReport = function() {
      var totalDatapoints = this.getTotalAvailableDataPoints();
      return totalDatapoints >= FEW_DATAPOINTS;
    };

    TeaserRecord.prototype.showSatisfaction = function() {
      var totalDatapoints = this.getTotalAvailableDataPoints();
      return totalDatapoints < ENOUGH_DATAPOINTS;
    };

    TeaserRecord.prototype.showTestimonial = function() {
      var totalDatapoints = this.getTotalAvailableDataPoints();
      var owner = this.owner();
      var isOwnerEmpty = _empty(owner) || owner === '';
      return isOwnerEmpty && totalDatapoints < FEW_DATAPOINTS;
    };

    TeaserRecord.prototype.county = function() {
      var county = _.get(this.record,  'deeds[0].county');
      if (_empty(county)) {
        return '';
      }
      return county.properCaps();
    };

    TeaserRecord.prototype.assessedYear = function() {
      if (_empty(this.record.assessed_year)) {
        return '';
      }
      return this.record.assessed_year;
    };

    TeaserRecord.prototype.salePrice = function() {
      if (_empty(this.record.sale_price)) {
        return '';
      }
      if (this.record.sale_price === 0) {
        return '';
      }
      if (this.record.sale_price > 1000000) {
        return this.record.sale_price.toString().moneyRange(1000000).numberize();
      } else {
        return this.record.sale_price.toString().moneyRange(100000).numberize();
      }
    };

    TeaserRecord.prototype.propertyTaxes = function() {
      var taxAmount = _.get(this.record, 'taxes.bills[0].amount');
      if (_empty(taxAmount) || taxAmount === 0) {
        return '';
      }
      var moneyRange = taxAmount > 100000 ? 25000 : 2500;
      return taxAmount.toString().moneyRange(moneyRange).numberize();
    };

    TeaserRecord.prototype.yearBuilt = function() {
      var yearBuilt = _.get(this.record, 'buildings[0].year_built');
      if (_empty(yearBuilt) || yearBuilt === 0) {
        return '';
      }
      return yearBuilt.toString().yearRange(25);
    };

    TeaserRecord.prototype.totalRooms = function() {
      var totalRooms = _.get(this.record, 'buildings[0].rooms.total');
      if (_empty(totalRooms)) {
        return '';
      }
      return totalRooms.toString().roomRange();
    };

    TeaserRecord.prototype.units = function() {
      if (_empty(this.record.number_of_units)) {
        return '';
      }
      return this.record.number_of_units.toString().roomRange();
    };

    TeaserRecord.prototype.stories = function() {
      var numberOfStories = _.get(this.record, 'buildings[0].number_of_stories');
      if (_empty(numberOfStories)) {
        return '';
      }
      return numberOfStories.toString().roomRange();
    };

    TeaserRecord.prototype.buildings = function() {
      if (_empty(this.record.number_of_buildings)) {
        return '';
      }
      return this.record.number_of_buildings.toString().roomRange();
    };

    TeaserRecord.prototype.bathrooms = function() {
      var bathrooms = _.get(this.record, 'buildings[0].rooms.baths.total');
      if (_empty(bathrooms)) {
        return '';
      }
      return bathrooms.toString().roomRange();
    };

    TeaserRecord.prototype.bedrooms = function() {
      var bedrooms = _.get(this.record, 'buildings[0].rooms.bed');
      if (_empty(bedrooms)) {
        return '';
      }
      return bedrooms.toString().roomRange();
    };

    TeaserRecord.prototype.getLotSize = function () {
      var dimensions = this.record.dimensions || {};
      return (dimensions.width || 0) * (dimensions.depth || 0);
    };

    TeaserRecord.prototype.lotSize = function() {
      var lotSize = this.getLotSize();
      if (_empty(lotSize)) {
        return '';
      }
      if (lotSize > 43560/2) {
        return ((parseFloat(lotSize) / 43560).toFixed(2)).numberRange(0.75);
      } else {
        return lotSize.toString().numberRange(2750).numberize();
      }
    };

    TeaserRecord.prototype.isLargeLotSize = function() {
      var lotSize = this.getLotSize();
      if (_empty(lotSize)) {
        return false;
      }
      return lotSize > 43560 / 2;
    };

    TeaserRecord.prototype.constructionType = function() {
      if (_empty(this.record.construction_type)) {
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
      return type[this.record.construction_type];
    };

    TeaserRecord.prototype.buildingClass = function() {
      if (_empty(this.record.buildings)) {
        return '';
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
      return type[this.record.buildings[0].class];
    };

    TeaserRecord.prototype.getBuldingClass = function() {
      return _.get(this.record, 'buildings[0].class');
    };

    TeaserRecord.prototype.isCommercial = function() {
      return this.getBuldingClass() == 8;
    };

    TeaserRecord.prototype.isMisc = function() {
      return this.getBuldingClass() == 9;
    };

    TeaserRecord.prototype.owner = function() {
      if (_empty(this.record.deeds) || this.record.deeds.length === 0) {
        return '';
      }
      return this.record.deeds[0].transfer.buyers[0].name.full.ownerize().redact();
    };

    // TODO: Validate if we need this.
    /*TeaserRecord.prototype.lender = function() {
      if (_empty(this.record.deeds) || this.record.deeds.length === 0) {
        return '';
      }
      return this.record.deeds[0].lender_id_1st_td.ownerize().redact();
    };*/
    
    TeaserRecord.prototype.houseNumber = function () {
      return this.record.parcel_address.parsed.primary_address_number || '';
    };

    TeaserRecord.prototype.preDirection = function () {
      return this.record.parcel_address.parsed.pre_direction || '';
    };

    TeaserRecord.prototype.postDirection = function () {
      return this.record.parcel_address.parsed.post_direction || '';
    };
    

    TeaserRecord.prototype.streetName = function() {
      return this.record.parcel_address.parsed.street_name || '';
    };

    TeaserRecord.prototype.streetType = function() {
      return this.record.parcel_address.parsed.street_type || '';
    };

    TeaserRecord.prototype.street = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return (this.houseNumber() + " " +
              this.preDirection() + " " +
              this.streetName() + " " +
              this.streetType() + " " +
              this.postDirection()).despace().properCaps().addressize();
    };

    TeaserRecord.prototype.unit = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      var unit = this.record.parcel_address.parsed.unit_number || '';
      return unit.properCaps();
    };

    TeaserRecord.prototype.city = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return this.record.parcel_address.parsed.city.properCaps();
    };

    TeaserRecord.prototype.state = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return this.record.parcel_address.parsed.state;
    };

    TeaserRecord.prototype.zip5 = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      //var zip = this.record.parcel_address.parsed.zip.toString();
      // if (zip.length === 4 && zip.charAt(0) !== 0) {
      //   zip = '0' + zip;
      // }
      return this.record.parcel_address.parsed.zip5.toString().pad(5,0);
    };

    TeaserRecord.prototype.zip4 = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return this.record.parcel_address.parsed.zip4.toString().pad(4,0);
    };

    TeaserRecord.prototype.zip = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return this.zip5() + (_empty(this.zip4().toString()) ? "" : "-" + this.zip4());
    };

    TeaserRecord.prototype.fullAddress = function() {
      var street = this.street(),
          city = this.city(),
          state = this.state(),
          zip = this.zip();
      return street + " " + city + ", " + state + " " + zip;
    };

    TeaserRecord.prototype.mapImageSrc = function() {
      var url = "https://cdn1.beenverified.com/kais/prop/map-marker-star.png",
          marker = "https://cdn1.beenverified.com/kais/prop/map-marker-star-offset@2x.png";
      if (_empty(this.record.longitude) || _empty(this.record.latitude)) {
        return url;
      }

      url = "https://api.tiles.mapbox.com/v4/beenverified.lnhdcee8/pin-l-building+75b649(" + this.record.longitude.toString() + "," + this.record.latitude.toString() + ")/" + this.record.longitude.toString() + "," + this.record.latitude.toString() + ",17/220x220@2x.jpg?access_token=pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw";
      urlMarker = "https://api.tiles.mapbox.com/v4/beenverified.lnhdcee8/url-" + encodeURIComponent(marker) + "(" + this.record.longitude.toString() + "," + this.record.latitude.toString() + ")/" + this.record.longitude.toString() + "," + this.record.latitude.toString() + ",17/220x220@2x.jpg?access_token=pk.eyJ1IjoiYmVlbnZlcmlmaWVkIiwiYSI6InBLR3UwVG8ifQ.tCCuBmKzRqNMGKIY2C1YOw";

      return urlMarker;
    };

    TeaserRecord.prototype.residents = function() {
      if (_empty(this.record.residents)) {
        return '';
      }
      var residents;
      residents = _.chain(this.record.residents).map(function(resident) {
        return this._makeNameFromFull(resident);
      }, this).filter(function(resident) {
        return resident !== null;
      }).map(function(resident) {
        return resident.nameize();
      }).uniq().value().slice(0,5);
      return residents;
    };

    TeaserRecord.prototype.moreResidents = function() {
      if (_empty(this.record.residents)) {
        return '';
      }
      var num = this.record.residents.length - 5; //we display up to 5 residents
      return (num <= 0 ? 0 : num).toString().numberRange(5);
    };

    TeaserRecord.prototype.hasResidents = function() {
      return this.residents().length > 0;
    };

    TeaserRecord.prototype.noOwner = function() {
      if (_.isEmpty(this.owner()) && _.isEmpty(this.lender()) && _.isEmpty(this.marketLandValue())) {
        return true;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.test = function() {
      console.log(this.record);
      return '';
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
