(function() {
  var root, EmailRecord;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  EmailRecord = (function(){
    function EmailRecord(record) {
      this.record = record;
      this.email = this.record.emailaddress;
    }

    EmailRecord.prototype.email = function() {
      return this.email;
    };
    EmailRecord.prototype.fullName = function() {
      if (!this.record['contactInfo']['fullName']) {
        return '';
      } else {
        return this.record['contactInfo']['fullName'];
      }
    };

    EmailRecord.prototype.socialProfiles = function() {
      if (!this.record['socialProfiles']) {
        return [];
      } else {
        return this.record['socialProfiles'];
      }
    };

    EmailRecord.prototype.profilesCountTeaser = function() {
      var socialProfiles = this.socialProfiles();

      if (socialProfiles && socialProfiles.length !== 0) {
        return socialProfiles.length;
      } else {
        return '';
      }
    };

    EmailRecord.prototype.photos = function() {
      if (!this.record['photos']){
        return [];
      } else {
        return this.record['photos'];
      }
    };

    EmailRecord.prototype.photosCountTeaser = function () {
      var photos = this.photos();

      if (Array.isArray(photos) && photos && photos.length !==0) {
        return photos.length;
      } else if (typeof photos === "object") {
        return 1;
      } else {
        return '';
      }
    }

    EmailRecord.prototype.careers = function() {
      if (!this.record['organizations']){
        return [];
      } else {
        return this.record['organizations'];
      }
    };

    EmailRecord.prototype.careersCountTeaser = function () {
      var careers = this.careers();

      if (Array.isArray(careers) && careers && careers.length !==0) {
        return careers.length;
      } else if (typeof careers === "object") {
        return 1;
      } else {
        return '';
      }
    }

    EmailRecord.prototype.footprints = function() {
      if (!this.record['digitalFootprint']){
        return [];
      }

      if (!this.record['digitalFootprint']['topics']){
        return [];
      } else {
        return this.record['digitalFootprint']['topics'];
      }
    };

    EmailRecord.prototype.footprintsCountTeaser = function () {
      var footprint = this.footprints();

      var footprints = this.footprints();

      if (footprints && footprints.length !== 0) {
        return footprints.length;
      } else {
        return '';
      }
    }

    EmailRecord.prototype.location = function() {
      if (!this.record['demographics']){
        return false;
      }

      if (!this.record['demographics']['locationDeduced']){
        return '';
      } else {
        return this.record['demographics']['locationDeduced'].city.name +", " + this.record['demographics']['locationDeduced'].state.code;
      }
    };

    EmailRecord.prototype.prettyRecord = function() {
      return JSON.stringify(this.record, null, 2);
    };


    return EmailRecord;
  })();

  root.EmailRecord = EmailRecord;
}).call(this);
