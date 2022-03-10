import React from "react";
import { useState } from "react";

import "./Form.css";
import SignupFormForVolunteer from "./SignupFormForVolunteers";



function SignupForm({ signUp }) {
	const [details, setDetails] = useState({ Name: "", Username: "" });
	function submitHandler(submitButton) {
		submitButton.preventDefault();
		signUp(details);
	}

	return (
		<section className="signup__forms">
			<div className="trainee__form">
				<form onSubmit={submitHandler}>
					<div className="form-inner">
						<h2>Sign Up Page</h2>
						<h3>Please enter your details as a trainee</h3>
						{/* errors will come here */}
						{/* {error !== "" ? <div className="error">{error}</div> : ""} */}
						<div className="form-group">
							<label htmlFor="trainee_name">Name:</label>
							<input
								type="text"
								name="trainee_name"
								id="trainee_name"
								onChange={(e) =>
									setDetails({ ...details, Name: e.target.value })
								}
								value={details.Name}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="trainee_name">Class:</label>
							<input
								type="text"
								name="trainee_class"
								id="trainee_class"
								onChange={(e) =>
									setDetails({ ...details, Class: e.target.value })
								}
								value={details.Class}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="trainee_Username">Username:</label>
							<input
								type="text"
								name="trainee_Username"
								id="trainee_Username"
								onChange={(e) =>
									setDetails({ ...details, Username: e.target.value })
								}
								value={details.Username}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="trainee_name">Password:</label>
							<input
								type="trainee_Password"
								name="trainee_Password"
								id="trainee_Password"
								onChange={(e) =>
									setDetails({ ...details, Password: e.target.value })
								}
								value={details.Password}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="trainee_name">Confirm Password:</label>
							<input
								type="Confirm trainee_Password"
								name="Confirm trainee_Password"
								id="Confirm trainee_Password"
								onChange={(e) =>
									setDetails({ ...details, ConfirmPassword: e.target.value })
								}
								value={details.ConfirmPassword}
							/>
						</div>

						<input
							type="submit"
							onClick={submitHandler}
							value="Sign Up"
							className="btn"
						/>
					</div>
				</form>
			</div>
			<div className="volunteer__form">
				<SignupFormForVolunteer />
			</div>
		</section>
	);
}

export default SignupForm;
