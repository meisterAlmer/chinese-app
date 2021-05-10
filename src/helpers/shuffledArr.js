// Shuffle array
function shuffledArr(array) {
  const shuffle = array
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  if (shuffle[0] === array[0]) {
    shuffledArr(array);
  }
  if (shuffle[0] !== array[0]) {
    return shuffle;
  }
}

export default shuffledArr;
