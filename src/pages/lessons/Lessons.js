import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import lessons from '../../assets/lessons.svg';
import { useHistory } from 'react-router-dom';
import './Lessons.css';

function Lessons() {
  const history = useHistory();

  function handleClick() {
    history.push('/lessons/lesson/1');
  }

  return (
    <section className="lessons__main">
      <Sidebar className="lessons__nav" active="overview" />
      <article className="lessons__content">
        <div className="lessons__flex">
          <div className="lessons__text">
            <h1>Mandarin Chinese Lessons</h1>
            <p>
              These introduction lessons to Chinese speech and writing serves as
              a guide which through a variety of routes, can help you think in
              Chinese.
            </p>
            <p>
              The aim of the lessons is to present the Chinese language as it
              is: a world of signs with their origin and the logic of their
              composition, represented by the most frequently used ones.
            </p>
            <p>
              This course is above all a way of embracing the culture and
              mentality of the Chinese people.
            </p>
            <Button
              label={'Go to first lesson!'}
              clickEvent={handleClick}
              disabled={false}
            />
          </div>
          <div className="lessons__image">
            <img src={lessons} alt={lessons} />
          </div>
        </div>
      </article>
    </section>
  );
}

export default Lessons;
