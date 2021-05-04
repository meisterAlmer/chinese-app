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
  const [filterData, setFilterData] = useState(appData);
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
      // .where('lesson', 'in', lessons)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
      })
      .then(() => {
        setAppData(data);
        // setFilterData(data);
        toggleIsLoaded(true);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
    console.log('DB Data loaded');
  }, [appUser]);

  // When lessons change filter data
  useEffect(() => {
    // console.log('FILTER CHANGED!');
    const myData = appData;
    let arr = [];
    lessons.forEach(function (entry) {
      const entryData = myData.filter(item => item.lesson === entry);
      arr.push(...entryData);
    });

    setFilterData(arr);
  }, [lessons, appData]);

  const checkboxHandler = function (value) {
    // console.log('HANDLED IT');
    let lessonArr = lessons;
    if (lessonArr.includes(value)) {
      lessonArr = lessonArr.filter(item => item !== value);
    } else {
      lessonArr = [...lessonArr, value];
    }
    if (!lessonArr.length) lessonArr = totalLessons;
    lessonArr.sort(function (a, b) {
      return a - b;
    });
    setLessons(lessonArr);
    // console.log(lessonArr);

    // let arr = [];
    // lessonArr.forEach(function (entry) {
    //   const entryData = appData.filter(item => item.lesson === entry);
    //   arr.push(...entryData);
    // });

    // setFilterData(arr);
    // console.log(arr);
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
                    checked={isChecked(item)}
                  ></input>
                  Lesson {item}
                </label>
              </div>
            );
          })}
        {/* <input type="submit" value="Apply Filter" /> */}
      </form>

      {!isLoaded && <p>Loading...</p>}

      {isLoaded && filterData && (
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

          {page === 'New Words' && <NewWords data={filterData} />}
          {page === 'Flash Cards' && (
            <FlashCards lesson={lessons} data={filterData} />
          )}
          {page === 'Quiz' && <Quiz data={filterData} />}
        </div>
      )}
    </section>
  );
}

export default Practice;
