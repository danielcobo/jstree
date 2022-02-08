const typeOf = require('@danielcobo/type');
const uuid = require('@danielcobo/uuid');
const config = require('./config.js');
const highlight = config.highlight;
const data = config.data;

/**
 * Convert any variable to string
 * @param {*} value - variable to stringify
 * @returns {string} - highlighted string presentation
 */
const toString = function toString(val) {
  let str;
  if (typeof val.toString === 'function') {
    str = val.toString();
  } else {
    try {
      str = '' + val;
    } catch {
      str = typeOf(val);
    }
  }
  return highlight(str);
};

/**
 * Returns a presentation of a variable
 * @param {*} val - value to visualize
 * @param {string} type - type of value
 * @returns {string} - expandable value HTML presentation
 */
const returnExpandable = function returnExpandable(val, type) {
  const id = uuid();
  data[id] = val;
  const txt = {
    array: 'Array (' + val.length + ')',
    arguments: 'Arguments (' + val.length + ')',
    object: 'Object',
    function: 'function',
  };
  return [
    '<div>',
    '<div data-jstree-id="' + id + '" ',
    'data-jstree-type="' + type + '" ',
    'data-jstree-closed>',
    txt[type],
    '</div>',
    '</div>',
  ].join('');
};

/**
 * Collection of expected types
 * & their presentation methods
 */
const typeToString = {
  string: function (val) {
    if (/"/.test(val)) {
      return "'" + val + "'";
    } else {
      return '"' + val + '"';
    }
  },
  NaN: () => highlight('NaN'),
  null: () => highlight('null'),
  number: toString,
  boolean: toString,
  undefined: toString,
  regex: toString,
  date: toString,
  symbol: toString,
  bigint: (val) => highlight(val + 'n'),
  array: returnExpandable,
  arguments: returnExpandable,
  object: returnExpandable,
  function: returnExpandable,
};

/**
 * Get presention of any variable
 * @param {*} val - variable to visualize
 * @returns {string}
 */
module.exports = function stringify(val) {
  const type = typeOf(val);
  let display = typeToString[type] || toString;
  return display(val, type);
};
