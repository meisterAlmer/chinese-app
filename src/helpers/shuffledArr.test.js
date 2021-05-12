import shuffledArr from './shuffledArr';

test('shuffledArr() function should shuffle the array order', () => {
  // ARRANGE
  const array = [1, 2, 3];

  // ACT
  const result = shuffledArr(array);

  // ASSERT
  expect(result).not.toEqual(array);
});
