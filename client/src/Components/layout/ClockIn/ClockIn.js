// import { response } from "express";
import React from "react";
import "./ClockIn.css";



function ClockIn() {

    const handleClockIn = async () =>{
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
            <h2>Module</h2>
			<button onClick={handleClockIn}>ClockIn</button>

            {/* <h2>ClockIn Page</h2> */}
		</div>
	);
}

export default ClockIn;