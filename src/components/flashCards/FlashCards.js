import './FlashCards.css';
import { useEffect, useState } from 'react';
import Flashcard from '../flashCard/FlashCard';
import Button from '../../components/button/Button';
import shuffledArr from '../../helpers/shuffledArr';

function FlashCards({ data }) {
  const [appData, setAppData] = useState(data);
  const [cardNumber, setCardNumber] = useState(0);
  const [cardTotal, setCardTotal] = useState(appData.length);
  const [newRender, toggleNewRender] = useState(false);

  // set state to re-render shuffled cards
  const shuffleCards = () => {
    toggleNewRender(true);
  };

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
      {cardTotal && (
        <div className="cards-container">
          <h2>Flash Cards</h2>
          <div className="cards-container__holder">
            <div className="cards-container__browser">
              <p onClick={prevCard}>Previous</p>
            </div>
            <Flashcard data={appData} currentCard={cardNumber} />
            <div className="cards-container__browser">
              <p onClick={nextCard} className="cards-container__browser">
                Next
              </p>
            </div>
          </div>
          <Button
            label={'Shuffle'}
            clickEvent={shuffleCards}
            disabled={false}
            small={false}
          />

          <p>
            Card {cardNumber + 1} out of {cardTotal}
          </p>
        </div>
      )}
    </section>
  );
}

export default FlashCards;
