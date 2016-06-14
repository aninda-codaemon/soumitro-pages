/**
 * Checks a given string for a valid credit card
 * @returns:
 *   -1  invalid
 *       1       mastercard
 *       2       visa
 *       3       amex
 *       4       diners club
 *       5       discover
 *       6       enRoute
 *       7       jcb
 */
(function(root) {

  root.checkCC = function(val) {
    String.prototype.startsWith = function(str) {
      return (this.match("^" + str) == str);
    };

    Array.prototype.has = function(v, i) {
      for (var j = 0; j < this.length; j++) {
        if (this[j] == v) return (!i ? true : j);
      }
      return false;
    };

    // get rid of all non-numbers (space etc)
    val = val.replace(/[^0-9]/g, "");

    // now get digits
    var d = [],
      a = 0,
      len = 0,
      cval = val;

    while (cval !== 0) {
      d[a] = cval % 10;
      cval -= d[a];
      cval /= 10;
      a++;
      len++;
    }

    if (len < 13) {
      return 'invalid';
    }

    var cType = 'invalid';

    // mastercard
    if (val.startsWith("5")) {
      if (len != 16)
        return 'invalid';
      cType = 1;
    } else
    // visa
    if (val.startsWith("4")) {
      if (len != 16 && len != 13)
        return 'invalid';
      cType = 2;
    } else
    // amex
    if (val.startsWith("34") || val.startsWith("37")) {
      if (len != 15)
        return 'invalid';
      cType = 3;
    } else
    // diners
    if (val.startsWith("36") || val.startsWith("38") || val.startsWith("300") || val.startsWith("301") || val.startsWith("302") || val.startsWith("303") || val.startsWith("304") || val.startsWith("305")) {
      if (len != 14)
        return 'invalid';
      cType = 4;
    } else
    // discover
    if (val.startsWith("6011")) {
      if (len != 15 && len != 16)
        return 'invalid';
      cType = 5;
    } else
    // enRoute
    if (val.startsWith("2014") || val.startsWith("2149")) {
      if (len != 15 && len != 16)
        return 'invalid';
      // any digit check
      return 6;
    } else
    // jcb
    if (val.startsWith("3")) {
      if (len != 16)
        return 'invalid';
      cType = 7;
    } else
    // jcb
    if (val.startsWith("2131") || val.startsWith("1800")) {

      if (len != 15)
        return 'invalid';
      cType = 7;
    } else
      return 'invalid';
    // invalid cc company
    // lets do some calculation
    var sum = 0;
    var i;
    for (i = 1; i < len; i += 2) {
      var s = d[i] * 2;
      sum += s % 10;
      sum += (s - s % 10) / 10;
    }
    for (i = 0; i < len; i += 2)
      sum += d[i];

    // musst be %10
    if (sum % 10 !== 0) {
      return 'invalid';
    }

    return_vals = {
      '-1': 'invalid',
      '1': 'master',
      '2': 'Visa',
      '3': 'american_express',
      '4': 'invalid', //'diners club'
      '5': 'Discover',
      '6': 'invalid', //'enRoute'
      '7': 'invalid' //'jcb',
    };

    return return_vals['' + cType];
  };
}(this));