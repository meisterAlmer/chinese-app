import shuffledArr from './shuffledArr';

test('shuffledArr() function should shuffle the array order', () => {
  // ARRANGE
  let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // ACT
  let arr2 = shuffledArr(arr1);
  let counter = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      counter++;
    }
  }

  // ASSERT
  expect(counter).not.toBe(arr1.length);
});
