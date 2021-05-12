import './Quiz.css';
import { useEffect, useState } from 'react';
import QuizCard from '../quizCard/QuizCard';
import QuizAnswers from '../quizAnswers/QuizAnswers';
import Button from '../../components/button/Button';
import generateRandomNumber from '../../helpers/generateRandomNumber';
import shuffledArr from '../../helpers/shuffledArr';

function Quiz({ lesson, data }) {
  const [isLoaded, toggleIsLoaded] = useState(false);
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
    const answerArr = [];
    if (quizData.length > 0) {
      answerArr.push(currentCard);
      for (let i = 0; i < 2; i++) {
        // Generate random answers for new card
        answerArr.push(generateRandomNumber(0, quizData.length, answerArr));
      }
      setAnswers(shuffledArr(answerArr));
    }
  }, [currentCard, quizData.length]);

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      {isLoaded && answers.length > 0 && !complete && (
        <>
          <h2 className="quiz__score">Score: {score}</h2>
          <QuizCard data={quizData} currentCard={currentCard} />
          <QuizAnswers
            answers={answers}
            quizData={quizData}
            nextCard={nextCard}
          />
          <p>
            Question {currentCard + 1} out of {quizData.length}
          </p>
        </>
      )}
      {!isLoaded && (
        <Button
          label={'Start Quiz!'}
          clickEvent={startQuiz}
          disabled={false}
          small={false}
        />
      )}
      {complete && (
        <div className="quiz__complete">
          <h1>Quiz Completed!</h1>
          <h2>
            Your final score is: {score} out of {quizData.length}
          </h2>
          <Button
            label={'Try Again!'}
            clickEvent={startQuiz}
            disabled={false}
            small={false}
          />
        </div>
      )}
    </div>
  );
}

export default Quiz;
