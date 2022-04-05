import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import Home from "./Components/layout/HomePage/Home";
import Footer from "./Components/layout/footer/Footer";
import LogOut from "./Components/layout/LogOut/LogOut";
import ClockIn from "./Components/layout/ClockIn/ClockIn";
import VolunteerClockIn from "./Components/layout/ClockIn/VolunteerClockIn";

const App = () => (
	<div>
		<Home />
		<Routes>
			<Route path="/" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />

			{/* /signup */}
			{/* <Route path="/SignupForm/this/site" element={<SignupForm />} /> */}
			<Route path="/" element={<LogOut />} />
			<Route path="/clockin" element={<ClockIn />} />
			<Route path="/volunteer" element={<VolunteerClockIn />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
