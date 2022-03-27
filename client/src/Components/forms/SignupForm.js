import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Form.css";

function SignupForm() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		role: "",
		firstName: "",
		lastName: "",
		cohort: {
			regionName: "",
			regionId: "",
			cohortNumber: "",
		},
		username: "",
		password: "",
		confirmPassword: "",
	};
	const [details, setDetails] = useState(initialDetails);
	const [errors, setErrors] = useState({});
	const [cohorts, setCohorts] = useState([]);

	useEffect(() => {
		fetch("api/cohorts")
		.then((response) => response.json())
		.then((data) => setCohorts(data))
		.catch((err) => console.log(err));

	}, []);

	function submitHandler(e) {
		e.preventDefault();
		setErrors(validate(details));
		console.log("errors", errors);
		if (Object.keys(errors).length === 0){
			console.log("details entered:", details);
		}
		return	setDetails(initialDetails);
	}

	const validate = (details) => {
		const errors = {};
		if (
			document.getElementById("trainee").checked == false &&
			document.getElementById("volunteer").checked == false
		) {
			errors.Role = "Role is required";
		}

		if (!details.firstName) {
			errors.firstName = "First name is required";
		}
		if (!details.lastName) {
			errors.lastName = "Last name is required";
		}

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
			errors.Username = "No space allowed";
		}

		if (!details.Password) {
			errors.Password = "Password is required";
		} else if (details.Password.length < 6) {
			errors.Password = "Password must have 6 or more characters";
		}
		if (details.ConfirmPassword !== details.Password) {
			errors.ConfirmPassword = "Passwords do not match";
		}

		return errors;
	};

	return (
		<section className="signup_form">
			<div>
				<p id="new-user-heading" className="new-account-heading">
					Have an account? {" "}
					<Link className="create-link" to="/">
						Sign in
					</Link>
				</p>
				</div>
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<h6>Please select your role:</h6>
					<div className="form-group">
						<div className="roles">
							<div className="trainee__radio">
								<input
									onChange={(e) => setDetails({ ...details, role: e.target.value })}
									type="radio"
									id="trainee"
									name="role"
									value="Trainee" />
								<label htmlFor="trainee">Trainee </label>
							</div>
							<div className="volunteer__radio">
								<input
									onChange={(e) => setDetails({ ...details, role: e.target.value })}
									type="radio"
									id="volunteer"
									name="role"
									value="volunteer"
								/>
								<label htmlFor="volunteer">Volunteer </label>
							</div>
						</div>
						<p className="form__error">{errors.role}</p>
					</div>
					<div className="form-group">
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
							value={details.firstName}
						/>
					</div>
					<p className="form__error">{errors.firstName}</p>
					<div className="form-group">
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
							value={details.lastName}
						/>
					</div>
					<p className="form__error">{errors.lastName}</p>
					<div className="form-group">
						<label htmlFor="cohort">Cohort:</label>
						<select onChange={(e) => setDetails({ ...details, cohort: e.target.value })} id="cohort">
							<option className="traineeClass" value="select__class" selected disabled> Select a cohort
							</option>
							{cohorts.map((cohort, ind) => {
								const regionCohort = cohort.regionname + "-" + cohort.cohortnumber;
								console.log(regionCohort);
								return <option key={ind} className="traineeClass" value={regionCohort}>
									{regionCohort}
								</option>;
							})
							}
						</select>
					</div>
					{/* <p className="form__error">{errors.Class}</p>
					<div className="form-group">
						<label htmlFor="region">Region:</label>
						<select id="region">
							<option className="traineeRegion" value="select__region">
								Region
							</option>
						</select>
					</div> */}

					<p className="form__error">{errors.cohort}</p>
					<div className="form-group">
						<label htmlFor="trainee_Username">Username:</label>
						<input
							type="text"
							name="trainee_Username"
							id="trainee_Username"
							onChange={(e) =>
								setDetails({ ...details, username: e.target.value })
							}
							value={details.username}
						/>
					</div>
					<p className="form__error">{errors.username}</p>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) =>
								setDetails({ ...details, password: e.target.value })
							}
							value={details.password}
						/>
					</div>
					<p className="form__error">{errors.password}</p>
					<div className="form-group">
						<label htmlFor="confirm_password">Confirm Password:</label>
						<input
							type="password"
							name="confirm_password"
							id="confirm_password"
							onChange={(e) =>
								setDetails({ ...details, confirmPassword: e.target.value })
							}
							value={details.confirmPassword}
						/>
					</div>
					<p className="form__error">{errors.confirmPassword}</p>
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
