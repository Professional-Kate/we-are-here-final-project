import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Form.css";

function LoginForm() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		userName: "",
		password: "",
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
		if (!details.userName) {
			errors.userName = "Username is required";
		}
		if (!details.password) {
			errors.password = "Password is required";
		}

		return errors;
	};

	return (
		<div className="container">
			{Object.keys(errors).length === 0 && submit ? (
				<div className="ui msg success">Signed In Successfully</div>
			) : (
				""
			)}
			<h2>Sign In Page</h2>
			<div>
				<p
					id="new-user-heading"
					className="card-heading underline underline-color-red"
				>
					Sign in or {" "}
					<Link to="/SignupForm/this/site">Create an account</Link>
				</p>
			</div>
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<div className="form-group">
						<label htmlFor="name">Username:</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={(e) =>
								setDetails({ ...details, userName: e.target.value })
							}
							value={details.userName}
						/>
					</div>
					<p className="form__error">{errors.userName}</p>
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
					<input
						type="submit"
						onClick={submitHandler}
						value="Sign In"
						className="btn"
					/>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
