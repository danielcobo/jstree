const Prism = require('prismjs');
/**
 * Presentation highlighter
 * @param {string} str
 * @returns {string} highlihted HTML string
 */
const highlight = function (str) {
  return Prism.highlight(str, Prism.languages.javascript, 'javascript');
};

module.exports = {
  data: {}, //Expandable tree data
  highlight: highlight,
};
