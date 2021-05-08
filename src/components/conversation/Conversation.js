import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';

import './Conversation.css';

// firebase config
import app from '../../modules/firebase';
const db = app.firestore();

function Conversation({ lesson }) {
  const [textHanzi, setTextHanzi] = useState([]);
  const [textPinyin, setTextPinyin] = useState([]);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [showText, setShowText] = useState('hanzi');

  // Get words data
  useEffect(() => {
    const dataHanzi = [];
    const dataPinyin = [];

    db.collection('conversations')
      .where('lesson', 'in', [Number(lesson)])
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          dataHanzi.push(...doc.data().hanzi);
          dataPinyin.push(...doc.data().pinyin);
        });
      })
      .then(() => {
        setTextHanzi(dataHanzi);
        setTextPinyin(dataPinyin);
        toggleIsLoaded(true);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }, [lesson]);

  return (
    <>
      {!isLoaded && <Loading />}

      <section className="conversation__text">
        <h2>Conversation</h2>
        <p
          onClick={() => {
            showText === 'hanzi' ? setShowText('pinyin') : setShowText('hanzi');
          }}
          className="switch"
        >
          {showText === 'hanzi' ? 'Show Pinyin' : 'Show Hanzi'}
        </p>
        {isLoaded &&
          showText === 'hanzi' &&
          textHanzi.map(text => {
            return <p key={text}>{text}</p>;
          })}

        {isLoaded &&
          showText === 'pinyin' &&
          textPinyin.map(text => {
            return <p key={text}>{text}</p>;
          })}
      </section>
    </>
  );
}

export default Conversation;
