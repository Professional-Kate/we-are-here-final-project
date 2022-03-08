const AboutList = () => {
  return <ul id="card-list" className="card-list">
    <li><h1 id="card-first-heading" className="card-heading underline underline-color-red">About</h1></li>
    <li>
      {/* will update this later when we come up with a good about me */}
      <h2 id="about-the-project" className="card-heading">&quot;
      <span className="cyf-red-color underline underline-color-black">
        We Are Here
        </span>&quot; is an attendance tracking and data aggregation app</h2>
    </li>
    </ul>;
};

export default AboutList;