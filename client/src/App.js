import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import SignupForm from "./pages/forms/SignupForm";
import LoginForm from "./pages/forms/LoginForm";
import { SignUp } from "./pages/SignUp";
import About from "./pages/About";
// import Home from "./pages/Home";
import Landing from "./pages/Landing";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/LoginForm/this/site" element={<LoginForm />} />
		<Route path="/SignUp/this/site" element={<SignUp />} />

		<Route
			path="/SignupForm/this/site"
			element={<SignupForm isVolunteer={false} />}
		/>
		<Route
			path="/SignupFormForVolunteer/this/site"
			element={<SignupForm isVolunteer={true} />}
		/>
		{/* if the user isn't already logged in then send them to the /Landing page */}
		<Route path="/landing" element={<Landing />} />
		<Route path="/about" element={<About />} />
	</Routes>
);

export default App;
