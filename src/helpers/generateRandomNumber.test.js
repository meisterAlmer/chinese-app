import generateRandomNumber from './generateRandomNumber';

test('generateRandomNumber() function should generate random number within range, excluding specified number', () => {
  // ARRANGE
  const min = 1;
  const max = 9;
  const exclude = [2, 3];

  // ACT
  const result = generateRandomNumber(min, max, exclude);

  // ASSERT
  expect(result).not.toBe(exclude);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});
