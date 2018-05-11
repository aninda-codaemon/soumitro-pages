/*
  Convenience helpers used in FrameRida.
*/
import Handlebars from 'handlebars';
import {
  slice,
  includes,
} from 'lodash';
import { nameize } from 'utils/strings';

(function initializeHelpers(H) {
  /*
    Check if the supplied argument is not 'all' or a falsy value.
    {{#validState state}} It's a state {{else}} All selected {{/validState}}
  */
  H.registerHelper('validState', function validState(stateValue, options) {
    const isValid = stateValue && (stateValue.toLowerCase() !== 'all');
    return (isValid) ? options.fn(this) : options.inverse(this);
  });

  // limit an array to a maximum of elements (from the start)
  H.registerHelper('limit', (arr, limit) => {
    if (!Array.isArray(arr)) { return []; }
    return slice(arr, 0, limit);
  });

  H.registerHelper('shortList', function shortList(akasFn) {
    const akas = akasFn.apply(this);
    if (!akas) return '';
    if (akas.length < 1) return akas.join(', ');
    const akasArr = akas.slice(0, 1);
    return akasArr.join(', ');
  });

  H.registerHelper('formattedShortList', function formattedShortList(listObj) {
    let otherElems;
    let list;

    if (typeof listObj === 'function') {
      list = listObj.apply(this);
    } else if (listObj instanceof Array) {
      list = listObj;
    } else {
      list = [];
    }

    if (list.length === 0) {
      return 'None';
    }

    const firstElem = list[0];

    if (list.length > 1) {
      otherElems = list.slice(1);
    } else {
      otherElems = [];
    }

    let output = "<div class='formatted-shortlist'>";
    output += "<span class='first-elem'>";
    output += firstElem;
    output += '</span>';

    if (otherElems.length > 0) {
      output += "<div class='other-elems'>";
      for (let i = 0; i < otherElems.length; i += 1) {
        output += `<span class='other-elem'>${otherElems[i]}</span>`;
        if (i !== (otherElems.length - 1)) {
          output += ', ';
        }
      }
      output += '</div>';
      output += `<a href='#' class='moreInfo'> <span class='glyphicon glyphicon-chevron-down'></span> ${otherElems.length} <span class='more-text' data-more-text='More' data-less-text='Less'>More</span></a>`;
    }

    output += '</div>';

    return new H.SafeString(output);
  });

  /*
    Uppercase a string.
    {{uppercase 'hello'}}
  */
  H.registerHelper('uppercase', (item) => {
    if (!item) return '';
    return item.toUpperCase();
  });

  H.registerHelper('nameize', (item) => {
    if (!item) return '';
    return nameize(item);
  });

  /*
    To be used within an each statement. Returns iterated index starting at 1
    instead of 0. return n % 2 == 0;
  */
  H.registerHelper('index', item => item.data.index + 1);

  H.registerHelper('ifIndexEven', item => (item.data.index + 1) % 2 === 0);

  H.registerHelper('ifEven', function ifEven(conditional, options) {
    if ((conditional % 2) === 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('ifOdd', function ifOdd(conditional, options) {
    if ((conditional % 2) === 0) {
      return options.inverse(this);
    }
    return options.fn(this);
  });

  H.registerHelper('every', function every(conditional, modulo, options) {
    if ((conditional % modulo) === 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('ifNot', function ifNot(x, y, options) {
    if (x !== y && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('ifIn', function ifIn(arr, elem, options) {
    if (includes(arr, elem)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('notEqual', function notEqual(x, y, options) {
    if (x && y && x.toUpperCase() !== y.toUpperCase() && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  H.registerHelper('compare', function compare(lvalue, operator, rvalue, options) {
    if (arguments.length < 3) {
      throw new Error("Handlebars Helper 'compare' needs 2 parameters");
    }
    let newOptions = options;
    let newRvalue = rvalue;
    let newOperator = operator;

    if (options === undefined) {
      newOptions = rvalue;
      newRvalue = operator;
      newOperator = '===';
    }

    const operators = {
      '==': (l, r) => l == r,               // eslint-disable-line
      '===': (l, r) => l === r,
      '!=': (l, r) => l != r,               // eslint-disable-line 
      '!==': (l, r) => l !== r,
      '&lt;': (l, r) => l < r,
      '&gt;': (l, r) => l > r,
      '&lt;=': (l, r) => l <= r,
      '&gt;=': (l, r) => l >= r,
      typeof: (l, r) => typeof l === r,     // eslint-disable-line
    };

    if (!operators[newOperator]) {
      throw new Error(`Handlerbars Helper 'compare' doesn't know the operator ${newOperator}`);
    }

    const result = operators[newOperator](lvalue, newRvalue);
    return result ? newOptions.fn(this) : newOptions.inverse(this);
  });

  H.registerHelper('isEqual', function isEqual(x, y, options) {
    if (x && y && x.toUpperCase() === y.toUpperCase() && y) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  /*
    Title a string. eg : las vegas => Las Vegas
    {{titleUpperCase 'las vegas'}}
  */

  H.registerHelper('titleUpperCase', (item) => {
    var i;
    if (!item) return '';
    item = item.toLowerCase().split(' ');
    for (i = 0; i < item.length; i++) {
      item[i] = item[i].charAt(0).toUpperCase() + item[i].slice(1);
    }
    return item.join(' ');
  });
}(Handlebars));
