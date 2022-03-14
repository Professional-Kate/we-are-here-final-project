import React from "react";
import { useState, useEffect } from "react";
import "./Form.css";

function SignupFormForVolunteer() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		Name: "",
		Username: "",
		Password: "",
		ConfirmPassword: "",
	};
	const [details, setDetails] = useState(initialDetails);
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);

	function submitHandler(e) {
		e.preventDefault();
		setErrors(validate(details));
		setSubmit(true);
	}
	useEffect(() => {
		console.log("errors", errors);
		if (Object.keys(errors).length === 0 && submit) {
			setDetails(initialDetails);
			console.log("details entered:", details);
		}
	}, [details, errors, initialDetails, submit]);

	const validate = (details) => {
		const errors = {};
		const userNameRegex = /^[a-z0-9]+(?:[ _.-][a-z0-9]+)*$/;

		if (!details.Name) {
			errors.Name = "Name is required";
		} else if (details.Name.length < 3) {
			errors.Name = "Please enter your full name";
		}
		if (!details.Username) {
			errors.Username = "Username is required";
		} else if (
			details.Username.length < 3 ||
			!userNameRegex.test(details.Username)
		) {
			errors.Username = "Required format: word, word-sep-word";
		}
		if (!details.Password) {
			errors.Password = "Password is required";
		} else if (details.Password.length < 3) {
			errors.Password = "Password is too short";
		}
		if (details.ConfirmPassword !== details.Password) {
			errors.ConfirmPassword = "Passwords do not match";
		}

		return errors;
	};

	return (
		<div className="vlonuteer__form">

			{Object.keys(errors).length === 0 && submit ? (
				<div className="ui msg success">Signed Up Successfully</div>
			) : (
				""
			)}
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<h2>Sign Up Page</h2>
					<h3>Please enter your details as a volunteer</h3>

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
					<p className="form__error">{errors.Name}</p>
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
					<p className="form__error">{errors.Username}</p>
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
					<p className="form__error">{errors.Password}</p>
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
					<p className="form__error">{errors.ConfirmPassword}</p>
					<input
						type="submit"
						onClick={submitHandler}
						value="Sign Up"
						className="btn"
					/>
				</div>
			</form>
		</div>
	);
}

export default SignupFormForVolunteer;
