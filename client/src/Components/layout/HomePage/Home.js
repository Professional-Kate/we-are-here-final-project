
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
					We Are Here
				</h2>
				<div className="card-container">
					<ul id="card-list" className="card-list">
						<li>
							<p
								id="old-user-heading"
								className="card-heading underline underline-color-red"
							>
								Already have an account?
							</p>
						</li>
						<li>
							<Link to="/LoginForm/this/site">Sign In</Link>
						</li>
						<li>
							<p
								id="new-user-heading"
								className="card-heading underline underline-color-red"
							>
								Create an account
							</p>
						</li>
						<li>
							<Link to="/SignupForm/this/site">Sign Up</Link>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}

export default Home;