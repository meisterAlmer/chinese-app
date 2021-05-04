import { useEffect, useState } from 'react';
import QuizCard from '../quizCard/QuizCard';

function Quiz({ lesson, data }) {
  const [isLoaded, toggleIsLoaded] = useState(false);
  // const [appData, setAppData] = useState(data);
  const [quizData, setQuizData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [score, setScore] = useState(0);
  const [complete, toggleComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    toggleIsLoaded(false);
    setQuizData(shuffledArr(data));
    toggleComplete(false);
    setCurrentCard(0);
    setScore(0);
  }, [data]);

  // Start quiz
  const startQuiz = () => {
    setQuizData(shuffledArr(data));
    toggleIsLoaded(true);
    toggleComplete(false);
    setCurrentCard(0);
    setScore(0);
  };

  // Shuffle array
  const shuffledArr = array =>
    array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

  // Answer clicked
  const nextCard = e => {
    if (e === currentCard) setScore(score + 1);
    if (currentCard + 1 === quizData.length) {
      toggleComplete(true);
      return;
    }
    setCurrentCard(currentCard + 1);
  };

  // Generate random answers for new card
  useEffect(() => {
    // Generate random number within range
    const generateRandomNumber = (min, max, exclude) => {
      let ranNum = Math.floor(Math.random() * (max - min)) + min;
      // Check for double answers
      for (let i = 0; i < exclude.length; i++) {
        if (ranNum === exclude[i]) {
          ranNum = generateRandomNumber(min, max, exclude);
        }
      }
      return ranNum;
    };

    const answerArr = [];
    if (quizData.length > 0) {
      answerArr.push(currentCard);
      for (let i = 0; i < 2; i++) {
        answerArr.push(generateRandomNumber(0, quizData.length, answerArr));
      }
      setAnswers(shuffledArr(answerArr));
    }
  }, [currentCard, quizData.length]);

  return (
    <div>
      {<h1>Quiz</h1>}
      {isLoaded && answers.length > 0 && !complete && (
        <>
          <h2>Score: {score}</h2>
          <QuizCard data={quizData} currentCard={currentCard} />

          {answers.map(answer => {
            return (
              <button
                type="button"
                onClick={() => nextCard(answer)}
                key={answer}
              >
                {quizData[answer].translation}
              </button>
            );
          })}

          <p>
            Card {currentCard + 1} out of {quizData.length}
          </p>
        </>
      )}
      {!isLoaded && (
        <button type="button" onClick={startQuiz}>
          Start Quiz!
        </button>
      )}
      {complete && (
        <div>
          <h1>Quiz Completed!</h1>
          <h2>
            Your final score is: {score} out of {quizData.length}
          </h2>
          <button type="button" onClick={startQuiz}>
            Try Again!
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
