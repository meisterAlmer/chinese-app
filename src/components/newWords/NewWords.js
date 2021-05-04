import './NewWords.css';

function NewWords({ data }) {
  return (
    <section>
      <h1>New Words</h1>
      <div className="word word-header">
        <p>Hanzi</p>
        <p>Pinyin</p>
        <p>Translation</p>
        <p>Type</p>
      </div>
      <div className="word--list">
        {data.map(word => {
          return (
            <div key={word.pinyin} className="word">
              <p>{word.hanzi}</p>
              <p>{word.pinyin}</p>
              <p>{word.translation}</p>
              <p>{word.type}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NewWords;
