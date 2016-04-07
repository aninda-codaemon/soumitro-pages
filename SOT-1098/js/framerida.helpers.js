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

  /*
    Uppercase a string.
    {{uppercase 'hello'}}
  */
  H.registerHelper('uppercase', function (item) {
    if (!item) return "";
    return item.toUpperCase();
  });
  
  /*
    To be used within an each statement. Returns iterated index starting at 1
    instead of 0.
  */
  H.registerHelper('index', function (item) {
    return item.data.index + 1;
  });

}(Handlebars));