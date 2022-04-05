import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Form.css";

function SignupForm() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		isVolunteer: "",
		firstName: "",
		lastName: "",
		cohortId: "",
		username: "",
		password: "",
		confirmPassword: "",
	};
	const [details, setDetails] = useState(initialDetails);
	const [errors, setErrors] = useState({});
	const [cohorts, setCohorts] = useState([]);
	const [type, setType] = useState("password");
	const navigate = useNavigate();

	useEffect(() => {
		fetch("api/cohorts")
		.then((response) => response.json())
		.then((data) => setCohorts(data))
		.catch((err) => console.log(err));

	}, []);

	function submitHandler(e) {
		e.preventDefault();
		setErrors(validate(details));
		console.log("cohort:" + details.cohortId);
		console.log("errors", errors);
		if (Object.keys(errors).length === 0){
			console.log("details entered:", details);
			const data = {
				firstName: details.firstName,
				lastName: details.lastName,
				username: details.username,
				password: details.password,
				isVolunteer: details.isVolunteer === "Trainee" ? true : false,
				cohortId: +details.cohortId,
			};
			fetch("api/signup", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(data),
			})
			.then(async (response) => {
				if (response.status >= 200 && response.status <= 209) {
					return response.text();
				} else {
					throw new Error(await response.text());
				}
			})
			.then((data) => {
				console.log(data[0]);
				navigate("/");
			})
			.catch((error) => setErrors({ password: error.message }));
		}
		return	setDetails(initialDetails);
	}

	const validate = (details) => {
		const errors = {};
		if (
			document.getElementById("trainee").checked == false &&
			document.getElementById("volunteer").checked == false
		) {
			errors.isVolunteer = "A role must be selected";
		}
		if (!details.firstName) {
			errors.firstName = "First name is required";
		}
		if (!details.lastName) {
			errors.lastName = "Last name is required";
		}
		if (details.cohortId === "") {
			errors.cohortId = "A cohort must be selected";
		}
		if (details.username.length < 6) {
			errors.username = "Username must have 6 or more characters";
		}
		if (details.username.includes(" ")) {
			errors.username = "No space allowed";
		}
		if (details.password.length < 6) {
			errors.password = "Password must have 6 or more characters";
		}
		if (details.confirmPassword !== details.password) {
			errors.confirmPassword = "Passwords do not match";
		}
		return errors;
	};
console.log(details.cohortId);
	return (
		<section className="signup_form">
			<form className="form-inner" onSubmit={submitHandler}>
				<h6>Please select your role:</h6>
				<div className="form-group">
					<div className="roles">
						<div className="trainee__radio">
							<input
								onChange={(e) =>
									setDetails({ ...details, isVolunteer: e.target.value })
								}
								type="radio"
								id="trainee"
								name="role"
								value="Trainee"
								className="radio"
							/>
							<label htmlFor="trainee">Trainee </label>
						</div>
						<div className="volunteer__radio">
							<input
								onChange={(e) =>
									setDetails({ ...details, isVolunteer: e.target.value })
								}
								type="radio"
								id="volunteer"
								name="role"
								value="volunteer"
								className="radio"
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
						required
						onChange={(e) =>
							setDetails({ ...details, firstName: e.target.value })
						}
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
						required
						onChange={(e) =>
							setDetails({ ...details, lastName: e.target.value })
						}
						value={details.lastName}
					/>
				</div>
				<p className="form__error">{errors.lastName}</p>
				<div className="form-group">
					<label htmlFor="cohort">Cohort:</label>
					<select
						onChange={(e) =>
							setDetails({
								...details,
								cohortId: e.target.value.split(".")[0],
							})
						}
						id="cohort"
					>
						<option className="cohort" disabled>
							Select a cohort
						</option>
						{cohorts.map((cohort) => {
							const regionCohort =
								cohort.cohort_id +
								". " +
								cohort.region_name +
								"-" +
								cohort.cohort_number;
							return (
								<option
									key={cohort.cohort_id}
									className="traineeClass"
									value={regionCohort}
								>
									{regionCohort}
								</option>
							);
						})}
					</select>
				</div>
				<p className="form__error">{errors.cohortId}</p>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						id="username"
						placeholder="6 or more characters"
						required
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
						type={type}
						placeholder="no less then 6"
						name="password"
						id="password"
						required
						onChange={(e) =>
							setDetails({ ...details, password: e.target.value })
						}
						value={details.password}
					/>
				</div>

				<i
					className="show-password bi bi-x-diamond-fill"
					role="button"
					tabIndex="0"
					onClick={() =>
						setType((type) => (type === "password" ? "text" : "password"))
					}
					onKeyPress={() =>
						setType((type) => (type === "password" ? "text" : "password"))
					}
				>
					Show
				</i>
				<p className="form__error">{errors.password}</p>
				<div className="form-group">
					<label htmlFor="confirm_password">Confirm password:</label>
					<input
						type={type}
						required
						name="confirm_password"
						id="confirm_password"
						onChange={(e) =>
							setDetails({ ...details, confirmPassword: e.target.value })
						}
						value={details.confirmPassword}
					/>
				</div>
				<i
					className="show-password bi bi-x-diamond-fill"
					role="button"
					tabIndex="0"
					onClick={() =>
						setType((type) => (type === "password" ? "text" : "password"))
					}
					onKeyPress={() =>
						setType((type) => (type === "password" ? "text" : "password"))
					}
				>
					Show
				</i>
				<p className="form__error">{errors.confirmPassword}</p>
				<input
					type="submit"
					onClick={submitHandler}
					value="Submit"
					className="btn"
				/>
				<div>
					<p id="new-user-heading-signup" className="new-account-heading">
						Have an account?{" "}
						<Link className="create-link" to="/">
							Sign in
						</Link>
					</p>
				</div>
			</form>
		</section>
	);
}

export default SignupForm;
