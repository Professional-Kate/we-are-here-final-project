import React from "react";
import { Link } from "react-router-dom";


export const SignUp = () => {
  return (
		<main role="main">
			<div className="signUp__page">
				<Link to="/SignupForm/this/site">Sign-up as a Trainee</Link>
				<h3>Or</h3>
				<Link to="/SignupFormForVolunteer/this/site">
					Sign-up as a Volunteer
				</Link>
			</div>
		</main>
	);
};
