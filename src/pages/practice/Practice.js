import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewWords from '../../components/newWords/NewWords';
import FlashCards from '../../components/flashCards/FlashCards';
import Quiz from '../../components/quiz/Quiz';
import { LoginContext } from '../../context/LoginContext';
import Loading from '../../components/loading/Loading';
import Pills from '../../components/pills/Pills';
import Filters from '../../components/filters/Filters';
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
  };

  const isChecked = function (item) {
    if (lessons.includes(item)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="practice">
      <h1>Practice</h1>
      <h2>Practice all the words</h2>
      <Filters
        totalLessons={totalLessons}
        isChecked={isChecked}
        checkboxHandler={checkboxHandler}
      />

      {!isLoaded && <Loading />}

      {isLoaded && filterData && (
        <div>
          <Pills data={data} page={page} setPage={setPage} />

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
