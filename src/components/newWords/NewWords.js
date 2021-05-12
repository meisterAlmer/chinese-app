import './NewWords.css';
import { useState, useEffect } from 'react';
import WordList from '../wordList/WordList';

function NewWords({ data }) {
  const [sortData, setSortData] = useState(data);
  const [orderPinyin, setOrderPinyin] = useState('ab');
  const [orderType, setOrderType] = useState('ab');

  const sortType = function () {
    const myArr = data;
    if (orderType === 'ab') {
      myArr.sort((a, b) => a['type'].localeCompare(b['type']));
      setOrderType('ba');
    }
    if (orderType === 'ba') {
      myArr.sort((a, b) => b['type'].localeCompare(a['type']));
      setOrderType('ab');
    }
    setSortData(myArr);
  };

  const sortPinyin = function () {
    const myArr = data;
    if (orderPinyin === 'ab') {
      myArr.sort((a, b) => a['pinyin'].localeCompare(b['pinyin']));
      setOrderPinyin('ba');
    }

    if (orderPinyin === 'ba') {
      myArr.sort((a, b) => b['pinyin'].localeCompare(a['pinyin']));
      setOrderPinyin('ab');
    }

    setSortData(myArr);
  };

  // When new words load, order by type
  useEffect(() => {
    const myArr = data;
    myArr.sort((a, b) => a['type'].localeCompare(b['type']));
    setOrderType('ba');
  }, [data]);

  return (
    <section className="words">
      <h2>New Words</h2>

      <div className="words-content">
        <div className="word word-header">
          <p>Hanzi</p>
          <p
            className="filter"
            onClick={() => {
              sortPinyin();
            }}
          >
            Pinyin
            {/* {filterType === 'pinyin-ab' && <span>⬇️</span>}
            {filterType === 'pinyin-ba' && <span>⬆️</span>} */}
          </p>
          <p>Translation</p>
          <p
            className="filter"
            onClick={() => {
              sortType();
            }}
          >
            Type
            {/* {filterType === 'type-ab' && <span>⬇️</span>}
            {filterType === 'type-ba' && <span>⬆️</span>} */}
          </p>
        </div>
        <div className="word--list">
          {sortData && <WordList data={sortData} />}
        </div>
      </div>
    </section>
  );
}

export default NewWords;
