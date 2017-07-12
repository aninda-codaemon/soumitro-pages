(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  String.prototype.capitalize = function() {
    var letters;
    letters = this.split("");
    if (letters.length === 0) {
      return '';
    }
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
  };

  String.prototype.properCaps = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  String.prototype.despace = function() {
    return this.replace(/\s\s+/g, ' ').trim();
  };

  String.prototype.redact = function() {
    //return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + "****"});
    //return this.replace(/\*{4,}/g, "****");
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1,4).replace(/./g, '*');});
  };

  String.prototype.numberize = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  String.prototype.pad = function(p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + this).slice(-pad.length);
  };

  String.prototype.addressize = function() {
    return this.replace(/\bNw\b|\bNe\b|\bSw\b|\bSe\b|\bPo\b|\bAf\b/g, function(txt){ return txt.toUpperCase(); });
  };

  String.prototype.ownerize = function() {
    var arr = this.replace(/^\d+\s+/, '').replace(/(&amp;)/i, "&").replace(/(&\w+;|&#[0-9]+;)/g, "").split(",");
    if (arr.length >= 2) {
      return arr[1].trim() + " " + arr[0].trim();
    } else {
      return arr[0].trim();
    }
  };

  String.prototype.shortenName = function() {
    return this.match(/^\s*([\w\*]+)|\b([\w\*]+)(?=\S*$)/g).join(" ");
  };

  String.prototype.moneyFormat = function() {
    var num = Number(this);
    if (num === null) {
      return "";
    }
  // Nine Zeroes for Billions
  return Math.abs(num) >= 1.0e+9

       ? Math.abs(num) / 1.0e+9 + "B"
       // Six Zeroes for Millions
       : Math.abs(num) >= 1.0e+6

       ? Math.abs(num) / 1.0e+6 + "M"
       // Three Zeroes for Thousands
       : Math.abs(num) >= 1.0e+3

       ? Math.abs(num) / 1.0e+3 + "K"

       : Math.abs(num);

   };

  String.prototype.moneyRange = function(base) {
    var num = Number(this),
        high = Math.ceil(num / (base)) * (base),
        low = Math.floor(num / (base)) * (base);
    if (low === high) {
      high = Math.ceil((num+1) / base) * base;
    }
    return low.toString().moneyFormat() + "-" + high.toString().moneyFormat();
  };

  String.prototype.numberRange = function(base) {
    var num = Number(this),
        high = Math.ceil(num / base) * base,
        low = Math.floor(num / base) * base;
    if (low === high) {
        high = Math.ceil((num+1) / base) * base;
    }
    return low + "-" + high;
  };

  String.prototype.yearRange = function(base) {
    var num = Number(this),
        high = Math.ceil(num / base) * base,
        low = Math.floor(num / base) * base,
        year = new Date().getFullYear();
    if (low === high) {
        high = Math.ceil((num+1) / base) * base;
    }
    if (high > year) {
      high = year;
    }
    return low + "-" + high;
  };

  String.prototype.roomRange = function() {
    var num = Number(this);
    if (num <= 2) {
      return "2 or fewer";
    } else if (num > 2 && num <= 4) {
      return "3 to 5";
    } else {
      return "5+";
    }
  };

  String.prototype.nameize = function() {
    var name;
    name = this;
    if (name === null) {
      return "";
    }
    if (name.match(/\s+/)) {
      return _.map(this.split(" "), function(part) {
        return part.nameize();
      }).join(" ");
    } else if (name.match(/^[A-Z][A-Z]+/)) {
      name = name.toLowerCase();
    } else {
      name = name.toLowerCase();
    }
    if (name.match(/^mac/)) {
      name = "Mac" + name.replace(/^mac/, '').capitalize();
    } else if (name.match(/^mc/)) {
      name = "Mc" + name.replace(/^mc/, '').capitalize();
    } else if (name.match(/\-/)) {
      name = _.map(name.split("-"), function(part) {
        return part.capitalize();
      }).join(' ');
    } else {
      name = name.capitalize();
    }
    return name;
  };

  root._empty = function(val) {
    if (typeof val === 'undefined') {
      return true;
    } else if (val === null) {
      return true;
    // } else if (_.isEmpty(val)) {
    //   return true;
    } else if (_.isUndefined(val)) {
      return true;
    } else {
      return false;
    }
  };

  root._blank = function(string) {
    if (typeof string === 'undefined') {
      return true;
    } else if (string === null) {
      return true;
    } else if (string.match(/^\s+$/)) {
      return true;
    } else if (string === "") {
      return true;
    } else {
      return false;
    }
  };

  root._not_blank = function(string) {
    return !_blank(string);
  };

  root.setBootstrapSelect = function(name, string) {
    var item, text;
    item = $("select[name=" + name + "] option[value='" + string + "']")[0];
    text = $(item).text();
    $('.bootstrap-select .filter-option').text(text);
    return $("select[name=" + name + "]").val(string);
  };

}).call(this);
