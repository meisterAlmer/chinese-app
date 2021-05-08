import { useState } from 'react';
import './FlashCard.css';

function Flashcard({ data, currentCard }) {
  const [flipCard, toggleFlipCard] = useState(false);

  return (
    <div className="flashcard">
      <div className="flashcard__inner">
        <div className="flashcard__front">
          <h1>{data[[currentCard]].hanzi}</h1>
        </div>
        <div className="flashcard__back">
          <p className="flashcard__pinyin">{data[[currentCard]].pinyin}</p>
          <p>{data[[currentCard]].translation}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
