const testjest = require('./testjest');

test('adds 1 + 2 to equal 3', () => {
  expect(testjest(1, 2)).toBe(3);
});