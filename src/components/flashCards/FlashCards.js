import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import Flashcard from '../flashCard/FlashCard';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function FlashCards({ lesson }) {
  const [appData, setAppData] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);

  const { appUser, userChecked } = useContext(LoginContext);

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
    } else setCardNumber(appData.length - 1);
  }

  function nextCard() {
    if (cardNumber + 1 < appData.length) {
      setCardNumber(cardNumber + 1);
    } else setCardNumber(0);
  }

  // Get lesson data
  useEffect(() => {
    const data = [];

    db.collection('words')
      .where('lesson', 'in', [Number(lesson)])
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
      })
      .then(() => {
        setAppData(data);
        setCardNumber(appData.length);
        toggleIsLoaded(true);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }, [lesson]);

  return (
    <section>
      <h1>Flash Cards Lesson {lesson}</h1>
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
