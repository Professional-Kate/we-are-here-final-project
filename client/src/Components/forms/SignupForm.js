import React from "react";
import { useState } from "react";

import "./Form.css";

function SignupForm({ isVolunteer }) {
	console.log(isVolunteer);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		role: "",
		firstName: "",
		lastName: "",
		cohort: "",
		regionName: "",
		username: "",
		password: "",
		confirmPassword: "",
	};
	const [details, setDetails] = useState(initialDetails);
	const [errors, setErrors] = useState({});
	const [cohorts, setCohorts] = useState([]);
	const [regions, setRegions] = useState([]);

	useEffect(() => {
		fetch()

	}, [])

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

		if (!details.Name) {
			errors.Name = "Name is required";
		} else if (details.Name.length < 3) {
			errors.Name = "Please enter your full name";
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
		<section className="signup_form">
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<h6>Please select your role as:</h6>
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
						<p className="form__error">{errors.Role}</p>
					</div>
					<div className="form-group">
						<label htmlFor="firstName">Full Name:</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
							value={details.firstName}
						/>
					</div>
					<p className="form__error">{errors.Name}</p>
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
					<p className="form__error">{errors.Name}</p>
					<div className="form-group">
						<label htmlFor="cohort">Cohort:</label>
						<select onChange={(e) => setDetails({ ...details, cohort: e.target.value })} id="cohort">
							{<option className="traineeClass" value="select__class">
								cohort
							</option>
							}
						</select>
					</div>
					<p className="form__error">{errors.Class}</p>
					<div className="form-group">
						<label htmlFor="region">Region:</label>
						<select id="region">
							<option className="traineeRegion" value="select__region">
								Region
							</option>
						</select>
					</div>

					<p className="form__error">{errors.Region}</p>
					<div className="form-group">
						<label htmlFor="trainee_name">Username:</label>
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
