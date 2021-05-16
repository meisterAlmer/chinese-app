// Shuffle array
function shuffledArr(array) {
  const orgArr = array;

  const shuffArr = orgArr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  // Check if shuffled well else re-shuffle
  if (shuffArr[0] === orgArr[0]) {
    return shuffledArr(orgArr);
  }

  // If shuffled well return array
  if (shuffArr[0] !== orgArr[0]) {
    return shuffArr;
  }
}

export default shuffledArr;
