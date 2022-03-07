import "./Landing.css";

const Landing = () => {
  return <article id="landing-parent" className="landing-page">
    <h1 id="main-heading" className="main-heading">We are here</h1>
    <section className="card box-shadow">
        <ul id="card-list" className="card-list">
          <li><h2 id="new-user-heading" className="card-heading">Join We Are Here</h2></li>
          <li><button id="sign-up-button" className="card-button box-shadow">Sign Up</button></li>
          <li><h2 id="old-user-heading" className="card-heading">Already have an account?</h2></li>
          <li><button id="sign-in-button" className="card-button box-shadow">Sign In</button></li>
        </ul>
      </section>
    </article>;
};

export default Landing;