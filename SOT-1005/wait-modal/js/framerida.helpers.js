/*
  Convenience helpers used in FrameRida.
*/

(function (H) {

  /*
    Check if the supplied argument is not 'all' or a falsy value.
    {{#validState state}} It's a state {{else}} All selected {{/validState}}
  */
  H.registerHelper('validLocation', function (locationValue, options) {
    var isValid = locationValue && (locationValue.toLowerCase() !== "all");
    return (isValid) ? options.fn(this) : options.inverse(this);
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
    instead of 0.
  */
  H.registerHelper('index', function (item) {
    return item.data.index + 1;
  });

  H.registerHelper('ifNot', function (x, y, options) {
     if (_.isString(x) && _.isString(y) && x.toUpperCase() !== y.toUpperCase()) {
       return options.fn(this);
     }
     return options.inverse(this);
   });

  H.registerHelper('notEqual', function (x, y, options) {
    if (x !== y && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

}(Handlebars));
