import { Route, Routes } from "react-router-dom";

// import About from "./pages/About";
import Home from "./pages/HomePage/Home";
import SignupForm from "./pages/forms/SignupForm";
import LoginForm from "./pages/forms/LoginForm";
import SignupFormForVolunteer from "./pages/forms/SignupFormForVolunteers";
import { SignUp } from "./pages/SignUp";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/LoginForm/this/site" element={<LoginForm />} />
		<Route path="/SignUp/this/site" element={<SignUp />} />

		<Route path="/SignupForm/this/site" element={<SignupForm />} />
		<Route
			path="/SignupFormForVolunteer/this/site"
			element={<SignupFormForVolunteer />}
		/>
	</Routes>
);

export default App;
