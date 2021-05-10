import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { useParams, useHistory } from 'react-router-dom';
import Conversation from '../../components/conversation/Conversation';
import NewWords from '../../components/newWords/NewWords';
import FlashCards from '../../components/flashCards/FlashCards';
import Quiz from '../../components/quiz/Quiz';
import Sidebar from '../../components/sidebar/Sidebar';
import Pills from '../../components/pills/Pills';
import Loading from '../../components/loading/Loading';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function Lesson() {
  const [appData, setAppData] = useState([]);
  const { appUser, userChecked } = useContext(LoginContext);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [page, setPage] = useState('conversation');
  const { lesson } = useParams();

  const history = useHistory();

  const data = ['Conversation', 'New Words', 'Flash Cards', 'Quiz'];

  // Get words data
  useEffect(() => {
    if (appUser && userChecked) {
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
    }
  }, [lesson, appUser, userChecked]);

  // // Redirect if  logged in
  useEffect(() => {
    if (!appUser && userChecked) {
      history.push('/profile');
    }
  }, [appUser, userChecked, history]);

  useEffect(() => {
    setPage('Conversation');
  }, [lesson]);

  return (
    <section className="lessons__main">
      {!isLoaded && <Loading />}
      {isLoaded && appData && (
        <>
          <Sidebar className="lessons__nav" active={`lesson${lesson}`} />
          <article className="lessons__content">
            <h1>Lesson {lesson}</h1>
            <section>
              <Pills data={data} page={page} setPage={setPage} />
            </section>
            <section>
              {page === 'Conversation' && <Conversation lesson={lesson} />}
              {page === 'New Words' && <NewWords data={appData} />}
              {page === 'Flash Cards' && (
                <FlashCards lesson={lesson} data={appData} />
              )}
              {page === 'Quiz' && <Quiz lesson={lesson} data={appData} />}
            </section>
          </article>
        </>
      )}
    </section>
  );
}

export default Lesson;
