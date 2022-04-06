import React, { useState } from "react";
import zoomLogo from "../../../assets/Zoom-logo.png";
import "./ClockIn.css";

function ClockIn({ state }) {
    state(false);
    const [clockedIn, setClockedIn] = useState(false);

  return (
		<div className="clockin">
            <h2 className="clockin-header">WM3 Demo Day!</h2>
			<button className="btn clockin-button" onClick={() => setClockedIn(true)}>Clock in!</button>
            { clockedIn && <div><h2 className="clockin-headerTwo">Welcome to class!</h2><img src={zoomLogo} alt="zoom-logo" className="clockin-picture" /></div> }
		</div>
	);
}

export default ClockIn;