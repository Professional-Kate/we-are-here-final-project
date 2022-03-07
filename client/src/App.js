import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		{/* if the user isn't already logged in then send them to the /Landing page */}
		<Route path="/landing" element={<Landing />} />
		<Route path="/about" element={<About />} />
	</Routes>
);

export default App;
