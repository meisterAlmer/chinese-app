function shuffledArr(array) {
  let shuffArr = [];

  // Shuffle array
  for (let i in array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    while (shuffArr.includes(array[randomIndex])) {
      randomIndex = Math.floor(Math.random() * array.length);
    }
    shuffArr[i] = array[randomIndex];
  }

  return shuffArr;
}

export default shuffledArr;
