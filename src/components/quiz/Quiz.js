import { useEffect, useState } from 'react';
import QuizCard from '../quizCard/QuizCard';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function Quiz({ lesson }) {
  // const [lesson, setLesson] = useState(1);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [appData, setAppData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [score, setScore] = useState(0);
  const [complete, toggleComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Start quiz
  const startQuiz = () => {
    setQuizData(shuffledArr(appData));
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

  // Generate random answers for new card
  useEffect(() => {
    const answerArr = [];
    if (quizData.length > 0) {
      answerArr.push(currentCard);
      for (let i = 0; i < 2; i++) {
        answerArr.push(generateRandomNumber(0, quizData.length, answerArr));
      }
      setAnswers(shuffledArr(answerArr));
    }
  }, [currentCard]);

  // Get all data from database
  useEffect(() => {
    console.log('Getting quiz data');

    const data = [];
    const quizNumber = Number(lesson);

    db.collection('words')
      .where('lesson', '==', quizNumber)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push({
            hanzi: doc.data().hanzi,
            pinyin: doc.data().pinyin,
            translation: doc.data().translation,
            lesson: doc.data().lesson,
          });
        });
      })
      .then(() => {
        setAppData(data);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }, []);

  return (
    <div>
      {<h1>Lesson {lesson} Quiz</h1>}
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
      {quizData.length === 0 && (
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
