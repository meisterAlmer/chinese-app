function generateRandomNumber(min, max, exclude) {
  let ranNum = Math.floor(Math.random() * (max - min)) + min;
  // Check for double answers
  for (let i = 0; i < exclude.length; i++) {
    if (ranNum === exclude[i]) {
      ranNum = generateRandomNumber(min, max, exclude);
    }
  }
  return ranNum;
}

export default generateRandomNumber;
