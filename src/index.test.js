/**
 * @jest-environment jsdom
 */
const jsTree = require('./index.js');

test('Data object', function () {
  expect(jsTree.config.data).toStrictEqual({});
});

test('string', function () {
  expect(jsTree('string')).toStrictEqual('"string"');
});
