import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AboutList from "../layout/About/AboutList";

import "./Form.css";

function LoginForm() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialDetails = {
		userName: "",
		password: "",
	};
	const [details, setDetails] = useState(initialDetails);
	const [errors, setErrors] = useState({});
	const [type, setType] = useState("password");
	const navigate = useNavigate();

	function submitHandler(e) {
		e.preventDefault();
		const errors = validate(details);
		setErrors(errors);
		console.log("errors", errors);
		if (Object.keys(errors).length === 0) {
			const data = {
				username: details.userName,
				password: details.password,
			};
			fetch("api/login", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(data),
			})
				.then(async (response) => {
					if (response.status >= 200 && response.status <= 299) {
						return response.json();
					} else {
						throw new Error(await response.text());
					}
				})
				.then((data) => {
					localStorage.setItem("token", data.accessToken);
					if (data.isVolunteer){
						navigate("/management");
					} else {
						navigate("/clockin");
					}
				})
				.catch((error) => setErrors({ password: error.message }));
			setDetails(initialDetails);
		}

		console.log("details entered:", details);
	}

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
		<div className="middle__section">
			<div className="about__text">
				<AboutList />
			</div>
			<section className="form__container">
				<div>
					<p id="new-user-heading" className="new-account-heading">
						Sign in or{" "}
						<Link className="create-link" to="/signup">
							Create an account
						</Link>
					</p>
				</div>
				<div>
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
									type={type}
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
								src="/ClockIn/this/site"
							/>

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
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}

export default LoginForm;
