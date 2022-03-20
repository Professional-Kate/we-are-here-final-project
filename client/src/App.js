import { Route, Routes } from "react-router-dom";
import Home from "./Components/layout/HomePage/Home.js";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import About from "./pages/About.js";
import { Header } from "./Components/layout/header/Header.js";
import { Footer } from "./Components/layout/footer/Footer.js";


const App = () => (
	<div>
		<Header />
		<Footer />
		<About />

		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/LoginForm/this/site" element={<LoginForm />} />

			<Route
				path="/SignupForm/this/site"
				element={<SignupForm isVolunteer={false} />}
			/>
			<Route
				path="/SignupVolunteer/this/site"
				element={<SignupForm isVolunteer={true} />}
			/>
			{/* if the user isn't already logged in then send them to the /Landing page */}
			<Route path="/about" element={<About />} />
		</Routes>
	</div>
);

export default App;
