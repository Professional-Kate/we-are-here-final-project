import { useState } from "react";
import AboutList from "../Components/AboutList";
import SignInList from "../Components/SignInList";

import "./Landing.css";

const Landing = () => {
  const [isAboutPage, setIsAboutPage] = useState(false);

  const clickEvent = () => setIsAboutPage((isAboutPage) => !isAboutPage); // flip the boolean in the state

  return <article id="landing-parent" className="landing-page">
    <h1 id="main-heading" className="main-heading underline underline-color-red">We are here</h1>
    <section className="card box-shadow">
      {isAboutPage ? <AboutList /> : <SignInList />}
      </section>
          <button id="about-header" className="about-header card-button box-shadow" onClick={clickEvent}>
            <h2>{isAboutPage ? "Go back..." : "About this page"}</h2>
            </button>
    </article>;
};

export default Landing;