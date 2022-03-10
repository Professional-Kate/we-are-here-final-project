import React from "react";
import { useState } from "react";
import "./Form.css";

function SignupFormForVolunteer({ signUp }) {
	const [details, setDetails] = useState({ Name: "", Username: "" });
	function submitHandler(submitButton) {
		submitButton.preventDefault();
		signUp(details);
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-inner">
				<h2>Sign Up Page</h2>
				<h3>Please enter your details as a volunteer</h3>
				{/* errors will come here */}
				{/* {error !== "" ? <div className="error">{error}</div> : ""} */}
				<div className="form-group">
					<label htmlFor="volunteer_name">Name:</label>
					<input
						type="text"
						name="volunteer_name"
						id="volunteer_name"
						onChange={(e) => setDetails({ ...details, Name: e.target.value })}
						value={details.Name}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="volunteer_Username">Username:</label>
					<input
						type="text"
						name="volunteer_Username"
						id="volunteer_Username"
						onChange={(e) =>
							setDetails({ ...details, Username: e.target.value })
						}
						value={details.Username}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="volunteer_name">Password:</label>
					<input
						type="volunteer_Password"
						name="volunteer_Password"
						id="volunteer_Password"
						onChange={(e) =>
							setDetails({ ...details, Password: e.target.value })
						}
						value={details.Password}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="volunteer_name">Confirm Password:</label>
					<input
						type="volunteer_Confirm Password"
						name="volunteer_Confirm Password"
						id="volunteer_Confirm Password"
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
	);
}

export default SignupFormForVolunteer;
