import React from "react";
import { Link } from "react-router-dom";
import "./LogOut.css";


const LogOut = () => {

  return (
		<div className="logout-button">
			<Link to="/">
				<button className="logout-btn btn">Log Out</button>
			</Link>
		</div>
	);
};

export default LogOut;