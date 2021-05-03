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

  // // Reset selected lessons if empty
  // useEffect(() => {
  //   if (!lessons) {
  //     setLessons(totalLessons);
  //   }
  // }, [lessons, totalLessons]);

  // // login user
  // const filterWords = function (event) {
  //   event.preventDefault();
  //   const selected = [];

  //   for (let i = 0; i < event.target.length; i++) {
  //     if (event.target[i].checked) {
  //       selected.push(Number(event.target[i].value));
  //     }
  //   }
  //   setLessons([...selected]);
  //   // console.log(lessons);
  // };

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

  const checkboxHandler = function (value) {
    let arr = lessons;
    if (arr.includes(value)) {
      arr = arr.filter(item => item !== value);
    } else {
      arr = [...arr, value];
      // arr = arr.push(value);
    }
    if (!arr.length) arr = totalLessons;
    setLessons(arr);
  };

  const isChecked = function (item) {
    if (lessons.includes(item)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section>
      <h1>Practice</h1>
      <h2>Complete overview of words</h2>
      <p>Selected lesson: {lessons}</p>
      <form id="filter">
        <h1>Filter</h1>
        {isLoaded &&
          totalLessons &&
          lessons &&
          totalLessons.map(item => {
            return (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    id={item}
                    name={`lesson${item}`}
                    value={item}
                    onChange={() => checkboxHandler(item)}
                    // onChange={checkboxHandler}
                    checked={isChecked(item)}
                    // defaultChecked
                  ></input>
                  Lesson {item}
                </label>
              </div>
            );
          })}
        {/* <input type="submit" value="Apply Filter" /> */}
      </form>

      {!isLoaded && <p>Loading...</p>}
      {isLoaded && userChecked && appData && appUser && lessons && (
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
