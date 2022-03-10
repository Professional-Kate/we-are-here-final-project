import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./Form.css";

function LoginForm({ SignIn }) {
	const [details, setDetails] = useState({ userName: "", password: "" });
	function submitHandler(submitButton) {
		submitButton.preventDefault();
		SignIn(details);
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-inner">
				<h2>Sign In Page</h2>
				{/* errors will come here */}
				{/* {error !== "" ? <div className="error">{error}</div> : ""} */}
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
				<input
					type="submit"
					onClick={submitHandler}
					value="Sign In"
					className="btn"
				/>
			</div>
		</form>
	);
}

export default LoginForm;
