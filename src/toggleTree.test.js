/**
 * @jest-environment jsdom
 */
const toggleTree = require('./toggleTree.js');
const stringify = require('./stringify.js');

test('Object', function () {
  const html = stringify({ hello: 'world' });
  document.body.innerHTML = html;
  const $el = document.querySelector('div div');
  toggleTree({ target: $el });

  const rgx =
    /<div data-jstree-id="[0-9A-z]+" data-jstree-type="object" data-jstree-open="true">Object<\/div>/;
  expect(rgx.test($el.outerHTML)).toStrictEqual(true);

  const $parent = document.querySelector('div');
  const rgx2 =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="object" data-jstree-open="true">Object<\/div><div>\{hello:"world"\}<\/div><\/div>/;
  expect(rgx2.test($parent.outerHTML)).toStrictEqual(true);
});

test('function', function () {
  const fu = function (a, b) {};
  const html = stringify(fu);
  document.body.innerHTML = html;
  const $el = document.querySelector('div div');
  toggleTree({ target: $el });

  const rgx =
    /<div data-jstree-id="[0-9A-z]+" data-jstree-type="function" data-jstree-open="true">function<\/div>/;
  expect(rgx.test($el.outerHTML)).toStrictEqual(true);

  const $parent = document.querySelector('div');
  const rgx2 =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="function" data-jstree-open="true">function<\/div><div>Name: fu<\/div><div>Parameters: none<\/div><div><div data-jstree-id="[0-9A-z]+" data-jstree-type="functionProps" data-jstree-closed="">Properties<\/div><\/div><\/div>/;

  expect(rgx2.test($parent.outerHTML)).toStrictEqual(true);
});

test('Array', function () {
  const html = stringify([1, 2]);
  document.body.innerHTML = html;
  const $closed = document.querySelector('div div');
  toggleTree({ target: $closed });

  const $parent = document.querySelector('div');
  const rgx1 =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="array" data-jstree-open="true">Array \(2\)<\/div><div>\[<span class="token number">1<\/span>,<span class="token number">2<\/span>\]<\/div><\/div>/;
  expect(rgx1.test($parent.outerHTML)).toStrictEqual(true);

  const $opened = document.querySelector('div div');
  toggleTree({ target: $opened });

  const rgx2 =
    /<div><div data-jstree-id="[0-9A-z]+" data-jstree-type="array" data-jstree-closed="true">Array \(2\)<\/div><\/div>/;
  expect(rgx2.test($parent.outerHTML)).toStrictEqual(true);
});
