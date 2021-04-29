import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Conversation from '../../components/conversation/Conversation';
import NewWords from '../../components/newWords/NewWords';
import FlashCards from '../../components/flashCards/FlashCards';
import Quiz from '../../components/quiz/Quiz';

function Lesson() {
  const [page, setPage] = useState('conversation');
  const { lesson } = useParams();

  const data = ['Conversation', 'New Words', 'Flash Cards', 'Quiz'];

  useEffect(() => {
    setPage('Conversation');
  }, [lesson]);

  return (
    <div>
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
        {page === 'Conversation' && <Conversation />}
        {page === 'New Words' && <NewWords />}
        {page === 'Flash Cards' && <FlashCards lesson={lesson} />}
        {page === 'Quiz' && <Quiz />}
      </section>
    </div>
  );
}

export default Lesson;
