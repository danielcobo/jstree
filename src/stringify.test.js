/**
 * @jest-environment jsdom
 */
const stringify = require('./stringify.js');

test('string', function () {
  expect(stringify('string')).toStrictEqual('"string"');
});

test('string', function () {
  expect(stringify("'string'")).toStrictEqual('"\'string\'"');
});

test('string', function () {
  expect(stringify('"string"')).toStrictEqual('\'"string"\'');
});

test('boolean', function () {
  expect(stringify(true)).toStrictEqual(
    '<span class="token boolean">true</span>'
  );
});

test('number', function () {
  expect(stringify(1)).toStrictEqual('<span class="token number">1</span>');
});

test('bigint', function () {
  expect(stringify(1n)).toStrictEqual('<span class="token number">1n</span>');
});

test('NaN', function () {
  expect(stringify(NaN)).toStrictEqual('<span class="token number">NaN</span>');
});

test('null', function () {
  expect(stringify(null)).toStrictEqual(
    '<span class="token keyword">null</span>'
  );
});

test('Object', function () {
  const pattern = [
    '<div>',
    '<div data-jstree-id="[0-9A-z]+" ',
    'data-jstree-type="object" ',
    'data-jstree-closed>Object</div>',
    '</div>',
  ].join('');
  const rgx = new RegExp(pattern);
  expect(rgx.test(stringify({}))).toStrictEqual(true);
});

test('Array', function () {
  const rgx =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="array" data-jstree-closed>Array \(2\)<\/div><\/div>/;
  expect(rgx.test(stringify([1, 2]))).toStrictEqual(true);
});

test('Arguments', function () {
  const rgx =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="arguments" data-jstree-closed>Arguments \(0\)<\/div><\/div>/;
  expect(rgx.test(stringify(arguments))).toStrictEqual(true);
});
