import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import Home from "./Components/layout/HomePage/Home";
// import { Footer } from "./Components/layout/footer/Footer";




const App = () => (
	<div>
		<Home />

		<Routes>
			<Route path="/" element={<LoginForm />} />
			<Route path="/SignupForm/this/site" element={<SignupForm />} />

			<Route
				path="/SignupForm/this/site"
				element={<SignupForm isVolunteer={false} />}
			/>
			<Route
				path="/SignupVolunteer/this/site"
				element={<SignupForm isVolunteer={true} />}
			/>
		</Routes>
		{/* <Footer /> */}
	</div>
);

export default App;
