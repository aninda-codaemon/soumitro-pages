// Generated by CoffeeScript 1.6.3
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

  root.setBootstrapSelect = function(name, string) {
    var item, text;
    item = $("select[name=" + name + "] option[value='" + string + "']")[0];
    text = $(item).text();
    $('.bootstrap-select .filter-option').text(text);
    return $("select[name=" + name + "]").val(string);
  };

}).call(this);
