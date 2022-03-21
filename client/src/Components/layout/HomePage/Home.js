
import { Link } from "react-router-dom";

import "./Home.css";


export function Home() {

	return (
		<main role="main">
			<div>
				<h2
					id="user-heading"
					className="card-heading underline underline-color-red"
				>
					Join We Are Here
				</h2>
				<h3
					id="old-user-heading"
					className="card-heading underline underline-color-red"
				>
					Already have an account?
				</h3>
				<Link to="/LoginForm/this/site">Sign In</Link>
				<h3
				id="new-user-heading"
					className="card-heading underline underline-color-red"
				>
					Create an account
				</h3>
				<Link to="/SignupForm/this/site">Sign Up</Link>
			</div>
		</main>
	);
}

export default Home;