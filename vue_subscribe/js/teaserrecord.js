(function() {
  var TeaserRecord, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  TeaserRecord = (function() {
    function TeaserRecord(record) {
      this.record = record;
      this.index = null;
    }
    
    TeaserRecord.prototype.theInput = function() {
      return this.record;
    };

    TeaserRecord.prototype.preDirection = function() {
      return this.record.parcel_address.parsed.pre_direction || '';
    };

    TeaserRecord.prototype.postDirection = function() {
      return this.record.parcel_address.parsed.pre_direction || '';
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
      return (this.record.parcel_address.parsed.primary_address_number + " " +
              this.preDirection() + " " +
              this.streetName() + " " +
              this.streetType() + " " +
              this.postDirection()).despace().properCaps().addressize();
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
      return this.record.parcel_address.parsed.zip5;
    };

    TeaserRecord.prototype.zip4 = function() {
      if (_empty(this.record.parcel_address)) {
        return '';
      }
      return this.record.parcel_address.parsed.zip4;
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

    TeaserRecord.prototype.test = function() {
      return this.record;
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
