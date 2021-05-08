import './QuizCard.css';

function QuizCard({ data, currentCard }) {
  return (
    <div className="quizcard">
      <h1>{data[[currentCard]].hanzi}</h1>
    </div>
  );
}

export default QuizCard;
