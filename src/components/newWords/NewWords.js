import './NewWords.css';
import { useState, useEffect } from 'react';
import WordList from '../wordList/WordList';

function NewWords({ data }) {
  const [sortData, setSortData] = useState();
  const [filterType, toggleFilterType] = useState('type-ab');

  const sortType = function (sort) {
    toggleFilterType(filterType === `${sort}-ab` ? `${sort}-ba` : `${sort}-ab`);
  };

  const sortArray = function (arr, sort, order) {
    const myArr = arr;
    if (order === 'ab') {
      myArr.sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    if (order === 'ba') {
      myArr.sort((b, a) => a[sort].localeCompare(b[sort]));
    }
    return myArr;
  };

  // When lessons change filter data
  useEffect(() => {
    let localData = data;

    if (filterType === 'type-ab')
      localData = sortArray(localData, 'type', 'ab');

    if (filterType === 'type-ba')
      localData = sortArray(localData, 'type', 'ba');

    if (filterType === 'pinyin-ab')
      localData = sortArray(localData, 'pinyin', 'ab');

    if (filterType === 'pinyin-ba')
      localData = sortArray(localData, 'pinyin', 'ba');
    // }
    setSortData(localData);
  }, [filterType, data]);

  return (
    <section>
      <h1>New Words ({filterType})</h1>

      <div className="word word-header">
        <p>Hanzi</p>
        <p
          onClick={() => {
            sortType('pinyin');
          }}
        >
          Pinyin
          {filterType === 'pinyin-ab' && <span>⬇️</span>}
          {filterType === 'pinyin-ba' && <span>⬆️</span>}
        </p>
        <p>Translation</p>
        <p
          onClick={() => {
            sortType('type');
          }}
        >
          Type
          {filterType === 'type-ab' && <span>⬇️</span>}
          {filterType === 'type-ba' && <span>⬆️</span>}
        </p>
      </div>
      <div className="word--list">
        {sortData && <WordList data={sortData} />}
      </div>
    </section>
  );
}

export default NewWords;
