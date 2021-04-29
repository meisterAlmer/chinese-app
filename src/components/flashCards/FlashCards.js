import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function FlashCards({ lesson }) {
  const [appData, setAppData] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);

  const { appUser, userChecked } = useContext(LoginContext);

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
      <div className="flashcard--list">
        {isLoaded &&
          appData &&
          appData.map(word => {
            return (
              <div key={word.pinyin} className="flashcard">
                <h1>{word.hanzi}</h1>
                <p>{word.pinyin}</p>
                <p>{word.translation}</p>
                <p>{word.lesson}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default FlashCards;
