(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  String.prototype.properCaps = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  String.prototype.despace = function() {
    return this.replace(/\s\s+/g, ' ').trim();
  };

  String.prototype.addressize = function() {
    return this.replace(/(\s|^)\bNw\b|\bNe\b|\bSw\b|\bSe\b|\bPo\b|\bAf\b(\s|$)/g, function(txt){ return txt.toUpperCase(); });
  };

  String.prototype.capitalize = function() {
    var letters;
    letters = this.toLowerCase().split("");
    if (letters.length === 0) {
      return '';
    }
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
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

  root.setBootstrapSelect = function(name, string) {
    var item, text;
    item = $("select[name=" + name + "] option[value='" + string + "']")[0];
    text = $(item).text();
    $('.bootstrap-select .filter-option').text(text);
    return $("select[name=" + name + "]").val(string);
  };

}).call(this);
