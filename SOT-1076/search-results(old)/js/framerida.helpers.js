/*
  Convenience helpers used in FrameRida.
*/

(function (H) {

  /*
    Check if the supplied argument is not 'all' or a falsy value.
    {{#validState state}} It's a state {{else}} All selected {{/validState}}
  */
  H.registerHelper('validState', function (stateValue, options) {
    var isValid = stateValue && (stateValue.toLowerCase() !== "all");
    return (isValid) ? options.fn(this) : options.inverse(this);
  });

  // limit an array to a maximum of elements (from the start)
  H.registerHelper('limit', function (arr, limit) {
    if (!_.isArray(arr)) { return []; }
    return _.slice(arr, 0, limit);
  });

  H.registerHelper('shortList', function (akasFn) {
    var akas = akasFn.apply(this);
    if (!akas) return '';
    if (akas.length < 1) return akas.join(", ");
    var akasArr = akas.slice(0, 1);
    return akasArr.join(", ");
  });


  H.registerHelper('formattedShortList', function (listObj) {

    var firstElem,
        otherElems,
        list;

    if (typeof listObj === 'function') {
      list = listObj.apply(this);
    } else if (listObj instanceof Array) {
      list = listObj;
    } else {
      list = [];
    }

    if (list.length === 0) {
      return "None";
    }

    firstElem = list[0];

    if (list.length > 1) {
      otherElems = list.slice(1);
    } else {
      otherElems = [];
    }

    var output = "<div class='formatted-shortlist'>";
    output += "<span class='first-elem'>";
    output += firstElem;
    output += "</span>";

    if (otherElems.length > 0) {
      output += "<div class='other-elems'>";
      for (var i = 0; i < otherElems.length; i += 1) {
        output += "<span class='other-elem'>"+ otherElems[i] + "</span>";
        if (i !== (otherElems.length - 1)) {
          output += ", ";
        }
      }
      output += "</div>";
      output += "<a href='#' class='moreInfo'> <span class='glyphicon glyphicon-chevron-down'></span> "+ otherElems.length +" <span class='more-text' data-more-text='More' data-less-text='Less'>More</span></a>";
    }

    output += "</div>";

    return new H.SafeString(output);
  });

  /*
    Uppercase a string.
    {{uppercase 'hello'}}
  */
  H.registerHelper('uppercase', function (item) {
    if (!item) return "";
    return item.toUpperCase();
  });

  H.registerHelper('nameize', function (item) {
    if (!item) return "";
    return item.nameize();
  });

  /*
    To be used within an each statement. Returns iterated index starting at 1
    instead of 0. return n % 2 == 0;
  */
  H.registerHelper('index', function (item) {
    return item.data.index + 1;
  });
  H.registerHelper('ifIndexEven', function (item) {
    return (item.data.index + 1) % 2 === 0;
  });

  H.registerHelper('ifEven', function(conditional, options) {
    if((conditional % 2) === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  H.registerHelper('ifOdd', function(conditional, options) {
    if((conditional % 2) === 0) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  H.registerHelper('every', function(conditional, modulo, options) {
    if((conditional % modulo) === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  H.registerHelper('ifNot', function (x, y, options) {
   if (x !== y && y) {
     return options.fn(this);
   }
   return options.inverse(this);
  });

  H.registerHelper('ifIn', function(arr, elem, options) {
    //console log(arr);
    if (_.includes(arr, elem)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  H.registerHelper('notEqual', function (x, y, options) {
    if (x && y && x.toUpperCase() !== y.toUpperCase() && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlebars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '&lt;': function (l, r) { return l < r; },
        '&gt;': function (l, r) { return l > r; },
        '&lt;=': function (l, r) { return l <= r; },
        '&gt;=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

}(Handlebars));
