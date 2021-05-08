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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan
          hendrerit dapibus. Ut condimentum fringilla turpis pretium porttitor.
          Donec est felis, dignissim quis sodales sed, aliquet ac massa. Nulla
          facilisi. Aenean quis elementum neque.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
