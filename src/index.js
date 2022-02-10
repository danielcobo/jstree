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

//Make highlighter settable
//Make a better presentation of function object --> extract function name, arguments (2 separate repos)
//Add some tests - split code into testable functions first
