import './Filters.css';

function Filters({ totalLessons, checkboxHandler, isChecked }) {
  return (
    <form id="filter">
      {totalLessons.map(item => {
        return (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                id={item}
                name={`lesson${item}`}
                value={item}
                onChange={() => checkboxHandler(item)}
                checked={isChecked(item)}
              ></input>
              Lesson {item}
            </label>
          </div>
        );
      })}
    </form>
  );
}

export default Filters;
