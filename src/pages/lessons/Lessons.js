import Sidebar from '../../components/sidebar/Sidebar';
import './Lessons.css';

function Lessons() {
  return (
    <section className="lessons--main">
      <Sidebar className="lessons--nav" active="overview" />
      <article className="lessons--content">
        <h1>Mandarin Chinese Lessons</h1>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt.
        </p>
      </article>
    </section>
  );
}

export default Lessons;
