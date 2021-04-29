import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import LessonsOverview from './LessonsOverview';
import Lesson from './Lesson';
import './Lessons.css';

function Lessons() {
  const [lessons, setLessons] = useState([1, 2, 3]);
  const [page, setPage] = useState('overview');
  const [lessonNr, setLessonNr] = useState(1);

  return (
    <div className="lessons--main">
      <ul>
        {lessons.map(lesson => {
          return (
            <li key={lesson}>
              <Link to={`lesson/${lesson}`}>Lesson {lesson}</Link>
            </li>
          );
        })}
      </ul>
      {/* <Sidebar lessons={lessons} setPage={setPage} setLessonNr={setLessonNr} /> */}
      {/* <section className="lessons--content"> */}
      {/* {page === 'overview' && (
          <LessonsOverview setPage={setPage} setLessonNr={setLessonNr} />
        )}
        {page === 'lesson' && <Lesson lesson={lessonNr} />} */}
      {/* </section> */}
    </div>
  );
}

export default Lessons;
