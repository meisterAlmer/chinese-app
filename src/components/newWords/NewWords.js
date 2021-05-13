import './NewWords.css';
import { useState, useEffect } from 'react';
import WordList from '../wordList/WordList';

function NewWords({ data }) {
  const [sortData, setSortData] = useState(data);
  const [orderPinyin, setOrderPinyin] = useState('ab');
  const [orderType, setOrderType] = useState('ab');
  const [orderedColumn, setOrderedColumn] = useState('type');

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
    setOrderedColumn('type');
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
    setOrderedColumn('pinyin');
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
            <span>Pinyin</span>
            {orderedColumn === 'pinyin' && orderPinyin === 'ab' && (
              <span>▲</span>
            )}
            {orderedColumn === 'pinyin' && orderPinyin === 'ba' && (
              <span>▼</span>
            )}
          </p>
          <p>Translation</p>
          <p
            className="filter"
            onClick={() => {
              sortType();
            }}
          >
            <span>Type</span>
            {orderedColumn === 'type' && orderType === 'ab' && <span>▲</span>}
            {orderedColumn === 'type' && orderType === 'ba' && <span>▼</span>}
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
