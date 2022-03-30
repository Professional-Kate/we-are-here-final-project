import React from "react";
import { Link } from "react-router-dom";

const ClockInDetails = () => {
    //Make a call to the server to get the clock in details

    const handleClick = () => {
        //Make a call to the server to clock out
        //using the clockin endpoint
    };

	return (
		<>
			<div className="card text-center">
				<div className="card-header">Name of Trainee</div>
				<div className="card-body">
                    {/* Name of class/module */}
					<h5 className="card-title">Javascript Core 1</h5>
                    {/* Name of Cohort */}
					<p className="card-text">West Midlands Class 3</p>
                    {/* Clock in button */}
					<Link href="/" className="btn btn-primary" onClick={handleClick}>
						Clock In
					</Link>
				</div>
				<div className="card-footer text-muted">You have successfully clocked in</div>
			</div>
		</>
	);
};

export default ClockInDetails;
