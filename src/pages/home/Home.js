import './Home.css';
import { useHistory } from 'react-router-dom';
import home from '../../assets/home.svg';
import Button from '../../components/button/Button';

function Home() {
  const history = useHistory();

  function handleClick() {
    history.push('/lessons');
  }

  return (
    <section className="home">
      <div className="home__content">
        <h1>
          <span className="home__highlight">Learn Mandarin online</span> with a
          private tutor on Skype or Zoom!
        </h1>
        <p>
          Get your own personal online Chinese tutor. Great for individuals,
          businesses, and children.
        </p>
        <Button
          label={'Start Learning!'}
          clickEvent={handleClick}
          disabled={false}
        />
        {/* <button onClick={handleClick}>Start Learning!</button> */}
      </div>
      <div className="home__image">
        <img src={home} alt={home} />
      </div>
    </section>
  );
}

export default Home;
