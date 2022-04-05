// import { response } from "express";
import React, { useState } from "react";
import "./ClockIn.css";



function ClockIn() {
    const [clockedIn, setClockedIn] = useState(false);

    const handleClockIn = async () =>{
        setClockedIn(true);
        const time = new Date();
      await fetch("api/validate/trainee",{
           method:"post",
           headers: { "Content-Type" :"application/json" },
           credentials:"include",
           body:JSON.stringify(time),
       });


        throw "Clocked in Successful";
    };
  return (
		<div>
            <h2>Final Projects Week 4</h2>
			<button onClick={handleClockIn}>{!clockedIn ? "Clock in!" : "Wooooo!"}</button>
            {!clockedIn ? null : <h2>Clocked In! Enjoy class 🥳</h2>}

            {/* <h2>ClockIn Page</h2> */}
		</div>
	);
}

export default ClockIn;