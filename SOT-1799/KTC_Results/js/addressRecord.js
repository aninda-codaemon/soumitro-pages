(function() {
  var root, AddressRecord;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  AddressRecord = (function(){
    function AddressRecord(record) {
      this.record = record;
      this.address = this.record.mailing_address.full;
    }

    AddressRecord.prototype.prettyAddress = function() {
      var prettyAddress = this.address.split().map(function(word){
        return word.toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase()})
        })
        return prettyAddress;
      };

    AddressRecord.prototype.parcelAddress = function() {
      if (this.record['parcel_address']['full']){
        return this.record['parcel_address']['full'];
      } else {
        return this.prettyAddress();
      }
    };

    AddressRecord.prototype.deeds = function() {
      if (!this.record['deeds']) {
        return [];
      } else {
        return this.record['deeds'];
      }
    };

    AddressRecord.prototype.deedsCountTeaser = function() {
      var owners = this.deeds();

      if (deeds && deeds.length !== 0) {
        return deeds.length;
      } else {
        return '';
      }
    };

    AddressRecord.prototype.ownersCountTeaser = function() {
      var count = 0,
          owners = this.record.owners;

      Object.keys(this.record.owners).forEach(function(key){
        count += owners[key].names.length;
      });

      if (count < 1) {
        return false;
      } else {
        return count;
      }
    };

    AddressRecord.prototype.owners = function() {
      if (this.record.owners.length === 0){
        return false;
      }
      var owners = [],
      names = this.record.owners[0].names;

      Object.keys(names).forEach(function(key){
        owners.push(names[key].full.nameize());
      });

      return owners.join(", ");
    };

    AddressRecord.prototype.residents = function() {
      if (!this.record.residents) {
        return [];
      } else {
        return this.record.residents;
      }
    };

    AddressRecord.prototype.residentsCountTeaser = function() {
      var residents = this.residents();

      if (residents && residents.length !== 0) {
        return residents.length;
      } else {
        return '';
      }
    };

    AddressRecord.prototype.deeds = function() {
      if (!this.record.deeds) {
        return [];
      } else {
        return this.record.deeds;
      }
    };

    AddressRecord.prototype.deedsCountTeaser = function() {
      var deeds = this.deeds();

      if (deeds && deeds.length !== 0) {
        return deeds.length;
      } else {
        return '';
      }
    };

    AddressRecord.prototype.yearBuilt = function() {
      if (!this.record.year_built) {
        return '';
      } else {
        return this.record.year_built;
      }

    };

    AddressRecord.prototype.assessment = function() {
      if (!this.record.assessment.total) {
        return false;
      } else {
        var iGotMoney = this.record.assessment.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return '$' + iGotMoney;
      }
    };

    AddressRecord.prototype.assessedYear = function() {
      if (!this.record.assessed_year) {
        return false;
      } else {
        return this.record.assessed_year;
      }
    };

    AddressRecord.prototype.squareFootage = function() {
      if (!this.record.square_footage.total){
        return false;
      } else {
        var footage = this.record.square_footage.total;
        return footage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ft";
      }
    };

    AddressRecord.prototype.county = function() {
      if (!this.record.county_name){
        return false;
      } else {
        return this.record.county_name;
      }
    };


    AddressRecord.prototype.prettyRecord = function() {
      return JSON.stringify(this.record, null, 2);
    };


    return AddressRecord;
  })();

  root.AddressRecord = AddressRecord;
}).call(this);
