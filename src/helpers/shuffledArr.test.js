import shuffledArr from './shuffledArr';

test('shuffledArr() function should shuffle the array order', () => {
  // ARRANGE
  let arr1 = [1, 2, 3];
  // let arr2 = shuffledArr(arr1);

  // ACT
  let arr2 = shuffledArr(arr1);

  // ASSERT
  expect(arr1[0]).not.toBe(arr2[0]);
});
