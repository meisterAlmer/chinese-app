function WordList({ data }) {
  return (
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
  );
}

export default WordList;
