import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import Home from "./Components/layout/HomePage/Home";

import { Footer } from "./Components/layout/footer/Footer";
// import Footer from "./Components/layout/footer/Footer";
import LogOut from "./Components/layout/LogOut/LogOut";




const App = () => (
	<div>
		<Home />

		<Routes>
			<Route path="/" element={<LoginForm />} />


			<Route
				path="/signup"
				element={<SignupForm />}
			/>
{/* /signup */}
			<Route path="/SignupForm/this/site" element={<SignupForm />} />
			<Route path="/" element={<LogOut />} />
		</Routes>
	 <Footer />
	</div>
);

export default App;
