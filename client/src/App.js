import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";

import { Header } from "./Components/layout/header/Header.js";


const App = () => (
	<div>
		<Header />

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
	</div>
);

export default App;
