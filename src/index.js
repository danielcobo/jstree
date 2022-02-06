const typeOf = require('@danielcobo/type');
const uuid = require('@danielcobo/uuid');
const Prism = require('prismjs');

/**
 * Presentation highlighter
 * @param {string} str
 * @returns {string} highlihted HTML string
 */
const highlight = function (str) {
  return Prism.highlight(str, Prism.languages.javascript, 'javascript');
};

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

//Expandable tree data
const data = {};

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
const stringify = function stringify(val) {
  const type = typeOf(val);
  let display = typeToString[type] || toString;
  return display(val, type);
};

/**
 * Expand element
 * @param {HTMLElement} $el - pressed element
 */
const open = function open($el) {
  $el.removeAttribute('data-jstree-closed');
  $el.setAttribute('data-jstree-open', true);

  const id = $el.getAttribute('data-jstree-id');
  const type = $el.getAttribute('data-jstree-type');
  const content = data[id];

  let html;
  if (type === 'object' || type === 'functionProps') {
    html =
      '<div>{' +
      Object.keys(content)
        .map(function (key) {
          const val = content[key];
          return key + ':' + stringify(val);
        })
        .join(',\n') +
      '}</div>';
  } else if (type === 'function') {
    html =
      '<div>Function:' +
      content.toString() +
      '</div>' +
      [
        '<div>',
        '<div data-jstree-id="' + id + '" ',
        'data-jstree-type="functionProps" ',
        'data-jstree-closed>',
        'Properties',
        '</div>',
        '</div>',
      ].join('');
  } else if (type === 'array' || type === 'arguments') {
    html =
      '<div>[' +
      [...content].map((val) => stringify(val)).join(',') +
      ']</div>';
  } else {
    throw new Error("Can't deconstruct type: ", type);
  }
  $el.parentElement.innerHTML += html;
};

/**
 * Close element
 * @param {HTMLElement} $el - pressed element
 */
const close = function close($el) {
  $el.removeAttribute('data-jstree-open');
  $el.setAttribute('data-jstree-closed', true);
  $el.parentElement.innerHTML = $el.outerHTML;
};

/**
 * Toggle tree presentation
 * @param {Event} e - pointerdown event object
 */
const toggleTree = function toggleTree(e) {
  const $el = e.target;
  if ($el.hasAttribute('data-jstree-closed')) {
    open($el);
  } else if ($el.hasAttribute('data-jstree-open')) {
    close($el);
  }
};

document.addEventListener('pointerdown', toggleTree);

/**
 * Generate a HTML presentation of any value
 * @param {*} val - value to present
 * @returns {string} - HTML presentation of value
 */
module.exports = function jsTree(val) {
  return stringify(val);
};
