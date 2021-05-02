import { useState } from 'react';

function Flashcard({ data, currentCard }) {
  const [flipCard, toggleFlipCard] = useState(false);

  return (
    <div className="flashcard" onClick={() => toggleFlipCard(!flipCard)}>
      {!flipCard && <h1>{data[[currentCard]].hanzi}</h1>}
      {flipCard && (
        <>
          <p>{data[[currentCard]].pinyin}</p>
          <p>{data[[currentCard]].translation}</p>
        </>
      )}
    </div>
  );
}

export default Flashcard;
