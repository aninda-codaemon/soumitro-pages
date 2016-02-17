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
        var index = 0;
        // loops through array until one is found to prevent returning an undefined object
        while (relatives[index] === undefined) {
          index++
        }
        return relatives[index];
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.relativesCountTeaser = function() {
      var relatives = this.relatives();

      if (relatives && relatives.length !== 0) {
        // the - 1 on the count is because one relative is already shown on the page
        return relatives.length -1;
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

    TeaserRecord.prototype.placesCountTeaser = function() {
      var addresses = this.addresses();

      if (addresses && addresses.length !== 0) {
        // the - 1 on the count is because one place is already shown on the page
        return addresses.length - 1;
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
        var index = 0;
        while (addresses[index] === undefined) {
          index++
        }
        return addresses[index];
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.hasAddresses = function() {
      return this.addresses().length > 0;
    };

    TeaserRecord.prototype.hasPhone = function() {
      return true;
    };

    TeaserRecord.prototype.phoneNumbers = function() {
      if (this.record["hasPhone"] === false) {
        return [];
      } else {
        var extraData = this.record["extraData"],
            phoneNumbers = _.find(extraData, { 'type': 'phones' });

        return phoneNumbers;
      }
    };

    TeaserRecord.prototype.phoneNumber = function() {
      var phoneNumbers = this.phoneNumbers();

      if (phoneNumbers && phoneNumbers.length !== 0) {
        var index = 0;
        while (phoneNumbers.phoneNumber[index] === undefined) {
          index++
        }
        return phoneNumbers.phoneNumber[index];
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.phoneNumbersCountTeaser = function() {
      var phoneNumbers = this.phoneNumbers();
      if (phoneNumbers.count <= 1) {
        return false;
      } else {
        return phoneNumbers.count -1;
      }
    };

    TeaserRecord.prototype.emails = function() {
      if (this.record["hasEmail"] === false) {
        return [];
      } else {
        var extraData = this.record["extraData"],
            emails = _.find(extraData, { 'type': 'emails' });

        return emails;
      }
    };

    TeaserRecord.prototype.email = function() {
      var emails = this.emails();

      if (emails && emails.length !== 0) {
        var index = 0;
        while (emails.emailAddress[index] === undefined) {
          index++
        }
        return emails.emailAddress[index];
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.emailsCountTeaser = function() {
      var emails = this.emails();
      if (emails.count <= 1) {
        return false;
      } else {
        return emails.count -1;
      }
    };

    TeaserRecord.prototype.socialProfiles = function() {
      if (this.record["hasSocial"] === false) {
        return [];
      } else {
        var extraData = this.record["extraData"],
            socialProfiles = _.find(extraData, { 'type': 'social' });

        return socialProfiles;
      }
    };

    TeaserRecord.prototype.socialProfileIcons = function() {
      var socialProfiles = this.socialProfiles(),
          socialProfileIcons = [];

      if (socialProfiles && socialProfiles.length !== 0) {
        for (var i = 0; i < 2; i++) {
          socialProfileIcons.push(
            '<a href="#" class="scroll-to-subscribe"><img class="img-social-icon" src="img/'
            + socialProfiles.socialNetwork[i]
            + '.png" alt="' + socialProfiles.socialNetwork[i] + '" /></a>'
          );
        }
        return socialProfileIcons.join('');
      } else {
        return '';
      }
    };

    TeaserRecord.prototype.socialProfilesCountTeaser = function() {
      var socialProfiles = this.socialProfiles();
      if (socialProfiles.socialNetwork.length <= 2) {
        return false;
      } else {
        return socialProfiles.socialNetwork.length -2;
      }
    };

    TeaserRecord.prototype.criminalRecords = function() {
      if (this.record["hasCriminal"] === false) {
        return [];
      } else {
        var extraData = this.record["extraData"],
            criminalRecords = _.find(extraData, { 'type': 'criminal' });

        return criminalRecords;
      }
    };

    TeaserRecord.prototype.criminalRecordsCount = function() {
      var criminalRecords = this.criminalRecords();
      if (criminalRecords.count <= 1) {
        return false;
      } else {
        return criminalRecords.count -1;
      }
    };

    TeaserRecord.prototype.photo = function() {
      var photo = this.record["photo"];
      if (photo !== '') {
        return '<img class="user-image" src="' + photo + '" alt="" />';
      } else {
        return [];
      }
    };

    TeaserRecord.prototype.test = function() {
      return this.record;
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
