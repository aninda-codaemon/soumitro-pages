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

  
  H.registerHelper('shortList', function (akasFn) {
    var akas = akasFn.apply(this);
    if (!akas) return '';
    if (akas.length < 4) return akas.join(", ");
    var akasArr = akas.slice(0, 3);
    return akasArr.join(", ");
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
     if (x !== y && y) {
       return options.fn(this);
     }
     return options.inverse(this);
   });

  H.registerHelper('notEqual', function (x, y, options) {
    if (x && y && x.toUpperCase() !== y.toUpperCase() && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

}(Handlebars));

