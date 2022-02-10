const config = require('./config.js');
const data = config.data;
const stringify = require('./stringify.js');
const getParameters = require('getparameters');

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
    let params = getParameters(content);
    if (params.length) {
      params = ['none'];
    }
    html =
      '<div>Name: ' +
      content.name +
      '</div>' +
      '<div>Parameters: ' +
      params.join('') +
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
module.exports = function toggleTree(e) {
  const $el = e.target;
  if ($el.hasAttribute('data-jstree-closed')) {
    open($el);
  } else if ($el.hasAttribute('data-jstree-open')) {
    close($el);
  }
};
