import { useEffect, useState } from 'react';
import Flashcard from '../flashCard/FlashCard';

// firebase config
// import app from '../../modules/firebase';
// const db = app.firestore();

function FlashCards({ lesson, data }) {
  const [appData, setAppData] = useState(data);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [cardTotal] = useState(data.length);
  // const [currentLesson] = useState(lesson);

  // // Shuffle data
  const shuffleCards = () => {
    setAppData(shuffledArr(appData));
    setCardNumber(0);
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

  // Get lesson data
  useEffect(() => {
    if (appData) {
      toggleIsLoaded(true);
    }
  }, [appData]);

  return (
    <section>
      <h1>Flash Cards</h1>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && appData && (
        <>
          <Flashcard data={appData} currentCard={cardNumber} />

          <p>
            Card {cardNumber + 1} out of {appData.length}
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
