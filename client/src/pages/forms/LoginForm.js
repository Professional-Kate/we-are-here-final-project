import { response } from "express";
import React, { useState, useEffect } from "react";
import "./Form.css";

function LoginForm() {

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
     userName: "",
     password: "" };
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
			// Tenzin: retrieving jwt token from backend
			fetch("api/login")
			.then((response) => {
				if (response.status >= 200 && response.status <= 299) {
					return response.json();
				} else {
					throw new Error(
						`Something went wrong: ${response.status} ${response.statusText}`
					);
				}
			})
			.then((data) => localStorage.set("token", data.accessToken))
			.catch((error) => error.message);
		}
		//Accessing protected source with token
		const token = window.localStorage.get("token");
		fetch("api/auth/clockin", {
			headers: {
				authentication: `Bearer ${token}`,
			},
		})
		.then();
	},[details, errors, initialDetails, submit]);

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
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<h2>Sign In Page</h2>

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
