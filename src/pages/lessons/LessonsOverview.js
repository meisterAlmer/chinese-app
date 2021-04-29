function LessonsOverview({ setPage, setLessonNr }) {
  const handleClick = function () {
    setLessonNr(1);
    setPage('lesson');
  };

  return (
    <>
      <h1>Mandarin Chinese Lessons</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <button type="button" onClick={() => handleClick()}>
        Let's Start!
      </button>
    </>
  );
}

export default LessonsOverview;
