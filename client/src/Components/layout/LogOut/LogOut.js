import React from "react";
import { Link } from "react-router-dom";
import "./LogOut.css";


const LogOut = () => {

  return (
		<div className="logout-button">
			<Link className="logout-btn" to="/">
				Log Out
			</Link>
		</div>
	);
};

export default LogOut;