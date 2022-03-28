import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import Home from "./Components/layout/HomePage/Home";
// import { Footer } from "./Components/layout/footer/Footer";





const App = () => (
	<div>
		<Home />

		<Routes>
			<Route exact path="/" element={<LoginForm />} />

			<Route
				path="/signup"
				element={<SignupForm />}
			/>
		</Routes>
		{/* <Footer /> */}
	</div>
);

export default App;
