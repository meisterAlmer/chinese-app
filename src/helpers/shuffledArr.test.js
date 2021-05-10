import shuffledArr from './shuffledArr';

test('generateRandomNumber() function should generate random number within range, excluding specified number', () => {
  // ARRANGE
  const array = [1, 2, 3];

  // ACT
  const result = shuffledArr(array);

  // ASSERT
  expect(result).not.toEqual(array);
});
