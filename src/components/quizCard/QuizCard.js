function QuizCard({ data, currentCard }) {
  return (
    <div className="flashcard">
      <h1>{data[[currentCard]].hanzi}</h1>
      <p>{data[[currentCard]].pinyin}</p>
    </div>
  );
}

export default QuizCard;
