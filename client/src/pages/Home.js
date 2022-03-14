
import { Link } from "react-router-dom";

import "./Home.css";


export function Home() {

	return (
		<main role="main">
			<div>
				<Link to="/LoginForm/this/site">Sign In</Link>
				<h3>Or</h3>
				<Link to="/SignupForm/this/site">Sign Up</Link>
			</div>
		</main>
	);
}

export default Home;
