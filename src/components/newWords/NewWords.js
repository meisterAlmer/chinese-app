import { useEffect, useState } from 'react';
import './NewWords.css';

function NewWords({ data }) {
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [appData] = useState(data);

  // Get lesson data
  useEffect(() => {
    if (appData) {
      toggleIsLoaded(true);
    }
  }, [appData]);

  return (
    <section>
      <h1>New Words</h1>
      <div className="word--list">
        {isLoaded &&
          appData &&
          appData.map(word => {
            return (
              <div key={word.pinyin} className="word">
                <p>{word.hanzi}</p>
                <p>{word.pinyin}</p>
                <p>{word.translation}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default NewWords;
