import { useEffect, useState, useContext } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import './Practice.css';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function Practice() {
  const [appData, setAppData] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [lessons, setLessons] = useState([1, 2, 3]);

  const { appUser, userChecked } = useContext(LoginContext);

  const history = useHistory();

  // Redirect if not logged in
  useEffect(() => {
    if (!appUser && userChecked) {
      history.push('/');
    }
  }, [appUser, userChecked]);

  // Get all data
  useEffect(() => {
    if (!appUser) return;

    const data = [];

    db.collection('words')
      .where('lesson', 'in', lessons)
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
  }, [lessons, appUser]);

  return (
    <section>
      <h1>Practice</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      {!isLoaded && <p>Loading...</p>}
      <div className="flashcard--list">
        {isLoaded &&
          userChecked &&
          appData &&
          appUser &&
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
      {isLoaded && userChecked && appData && appUser && (
        <div>
          <button
            type="button"
            onClick={() => {
              setLessons([1]);
            }}
          >
            lesson 1
          </button>
          <button
            type="button"
            onClick={() => {
              setLessons([2]);
            }}
          >
            lesson 2
          </button>
          <button
            type="button"
            onClick={() => {
              setLessons([1, 2]);
            }}
          >
            All lessons
          </button>
        </div>
      )}
    </section>
  );
}

export default Practice;
