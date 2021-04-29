// import { useEffect, useState } from 'react';

function Sidebar({ lessons, setPage, setLessonNr }) {
  const handleClick = function (lesson) {
    setLessonNr(lesson);
    setPage('lesson');
  };

  return (
    <aside>
      <ul>
        <ul>
          <li>
            <p
              onClick={() => {
                setPage('overview');
              }}
            >
              Overview
            </p>
          </li>
          {lessons.map(lesson => {
            return (
              <li key={lesson}>
                <p onClick={() => handleClick([lesson])}>Lesson {lesson}</p>
              </li>
            );
          })}
        </ul>
      </ul>
    </aside>
  );
}

export default Sidebar;
