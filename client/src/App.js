import { Route, Routes } from "react-router-dom";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import matrixImg from "./assets/matrix-technology.jpeg";
import Footer from "./Components/layout/footer/Footer";
import LogOut from "./Components/layout/LogOut/LogOut";
import ClockIn from "./Components/layout/ClockIn/ClockIn";
import VolunteerClockIn from "./Components/layout/ClockIn/VolunteerClockIn";
import "./app.css";
import Header  from "./Components/layout/header/Header";

const App = () => (
	<div className="main-wrapper">
		<img className="matrix" alt="background" src={matrixImg} />
		<Header />
		<div className="main-container">
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />

				<Route path="/" element={<LogOut />} />
				<Route path="/" element={<ClockIn />} />
				<Route path="/clockin" element={<VolunteerClockIn />} />
			</Routes>
		</div>
		<Footer />
	</div>
);

export default App;
