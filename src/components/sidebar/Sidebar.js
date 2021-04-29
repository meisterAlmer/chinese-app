import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ active }) {
  const [lessons, setLessons] = useState([1, 2, 3]);

  return (
    <aside className="sidebar">
      <ul>
        <ul>
          <li>
            <Link
              to={`/lessons/`}
              className={active === 'overview' ? 'sidebar--active' : ''}
            >
              Overview
            </Link>
          </li>
          {lessons.map(lesson => {
            return (
              <li key={lesson}>
                <Link
                  to={`/lessons/lesson/${lesson}`}
                  className={
                    active === `lesson${lesson}` ? 'sidebar--active' : ''
                  }
                >
                  Lesson {lesson}
                </Link>
              </li>
            );
          })}
        </ul>
      </ul>
    </aside>
  );
}

export default Sidebar;
