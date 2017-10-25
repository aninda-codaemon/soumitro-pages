import base64 from 'hi-base64';
import _ from 'lodash';

import { isEmpty, nameize } from 'utils/strings';

const TeaserRecord = (function () {
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
      if (isEmpty(dods[0])) {
        this.age = dods[0];
        this.isDeceased = true;
      }
    }
  }

  TeaserRecord.prototype.theInput = function () {
    return this.record;
  };

  TeaserRecord.prototype._makeName = function (nameObject) {
    var name;
    if (nameObject.First === void 0 || nameObject.Last === void 0) {
      return null;
    } else {
      name = _.chain(["First", "Middle", "Last"]).map(function (key) {
        return nameObject[key];
      }).filter(function (namePart) {
        return isEmpty(namePart);
      }).value().join(" ");
      return name;
    }
  };

  TeaserRecord.prototype._makeAddress = function (address) {
    var returnAddress;
    if (typeof address === "undefined") {
      returnAddress = 'N/A';
    } else if (isEmpty(address.City) && isEmpty(address.State)) {
      returnAddress = "" + (nameize(address.City)) + ", " + address.State;
    } else if (isEmpty(address.City)) {
      returnAddress = nameize(address.City);
    } else if (isEmpty(address.State)) {
      returnAddress = address.State;
    }
    return returnAddress;
  };

  TeaserRecord.prototype.displayAge = function () {
    if (this.age) {
      return this.age;
    } else {
      return "N/A";
    }
  };

  TeaserRecord.prototype.deceasedYear = function () {
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

  TeaserRecord.prototype.firstName = function () {
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
      return nameize(rname);
    } else {
      return '';
    }
  };

  TeaserRecord.prototype.lastName = function () {
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
      return nameize(rname);
    } else {
      return '';
    }
  };

  TeaserRecord.prototype.middleName = function () {
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
      return nameize(rname);
    } else {
      return '';
    }
  };

  TeaserRecord.prototype.fullName = function () {
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
      return "" + (nameize(this._makeName(rname)));
    } else {
      return 'NO NAME';
    }
  };

  TeaserRecord.prototype.profileImage = function () {
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

  TeaserRecord.prototype.hasAkas = function () {
    return this.allNames().length > 0;
  };

  TeaserRecord.prototype.moreAkasCount = function () {
    if (this.allNames().length > 1) {
      return parseInt(this.allNames().length) - 1;
    } else {
      return false;
    }
  };

  TeaserRecord.prototype.setIndex = function (index) {
    return this.index = index;
  };

  TeaserRecord.prototype.rowIndex = function () {
    return this.index + 1;
  };

  TeaserRecord.prototype.allNames = function () {
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
      return _.chain(names).map(function (name) {
        return this._makeName(name);
      }, this).filter(function (name) {
        return name !== null;
      }).map(function (name) {
        return nameize(name);
      }).uniq().value();
    }
  };

  TeaserRecord.prototype.relatives = function () {
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
    return _.chain(relatives).map(function (relative) {
      return this._makeName(relative);
    }, this).filter(function (relative) {
      return relative !== null;
    }).map(function (relative) {
      return nameize(relative);
    }).uniq().value();
  };

  TeaserRecord.prototype.relative = function () {
    var relatives = this.relatives();
    return (relatives && relatives.length !== 0) ? relatives[0] : '';
  };

  /*TeaserRecord.prototype.relativesCount = function() {
    if (this.relatives().length > 1) {
      return parseInt(this.relatives().length);
    } else {
      return false;
    }
  };*/

  TeaserRecord.prototype.moreRelativesCount = function () {
    if (this.relatives().length > 1) {
      return parseInt(this.relatives().length) - 1;
    } else {
      return false;
    }
  };

  TeaserRecord.prototype.evenMoreRelativesCount = function () {
    if (this.relatives().length > 2) {
      return parseInt(this.relatives().length) - 2;
    } else {
      return false;
    }
  };

  TeaserRecord.prototype.location = function () {
    return (this.addresses()[0] || "");
  };

  TeaserRecord.prototype.otherLocations = function () {
    var addresses = this.addresses();
    if (addresses.length > 1) {
      return this.addresses().slice(1);
    } else {
      return [];
    }
  };

  TeaserRecord.prototype.city = function () {
    return (this.addresses()[0] || "").split(",")[0];
  };

  TeaserRecord.prototype.state = function () {
    return (this.addresses()[0] || "").split(",")[1];
  };

  TeaserRecord.prototype.addresses = function () {
    var addresses;
    if (typeof this.record.Addresses === "undefined") {
      return [];
    } else if (this.record.Addresses === void 0) {
      return [];
    }
    if ($.type(this.record.Addresses.Address) !== 'array') {
      addresses = [this.record.Addresses.Address];
    } else if ($.type(this.record.Addresses.Address) === 'array') {
      addresses = this.record.Addresses.Address;
    }
    return _.chain(addresses)
      .map(address => this._makeAddress(address))
      .uniq()
      .filter(address => typeof address !== 'undefined')
      .value();
  };

  TeaserRecord.prototype.places = function () {
    return this.addresses();
  };

  TeaserRecord.prototype.place = function () {
    var addresses = this.addresses();
    return (addresses && addresses.length !== 0) ? addresses[0] : '';
  };

  TeaserRecord.prototype.place2 = function () {
    var addresses = this.addresses();
    return (addresses && addresses.length !== 0) ? addresses[1] : '';
  };

  TeaserRecord.prototype.morePlacesCount = function () {
    if (this.addresses().length > 1) {
      return parseInt(this.addresses().length) - 1;
    } else {
      return false;
    }
  };

  TeaserRecord.prototype.evenMorePlacesCount = function () {
    if (this.addresses().length > 2) {
      return parseInt(this.addresses().length) - 2;
    } else {
      return false;
    }
  };

  TeaserRecord.prototype.hasAddresses = function () {
    return this.addresses().length > 0;
  };

  TeaserRecord.prototype.criminalCount = function () {
    if (!this.record.hasCriminal) {
      return false;
    } else {
      var extraData = this.record.extraData;
      var crimRecords = _.find(extraData, { 'type': 'criminal' });
      return crimRecords.count;
    }
  };
  TeaserRecord.prototype.bankruptcyCount = function () {
    if (!this.record.hasBankruptcy) {
      return 0;
    } else {
      var extraData = this.record.extraData,
        bankruptcies = _.find(extraData, { 'type': 'bankruptcy' });
      return bankruptcies.count;
    }
  };
  TeaserRecord.prototype.associatedCount = function () {
    var extraData = this.record.extraData,
      associates = _.find(extraData, { 'type': 'associates' });
    if (associates) {
      return associates.count;
    } else {
      return 0
    }
  };

  TeaserRecord.prototype.relativesCount = function () {

    var extraData = this.record.extraData,
      relatives = _.find(extraData, { 'type': 'relatives' });

    if (relatives) {
      return relatives.count;
    } else {
      return 0
    }
  };
  TeaserRecord.prototype.emailCount = function () {
    if (!this.record.hasEmail) {
      return 0;
    } else {
      var extraData = this.record.extraData,
        emails = _.find(extraData, { 'type': 'emails' }) || {};
      if (emails.count < 1) {
        return false;
      } else {
        return emails.count;
      }
    }
  };
  TeaserRecord.prototype.phoneCount = function () {
    if (!this.record.hasPhone) {
      return 0;
    } else {
      var extraData = this.record.extraData,
        phoneNumbers = _.find(extraData, { 'type': 'phones' }) || {};
      return phoneNumbers.count;
    }
  };
  TeaserRecord.prototype.socialProfiles = function () {
    if (!this.record.hasSocial) {
      return 0;
    }
    var extraData = this.record.extraData,
      profiles = _.find(extraData, { 'type': 'social' }) || {};
    return profiles.count;
  };
  TeaserRecord.prototype.photos = function () {
    if (!this.record.hasPhotos) {
      return false;
    } else {
      var extraData = this.record.extraData,
        photos = _.find(extraData, { 'type': 'photos' }) || {};
      return photos;
    }
  };
  TeaserRecord.prototype.photosCount = function () {
    var photos = this.photos();
    if (photos) {
      return photos.count;
    } else {
      return 0;
    }
  };
  TeaserRecord.prototype.recordCount = function () {

    var criminal = this.criminalCount() === false ? 0 : this.criminalCount(),
      bankruptcy = this.bankruptcyCount(),
      associates = this.associatedCount(),
      relatives = this.relativesCount(),
      emails = this.emailCount(),
      phones = this.phoneCount(),
      profiles = this.socialProfiles(),
      photos = this.photosCount(),
      addresses = this.addresses().length;
    var count = criminal + bankruptcy + associates + emails + phones + profiles + photos + addresses + relatives;
    return count <= 4 ? false : count;
  };
  TeaserRecord.prototype.recordCountDisplay = function () {
    var count = this.recordCount();
    if (count === 1) {
      return "1 record";
    } else {
      return count + " records";
    }
  };
  TeaserRecord.prototype.criminalCountDisplay = function () {
    var criminalCount = this.criminalCount();
    if (criminalCount === 1) {
      return "1 is a criminal or traffic record!";
    } else {
      return criminalCount + " are criminal or traffic records!";
    }
  };

  TeaserRecord.prototype.exactSearchMatch = function () {

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

// TODO: Remove this once we get rid of Framerida.
window.TeaserRecord = TeaserRecord;

export { TeaserRecord };
