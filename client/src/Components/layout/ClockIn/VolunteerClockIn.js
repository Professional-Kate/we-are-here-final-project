import React, { useState, useEffect } from "react";

function VolunteerClockIn({ state }) {
	state(false);
	const [trainees, setTrainees] = useState([]);

	useEffect(() => {
		const fetchData = async function() {
			const today = new Date();
			const result = await fetch("api/class/data", {
				method: "POST",
				headers: {
					"authorization": `Bearer ${window.localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ date: today.toISOString().slice(0, 10) }),
			});
			const data = await result.json();
			setTrainees(data.users);
		};

		fetchData();
	}, []);

	return (
		<div>
			{!trainees ? <h3 className="date">You don&apos;t have a class today!</h3> : <div>	<h3 className="date">WM3 Management</h3>
			<div className="volunteer-clockin-table-wrapper">
				<table className="volunteer-clockin-table">
					<thead>
						<tr>
							<th>Full name</th>
							<th>Left early</th>
							<th>Camera off</th>
							<th>Low participation</th>
							<th>Absent</th>
							<th>Add comments</th>
						</tr>
					</thead>
					<tbody>
						{trainees.map((trainee, i) => {
							return (
								<tr key={trainee.name + i}>
									<td>
										{trainee.name}
									</td>
									<td>
										<div>
											<input
												name="leftEarly"
												checked={trainee.leftEarly}
												type="checkbox"
											/>
										</div>
									</td>

									<td>
										<div>
											<input
												name="cameraOff"
												checked={trainee.cameraOff}
												type="checkbox"
											/>
										</div>
									</td>
									<td>
										<div>
											<input
												name="lowParticipation"
												checked={trainee.lowParticipation}
												type="checkbox"
											/>
										</div>
									</td>
									<td>
										<div>
											<input
												name="absent"
												checked={trainee.absent}
												type="checkbox"
											/>
										</div>
									</td>
									<td>
										<div>
											<textarea
												id="comment"
												name="comment"
												rows="1"
												cols="20"
												checked={trainee.comment}
											/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div></div>}
		</div>
	);
}

export default VolunteerClockIn;
