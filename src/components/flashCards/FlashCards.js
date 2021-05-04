import { useEffect, useState } from 'react';
import Flashcard from '../flashCard/FlashCard';

function FlashCards({ lesson, data }) {
  const [appData, setAppData] = useState(data);
  const [cardNumber, setCardNumber] = useState(0);
  const [cardTotal, setCardTotal] = useState(appData.length);
  const [newRender, toggleNewRender] = useState(false);

  // set state to re-render shuffled cards
  const shuffleCards = () => {
    toggleNewRender(true);
  };

  const shuffledArr = array =>
    array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

  function prevCard() {
    if (cardNumber > 0) {
      setCardNumber(cardNumber - 1);
    } else setCardNumber(cardTotal - 1);
  }

  function nextCard() {
    if (cardNumber + 1 < cardTotal) {
      setCardNumber(cardNumber + 1);
    } else setCardNumber(0);
  }

  // Shuffle data and render
  useEffect(() => {
    setCardTotal(data.length);
    setAppData(shuffledArr(data));
    setCardNumber(0);
    toggleNewRender(false);
  }, [data, newRender]);

  return (
    <section>
      <h1>Flash Cards</h1>

      {cardTotal && (
        <>
          <Flashcard data={appData} currentCard={cardNumber} />

          <p>
            Card {cardNumber + 1} out of {cardTotal}
          </p>
          <button type="button" onClick={prevCard}>
            Previous
          </button>
          <button type="button" onClick={nextCard}>
            Next
          </button>
          <button type="button" onClick={shuffleCards}>
            Shuffle
          </button>
        </>
      )}
    </section>
  );
}

export default FlashCards;
