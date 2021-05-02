import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewWords from '../../components/newWords/NewWords';
import FlashCards from '../../components/flashCards/FlashCards';
import Quiz from '../../components/quiz/Quiz';
import { LoginContext } from '../../context/LoginContext';
import './Practice.css';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function Practice() {
  const { appUser, userChecked, totalLessons } = useContext(LoginContext);

  const [appData, setAppData] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [lessons, setLessons] = useState(totalLessons);
  const [page, setPage] = useState('New Words');

  const data = ['New Words', 'Flash Cards', 'Quiz'];

  const history = useHistory();

  // login user
  const filterWords = function (event) {
    event.preventDefault();
    const selected = [];

    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].checked) {
        selected.push(Number(event.target[i].value));
      }
    }
    setLessons([...selected]);
    console.log(lessons);
  };

  // // Redirect if  logged in
  useEffect(() => {
    if (!appUser && userChecked) {
      history.push('/profile');
    }
  }, [appUser, userChecked, history]);

  // Get all data
  useEffect(() => {
    if (!appUser) return;
    toggleIsLoaded(false);
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

  // const checkboxHandler = function (item) {
  //   return true;
  // };

  return (
    <section>
      <h1>Practice</h1>
      <h2>Complete overview of words</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <form onSubmit={filterWords} id="filter">
        <h1>Filter</h1>
        {isLoaded &&
          totalLessons &&
          totalLessons.map(item => {
            return (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    id={item}
                    name={`lesson${item}`}
                    value={item}
                    // onChange={() => item === 2}
                    // onChange={checkboxHandler}
                    // checked={checkboxHandler}
                    // defaultChecked
                  ></input>
                  Lesson {item}
                </label>
              </div>
            );
          })}
        <input type="submit" value="Apply Filter" />
      </form>

      {!isLoaded && <p>Loading...</p>}
      {isLoaded && userChecked && appData && appUser && (
        <div>
          <ul className="pills">
            {data.map(item => {
              return (
                <li key={item}>
                  <button type="button" onClick={() => setPage(item)}>
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>

          {page === 'New Words' && <NewWords data={appData} />}
          {page === 'Flash Cards' && (
            <FlashCards lesson={lessons} data={appData} />
          )}
          {page === 'Quiz' && <Quiz lesson={lessons} data={appData} />}
        </div>
      )}
    </section>
  );
}

export default Practice;
