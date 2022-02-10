const toggleTree = require('./toggleTree.js');
document.addEventListener('pointerdown', toggleTree);
const stringify = require('./stringify.js');

/**
 * Generate a HTML presentation of any value
 * @param {*} val - value to present
 * @returns {string} - HTML presentation of value
 */
const jsTree = function jsTree(val) {
  return stringify(val);
};

//Expose config
jsTree.config = require('./config.js');

module.exports = jsTree;
