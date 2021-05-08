import './Pills.css';

function Pills({ data, page, setPage }) {
  return (
    <ul className="pills">
      {data.map(item => {
        return (
          <li key={item}>
            <button
              type="button"
              onClick={() => setPage(item)}
              className={
                item === page
                  ? 'pills__pill pills__pill--active'
                  : 'pills__pill'
              }
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Pills;
