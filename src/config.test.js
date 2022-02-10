const config = require('./config.js');

test('Data object', function () {
  expect(config.data).toStrictEqual({});
});

test('highlight', function () {
  expect(typeof config.highlight).toStrictEqual('function');
});
