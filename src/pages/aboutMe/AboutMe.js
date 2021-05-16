import about from '../../assets/about.svg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about">
      <div className="about__image">
        <img src={about} alt={about} />
      </div>
      <div className="about__content">
        <h1>About Me</h1>
        <p>Hello everyone, I am Lei</p>
        <p>
          I graduated from Beijing China and have a certification from Beijing
          Language and Culture university as teacher, teaching Chinese as second
          language.
        </p>
        <p>
          I like reading, swimming, watch movies and visit museums. I like to
          spending time on teaching students and chatting with them.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
