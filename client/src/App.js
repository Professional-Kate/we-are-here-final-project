import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SignupForm from "./Components/forms/SignupForm";
import LoginForm from "./Components/forms/LoginForm";
import matrixImg from "./assets/matrix-technology.jpeg";
import Footer from "./Components/layout/footer/Footer";
import ClockIn from "./Components/layout/ClockIn/ClockIn";
import VolunteerClockIn from "./Components/layout/ClockIn/VolunteerClockIn";
import "./app.css";
import Header  from "./Components/layout/header/Header";

const App = () => {
	const [renderBackground, setRenderBackground] = useState(true);

	return <div className="main-wrapper">
		{renderBackground && <img className="matrix" alt="background" src={matrixImg} />}
		<Header state={setRenderBackground} />
		<div className="main-container">
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/clockin" element={<ClockIn state={setRenderBackground} />} />
				<Route path="/volunteer" element={<VolunteerClockIn state={setRenderBackground} />} />
			</Routes>
		</div>
		<Footer />
	</div>;
};


export default App;
