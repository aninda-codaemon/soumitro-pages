// Generated by CoffeeScript 1.6.3
(function() {
  var TeaserRecord, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  TeaserRecord = (function() {
    function TeaserRecord(record) {
      this.record = record;
      this.bvid = this.record.bvid;
      this.age = this.record.age;
      this.index = null;
      this.personHash = base64.encode(JSON.stringify(this.record));
    }
    TeaserRecord.prototype.theInput = function() {
      return this.record;
    }
    TeaserRecord.prototype._makeName = function(nameObject) {
      var name;
      if (nameObject["First"] === void 0 || nameObject["Last"] === void 0) {
        return null;
      } else {
        name = _.chain(["First", "Middle", "Last"]).map(function(key) {
          return nameObject[key];
        }).filter(function(namePart) {
          return _not_blank(namePart);
        }).value().join(" ");
        return name;
      }
    };

    TeaserRecord.prototype._makeAddress = function(address) {
      var returnAddress;
      if (typeof address === 'undefined') {
        returnAddress = 'N/A';
      } else if (_not_blank(address["City"]) && _not_blank(address["State"])) {
        returnAddress = "" + (address["City"].nameize()) + ", " + address["State"];
      } else if (_not_blank(address["City"])) {
        returnAddress = address["City"].nameize();
      } else if (_not_blank(address["State"])) {
        returnAddress = address["State"];
      }
      return returnAddress;
    };

    TeaserRecord.prototype.displayAge = function() {
      if (this.age) {
        return this.age;
      } else {
        return "N/A";
      }
    };

    TeaserRecord.prototype.firstName = function() {
      var name;
      name = null;
      if ($.type(this.record["Names"]["Name"]) === 'array') {
        name = this.record["Names"]["Name"][0]["First"];
      } else if ($.type(this.record["Names"]["Name"]) === 'object') {
        name = this.record["Names"]["Name"]["First"];
      }
      return name.nameize();
    };

    TeaserRecord.prototype.lastName = function() {
      var name;
      name = null;
      if ($.type(this.record["Names"]["Name"]) === 'array') {
        name = this.record["Names"]["Name"][0]["Last"];
      } else if ($.type(this.record["Names"]["Name"]) === 'object') {
        name = this.record["Names"]["Name"]["Last"];
      }
      return "" + (name.nameize());
    };

    TeaserRecord.prototype.middleName = function() {
      var name;
      name = null;
      if ($.type(this.record["Names"]["Name"]) === 'array') {
        name = this.record["Names"]["Name"][0]["Middle"];
      } else if ($.type(this.record["Names"]["Name"]) === 'object') {
        name = this.record["Names"]["Name"]["Middle"];
      }
      return "" + (name.nameize());
    };

    TeaserRecord.prototype.fullName = function() {
      var name;
      name = null;
      if ($.type(this.record["Names"]["Name"]) === 'array') {
        name = this.record["Names"]["Name"][0];
      } else if ($.type(this.record["Names"]["Name"]) === 'object') {
        name = this.record["Names"]["Name"];
      }
      if (this._makeName(name) !== null) {
        return "" + (this._makeName(name).nameize());
      } else {
        return 'NO NAME';
      }
    };

    TeaserRecord.prototype.hasAkas = function() {
      return this.allNames().length > 0;
    };

    TeaserRecord.prototype.setIndex = function(index) {
      return this.index = index;
    };

    TeaserRecord.prototype.rowIndex = function() {
      return this.index + 1;
    };

    TeaserRecord.prototype.allNames = function() {
      var names;
      if ($.type(this.record["Names"]["Name"]) !== 'array') {
        return [];
      }
      if (this.record["Names"]["Name"].length === 1) {
        return [];
      }
      if (this.record["Names"]["Name"].length > 1) {
        names = this.record["Names"]["Name"].slice(1, +(this.record["Names"]["Name"].length - 1) + 1 || 9e9);
        return _.chain(names).map(function(name) {
          return this._makeName(name);
        }, this).filter(function(name) {
          return name !== null;
        }).map(function(name) {
          return name.nameize();
        }).uniq().value();
      }
    };

    TeaserRecord.prototype.relatives = function() {
      var relatives;
      if (this.record["Relatives"] === void 0) {
        return [];
      }
      if ($.type(this.record["Relatives"]["Relative"]) !== 'array') {
        relatives = [this.record["Relatives"]["Relative"]];
      } else if ($.type(this.record["Relatives"]["Relative"]) === 'array') {
        relatives = this.record["Relatives"]["Relative"];
      }
      return _.chain(relatives).map(function(relative) {
        return this._makeName(relative);
      }, this).filter(function(relative) {
        return relative !== null;
      }).map(function(relative) {
        return relative.nameize();
      }).uniq().value();
    };

    TeaserRecord.prototype.relative = function() {
      var relatives = this.relatives();

      if (relatives && relatives.length !== 0) {
        // @TODO: make a loop that returns a relative once it is found
        if (relatives[0]) {
          return relatives[0]
        } else {
          return relatives[1]
        }
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.addresses = function() {
      var addresses;
      if (this.record["Addresses"] === void 0) {
        return [];
      }
      if ($.type(this.record["Addresses"]["Address"]) !== 'array') {
        addresses = [this.record["Addresses"]["Address"]];
      } else if ($.type(this.record["Addresses"]["Address"]) === 'array') {
        addresses = this.record["Addresses"]["Address"];
      }
      return _.chain(addresses).map(function(address) {
        return this._makeAddress(address);
      }, this).uniq().value();
    };

    TeaserRecord.prototype.placesCount = function() {
      var addresses = this.addresses();

      if (addresses && addresses.length !== 0) {
        return addresses.length;
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.places = function() {
      return this.addresses();
    };

    TeaserRecord.prototype.place = function() {
      var addresses = this.addresses();

      if (addresses && addresses.length !== 0) {
        // @TODO: make a loop that returns an address once it is found
        if (addresses[0]) {
          return addresses[0]
        } else {
          return addresses[1]
        }
      } else {
        return '';
      }
      //return (addresses && addresses.length !== 0) ? addresses[0] : '';
    };

    TeaserRecord.prototype.hasAddresses = function() {
      return this.addresses().length > 0;
    };

    TeaserRecord.prototype.hasPhone = function() {
      return true;
    };

    TeaserRecord.prototype.criminalRecords = function() {
      var criminalRecords;
      if (this.record["hasCriminal"] === false) {
        return [];
      } else {
        criminalRecords = this.record["extraData"];
        return criminalRecords[0];
      }
    };

    TeaserRecord.prototype.criminalRecordsCount = function() {
      var criminalRecords = this.criminalRecords();
      return criminalRecords.count;
    };

    TeaserRecord.prototype.test = function() {
      return this.record;
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
