import './NewWords.css';

function NewWords({ data }) {
  return (
    <section>
      <h1>New Words</h1>
      <div className="word--list">
        {data.map(word => {
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
