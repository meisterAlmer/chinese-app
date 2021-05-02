import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Conversation from '../../components/conversation/Conversation';
import NewWords from '../../components/newWords/NewWords';
import FlashCards from '../../components/flashCards/FlashCards';
import Quiz from '../../components/quiz/Quiz';
import Sidebar from '../../components/sidebar/Sidebar';

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
    <section className="lessons--main">
      <Sidebar className="lessons--nav" active={`lesson${lesson}`} />
      {!isLoaded && <article>Loading...</article>}
      {isLoaded && appData && (
        <article className="lessons--content">
          <h3>Lesson {lesson}</h3>
          <h1>Lesson title</h1>
          <section>
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
      )}
    </section>
  );
}

export default Lesson;
