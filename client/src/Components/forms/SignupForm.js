import React from "react";
import { useState, useEffect } from "react";

import "./Form.css";

function SignupForm({ isVolunteer }) {
	console.log(isVolunteer);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		Role: "",
		Name: "",
		Class: "",
		Region: "",
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
	// ERROR useEffect is running in an infinite loop
	useEffect(() => {
		console.log("errors", errors);
		if (Object.keys(errors).length === 0 && submit) {
			console.log("details entered:", details);
		return	setDetails(initialDetails);

		}

	},[details, initialDetails, submit, errors]);

	const validate = (details) => {
		const errors = {};
		if (
			document.getElementById("trainee").checked == false &&
			document.getElementById("volunteer").checked == false
		) {
			errors.Role = "Role is required";
		}

		if (!details.Name) {
			errors.Name = "Name is required";
		} else if (details.Name.length < 3) {
			errors.Name = "Please enter your full name";
		}
		// -----------------------//

		let classes = document.getElementById("classes");
		let selectedClass = classes.options[classes.selectedIndex].value;
		if (selectedClass == "select__class") {
			errors.Class = "Class is required";
		}

		let regions = document.getElementById("regions");
		let selectedRegion = regions.options[regions.selectedIndex].value;
		if (selectedRegion == "select__region") {
			errors.Region = "Region is required";
		}


		if (!details.Username) {
			errors.Username = "Username is required";
		} else if (details.Username.length < 6) {
			errors.Username = "Username must be 6 or more characters";
		}
		if (details.Username.includes(" ")) {
			errors.Username = "No space required";
		}

		if (!details.Password) {
			errors.Password = "Password is required";
		} else if (details.Password.length < 6) {
			errors.Password = "Password is too short";
		}
		if (details.ConfirmPassword !== details.Password) {
			errors.ConfirmPassword = "Passwords do not match";
		}

		return errors;
	};

	return (
		<section className="signup__form">
			{Object.keys(errors).length === 0 && submit ? (
				<div className="ui msg success">Signed Up Successfully</div>
			) : (
				""
			)}
			<h2>Sign Up Page</h2>
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<p>Please select your role as:</p>
					<div className="form-group">
						<div className="trainee__radio">
							<input type="radio" id="trainee" name="role" value="Trainee" />
							<label htmlFor="trainee">Trainee </label>
						</div>
						<div className="volunteer__radio">
							<input
								type="radio"
								id="volunteer"
								name="role"
								value="volunteer"
							/>
							<label htmlFor="volunteer">Volunteer </label>
						</div>
						<p className="form__error">{errors.Role}</p>
					</div>
					<div className="form-group">
						<label htmlFor="trainee_name">Name:</label>
						<input
							type="text"
							name="trainee_name"
							id="trainee_name"
							onChange={(e) => setDetails({ ...details, Name: e.target.value })}
							value={details.Name}
						/>
					</div>
					<p className="form__error">{errors.Name}</p>

					{isVolunteer ? null : (
						<div className="form-group">
							<label htmlFor="trainee_name">Class:</label>
							<select id="classes">
								<option className="traineeClass" value="select__class">
									Classes
								</option>
								<option value="WM1">WM1</option>
								<option value="WM1">WM2</option>
								<option value="WM1">WM3</option>
							</select>
						</div>
					)}
					<p className="form__error">{errors.Class}</p>
					<div className="form-group">
						<label htmlFor="trainee_name">Region:</label>
						<select id="regions">
							<option className="traineeRegion" value="select__region">
								Regions
							</option>
							<option value="Glasgow">Glasgow</option>
							<option value="Manchester">Manchester</option>
							<option value="London">London</option>
						</select>
					</div>

					<p className="form__error">{errors.Region}</p>
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
					<p className="form__error">{errors.Username}</p>
					<div className="form-group">
						<label htmlFor="trainee_name">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) =>
								setDetails({ ...details, Password: e.target.value })
							}
							value={details.Password}
						/>
					</div>
					<p className="form__error">{errors.Password}</p>
					<div className="form-group">
						<label htmlFor="trainee_name">Confirm Password:</label>
						<input
							type="password"
							name="password"
							id="password"
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
						value="Submit"
						className="btn"
					/>
				</div>
			</form>
		</section>
	);
}

export default SignupForm;
