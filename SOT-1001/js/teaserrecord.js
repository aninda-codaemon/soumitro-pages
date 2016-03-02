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
      this.isDeceased = false;
      var dods;
      if (this.record.DODs !== void 0) {
        if ($.type(this.record.DODs.Item.DeadAge) !== 'array') {
          dods = [this.record.DODs.Item.DeadAge];
        } else if ($.type(this.record.DODs.Item.DeadAge) === 'array') {
          dods = this.record.DODs.Item.DeadAge;
        }
        if (_not_blank(dods[0])) {
          this.age = dods[0];
          this.isDeceased = true;
        }
      }
    }

    TeaserRecord.prototype.theInput = function() {
      return this.record;
    };

    TeaserRecord.prototype._makeName = function(nameObject) {
      var name;
      if (nameObject.First === void 0 || nameObject.Last === void 0) {
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
      if (typeof address === "undefined") {
        returnAddress = 'N/A';
      } else if (_not_blank(address.City) && _not_blank(address.State)) {
        returnAddress = "" + (address.City.nameize()) + ", " + address.State;
      } else if (_not_blank(address.City)) {
        returnAddress = address.City.nameize();
      } else if (_not_blank(address.State)) {
        returnAddress = address.State;
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

    TeaserRecord.prototype.deceasedYear = function() {
      var dods, year = false;
      if (typeof this.isDeceased !== "undefined") {
        if ($.type(this.record.DODs.Item.DOD) !== 'array') {
          dods = [this.record.DODs.Item.DOD];
        } else if ($.type(this.record.DODs.Item.DOD) === 'array') {
          dods = this.record.DODs.Item.DOD;
        }
        year = dods[0].Year;
      }
      return year;
    };

    TeaserRecord.prototype.firstName = function() {
      var rname;
      rname = null;
      if (typeof this.record.Names === "undefined") {
        return '';
      } else if ($.type(this.record.Names.Name) === 'array') {
        rname = this.record.Names.Name[0].First;
      } else if ($.type(this.record.Names.Name) === 'object') {
        rname = this.record.Names.Name.First;
      }
      if (rname !== null) {
        return rname.nameize();
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.lastName = function() {
      var rname;
      rname = null;
      if (typeof this.record.Names === "undefined") {
        return '';
      } else if ($.type(this.record.Names.Name) === 'array') {
        rname = this.record.Names.Name[0].Last;
      } else if ($.type(this.record.Names.Name) === 'object') {
        rname = this.record.Names.Name.Last;
      }
      if (rname !== null) {
        return rname.nameize();
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.middleName = function() {
      var rname;
      rname = null;
      if (typeof this.record.Names === "undefined") {
        return '';
      } else if ($.type(this.record.Names.Name) === 'array') {
        if (this.record.Names.Name[0].Middle) {
          rname = this.record.Names.Name[0].Middle;
        } else {
          rname = "";
        }
      } else if ($.type(this.record.Names.Name) === 'object') {
        rname = this.record.Names.Name.Middle;
      }

      if (rname !== null) {
        return rname.nameize();
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.fullName = function() {
      var rname;
      rname = null;
      if (typeof this.record.Names === "undefined") {
        return '';
      } else if ($.type(this.record.Names.Name) === 'array') {
        rname = this.record.Names.Name[0];
      } else if ($.type(this.record.Names.Name) === 'object') {
        rname = this.record.Names.Name;
      }
      if (rname !== null) {
        return "" + (this._makeName(rname).nameize());
      } else {
        return 'NO NAME';
      }
    };

    TeaserRecord.prototype.profileImage = function() {
      var image;
      image = null;

      if (typeof this.record.image === "undefined") {
        return '';
      } else if (this.record.images !== void 0) {
        if ($.type(this.record.images.image) === 'array') {
          image = this.record.images.image[0].thumb;
        } else if ($.type(this.record.images.image) === 'object') {
          image = this.record.images.image;
          if ($.type(image) === 'object') {
            image = image.thumb;
          }
        }
      }

      if (image) {
        return image;
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.hasAkas = function() {
        return this.allNames().length > 0;
    };

    TeaserRecord.prototype.moreAkasCount = function() {
      if (this.allNames().length > 1) {
        return parseInt(this.allNames().length) - 1;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.setIndex = function(index) {
      return this.index = index;
    };

    TeaserRecord.prototype.rowIndex = function() {
      return this.index + 1;
    };

    TeaserRecord.prototype.allNames = function() {
      var names;
      if (typeof this.record.Names === "undefined") {
        return [];
      } else if ($.type(this.record.Names.Name) !== 'array') {
        return [];
      }
      if (this.record.Names.Name.length === 1) {
        return [];
      }
      if (this.record.Names.Name.length > 1) {
        names = this.record.Names.Name.slice(1, +(this.record.Names.Name.length - 1) + 1 || 9e9);
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
      if (typeof this.record.Relatives === "undefined") {
        return [];
      } else if (this.record.Relatives === void 0) {
        return [];
      }
      if ($.type(this.record.Relatives.Relative) !== 'array') {
        relatives = [this.record.Relatives.Relative];
      } else if ($.type(this.record.Relatives.Relative) === 'array') {
        relatives = this.record.Relatives.Relative;
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
      return (relatives && relatives.length !== 0) ? relatives[0] : '';
    };

    // @TODO: create a loop that returns up to 4 relatives
    // returns checkbox markup with the name and a value with the bvid for this relative
    TeaserRecord.prototype.relativesCheckboxes = function() {
      console.log('this will return the checkboxes into the form');
    };

    TeaserRecord.prototype.relative1 = function() {
      var relatives = this.relatives();
      return (relatives && relatives.length !== 0 || relatives.length < 2) ? relatives[1] : '';
    };

    TeaserRecord.prototype.relative2 = function() {
      var relatives = this.relatives();
      return (relatives && relatives.length !== 0 || relatives.length < 3) ? relatives[2] : '';
    };

    TeaserRecord.prototype.relative3 = function() {
      var relatives = this.relatives();
      return (relatives && relatives.length !== 0 || relatives.length < 4) ? relatives[3] : '';
    };

    TeaserRecord.prototype.moreRelativesCount = function() {
      if (this.relatives().length > 1) {
        return parseInt(this.relatives().length) - 1;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.evenMoreRelativesCount = function() {
      if (this.relatives().length > 2) {
        return parseInt(this.relatives().length) - 2;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.location = function() {
      return (this.addresses()[0]||"");
    };

    TeaserRecord.prototype.otherLocations = function () {
      var addresses = this.addresses();
      if (addresses.length > 1) {
        return this.addresses().slice(1);
      } else {
        return [];
      }
    };

    TeaserRecord.prototype.city = function() {
      return (this.addresses()[0]||"").split(",")[0];
    };

    TeaserRecord.prototype.state = function() {
      return (this.addresses()[0]||"").split(",")[1];
    };

    TeaserRecord.prototype.addresses = function() {
      var addresses;
      if (typeof this.record.Addresses === "undefined"){
        return [];
      } else if (this.record.Addresses === void 0) {
        return [];
      }
      if ($.type(this.record.Addresses.Address) !== 'array') {
        addresses = [this.record.Addresses.Address];
      } else if ($.type(this.record.Addresses.Address) === 'array') {
        addresses = this.record.Addresses.Address;
      }
      return _.chain(addresses).map(function(address) {
        return this._makeAddress(address);
      }, this).uniq().filter(function (address) {
        return typeof address !== 'undefined';
      }).value();
    };

    TeaserRecord.prototype.places = function() {
      return this.addresses();
    };

    TeaserRecord.prototype.place = function() {
      var addresses = this.addresses();
      return (addresses && addresses.length !== 0) ? addresses[0] : '';
    };

    TeaserRecord.prototype.place2 = function() {
      var addresses = this.addresses();
      return (addresses && addresses.length !== 0) ? addresses[1] : '';
    };

    TeaserRecord.prototype.morePlacesCount = function() {
      if (this.addresses().length > 1) {
        return parseInt(this.addresses().length) - 1;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.evenMorePlacesCount = function() {
      if (this.addresses().length > 2) {
        return parseInt(this.addresses().length) - 2;
      } else {
        return false;
      }
    };

    TeaserRecord.prototype.hasAddresses = function() {
      return this.addresses().length > 0;
    };

    TeaserRecord.prototype.exactSearchMatch = function() {

      var firstName = this.firstName() || '',
          //middleName = this.middleName() || '',
          middleName = this.middleName().charAt(0) || '',
          lastName = this.lastName() || '';

      if (typeof amplify === 'undefined') {
        return false;
      }

      var result = '',
          searchData = amplify.store('searchData');
      if (typeof searchData.mi !== 'undefined' && searchData.mi.trim() !== '') {
        result = searchData.fn.trim().toLowerCase() === firstName.trim().toLowerCase() &&
                 searchData.mi.trim().toLowerCase() === middleName.trim().toLowerCase() &&
                 searchData.ln.trim().toLowerCase() === lastName.trim().toLowerCase();
      } else {
        result = searchData.fn.trim().toLowerCase() === firstName.trim().toLowerCase() &&
                 searchData.ln.trim().toLowerCase() === lastName.trim().toLowerCase();
      }
      return result;
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
