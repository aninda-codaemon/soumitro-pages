(function() {
  var root, PhoneRecord;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  PhoneRecord = (function(){
    function PhoneRecord(record) {
      this.record = record;
    }

    PhoneRecord.prototype.phone = function() {
      if (!this.record.phones[0]){
        return false;
      } else {
        return this.record.phones[0].number.phonify();
      }
    };
    PhoneRecord.prototype.ownerName = function() {
      if (!this.record.names[0]) {
        return false;
      } else {
        return this.record.names[0].full.nameize();
      }
    };

    PhoneRecord.prototype.city = function() {
      if (!this.record.addresses[0]) {
        return false;
      } else {
        return this.record.addresses[0].parts.city;
      }
    };

    PhoneRecord.prototype.location = function(){
      if (!this.record.addresses[0]) {
        return false;
      } else {
        return this.record.addresses[0].parts.city + ", " + this.record.addresses[0].parts.state;
      }
    };

    PhoneRecord.prototype.carrier = function() {
      if (!this.record.carrier) {
        return false;
      } else {
        return this.record.carrier.nameize();
      }
    };

    PhoneRecord.prototype.spamScore = function() {
      if (!this.record.spam_score && this.record.spam_score !== 0){
        return false;
      } else {
        return this.record.spam_score.toString();
      }
    };

    PhoneRecord.prototype.businesses = function() {
      if (!this.record.businesses) {
        return false;
      } else {
        return this.record.businesses.length ;
      }
    };

    PhoneRecord.prototype.phoneNumbers = function() {
      if (!this.record.phones || this.record.phones.length === 1){
        return false;
      } else {
        return this.record.phones.length;
      }
    };

    PhoneRecord.prototype.lineType = function() {
      if (!this.record.type){
        return false;
      } else {
        return (this.record.type === "L") ? "Landline" : "Cellphone";
      }
    };

    PhoneRecord.prototype.comments = function() {
      if (!this.record.comments || this.record.comments.length === 0){
        return false;
      } else {
        return this.record.comments.length;
      }
    };

    PhoneRecord.prototype.prettyRecord = function() {
      return JSON.stringify(this.record, null, 2);
    };


    return PhoneRecord;
  })();

  root.PhoneRecord = PhoneRecord;
}).call(this);
