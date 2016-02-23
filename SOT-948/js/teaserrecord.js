(function() {
  var TeaserRecord, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  TeaserRecord = (function() {
    function TeaserRecord(record) {
      this.record = record;
      this.index = null;
      //this.personHash = base64.encode(JSON.stringify(this.record));
    }
    TeaserRecord.prototype.theInput = function() {
      return this.record;
    };

    TeaserRecord.prototype.firstName = function() {
      var name = '';
      if (this.record && this.record.contactInfo && typeof this.record.contactInfo.givenName !== 'undefined') {
        name = this.record.contactInfo.givenName;
      }
      return "" + name.nameize();
    };

    TeaserRecord.prototype.lastName = function() {
      var name = '';
      if (this.record && this.record.contactInfo && typeof this.record.contactInfo.familyName !== 'undefined') {
        name = this.record.contactInfo.familyName;
      }
      return "" + name.nameize();
    };

    TeaserRecord.prototype.middleName = function() {
      var name = '';

      return "" + (name.nameize());
    };

    TeaserRecord.prototype.fullName = function() {
      var name = '';
      if (this.record && this.record.contactInfo && typeof this.record.contactInfo.fullName !== 'undefined') {
        name = this.record.contactInfo.fullName;
      }
      return name.nameize();
    };

    TeaserRecord.prototype.websites = function() {
      var websites;
      if (this.record && this.record.contactInfo && typeof this.record.contactInfo.websites !== 'undefined') {
        websites = _.chain(this.record.contactInfo.websites)
          .map(function(website) {
            return website;
          }).value();
      }
      return websites;
    };

    TeaserRecord.prototype.websiteCount = function() {
      var websites = this.websites();
      return (websites && websites.length !== 0) ? websites.length : 0;;
    };

    TeaserRecord.prototype.gender = function() {
      var gender = '';
      if (this.record && this.record.demographics && typeof this.record.demographics.gender !== 'undefined') {
        gender = this.record.demographics.gender;
      }
      return gender;
    };

    TeaserRecord.prototype.age = function() {
      var age = '';
      if (this.record && this.record.demographics && typeof this.record.demographics.age !== 'undefined') {
        age = this.record.demographics.age;
      }
      return age;
    };

    TeaserRecord.prototype.location = function() {
      var location = '';
      if (this.record && this.record.demographics) {
        if (typeof this.record.demographics.locationGeneral !== 'undefined') {
          location = this.record.demographics.locationGeneral;
        }
        if (typeof this.record.demographics.locationDeduced !== 'undefined') {
          location = this.record.demographics.locationDeduced.deducedLocation;
        }
      }
      return location;
    };

    TeaserRecord.prototype.socialProfiles = function() {
      var profiles;
      if (this.record && this.record.socialProfiles && this.record.socialProfiles[0] && typeof this.record.socialProfiles[0].type !== 'undefined') {
        profiles = _.chain(this.record.socialProfiles).map(function(profile) {
          return profile;
        }).value();
      }
      return profiles;
    };

    TeaserRecord.prototype.socialProfileCount = function() {
      var profiles = this.socialProfiles();
      return (profiles && profiles.length !== 0) ? profiles.length : 0;;
    };

    TeaserRecord.prototype.photo = function() {
      var photos;
      if (this.record && this.record.photos && this.record.photos[0] && typeof this.record.photos[0].type !== 'undefined') {
        photos = _.chain(this.record.photos)
          .sortBy('isPrimary').map(function(photo) {
            return photo.url;
          }, this).first().value();
      }
      return photos;
    };

    TeaserRecord.prototype.allPhotos = function() {
      var photos;
      if (this.record && this.record.photos && this.record.photos[0] && typeof this.record.photos[0].type !== 'undefined') {
        photos = _.chain(this.record.photos)
          .sortBy('isPrimary').map(function(photo) {
            return photo;
          }).value();
      }
      return photos;
    };

    TeaserRecord.prototype.photoCount = function() {
      var photos = this.allPhotos();
      return (photos && photos.length !== 0) ? photos.length : 0;;
    };

    TeaserRecord.prototype.test = function() {
      return this.record;
    };

    return TeaserRecord;

  })();

  root.TeaserRecord = TeaserRecord;

}).call(this);
