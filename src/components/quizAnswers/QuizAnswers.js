import './QuizAnswers.css';

function QuizAnswers({ answers, quizData, nextCard }) {
  return (
    <>
      {answers.map(answer => {
        return (
          <button
            type="button"
            onClick={() => nextCard(answer)}
            key={answer}
            className="answer"
          >
            {quizData[answer].translation}
          </button>
        );
      })}
    </>
  );
}

export default QuizAnswers;
