import React, { useState, useEffect } from "react";

const reactData = {
	cohort: "wm3",
	date: "01/2/2022",
	module: "react",
	trainees: [
		{
			firstName: "uzma",
			lastName: "khan",
			leftEarly: true,
			cameraOff: true,
			lowParticipation: true,
			absent: true,
		},
		{
			firstName: "mo",
			lastName: "khan",
			leftEarly: true,
			cameraOff: true,
			lowParticipation: true,
			absent: true,
		},
	],
};

function VolunteerClockIn() {
	// data to data base
	const [trainees, setTrainees] = useState(reactData.trainees);
	const [cohorts, setCohorts] = useState([]);

	useEffect(() => {
		fetch("api/class/data", {
			headers: {
				authorization: `Bearer ${window.localStorage.getItem("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setCohorts(data))
			.catch((err) => console.log({ ...err }));
	}, []);

	console.log(cohorts);

	const onChangeTrainees = (event, index) => {
		setTrainees(
			trainees.map((trainee, i) => {
				if (index === i) {
					return { ...trainee, [event.target.name]: event.target.checked };
				}
				return trainee;
			})
		);
	};

	return (
		<div>
			<h3 className="date">02 / 04 / 2022</h3>
			<h3 className="module">Final Projects Week 4</h3>
			<div>Volunteer Manegment</div>

			<table>
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
					{ cohorts.length === 0 ? null :
					cohorts.users.map((trainee, i) => {
						return (
							<tr key={trainee.name}>
								<td>
									{trainee.name}
								</td>
								<td>
									<div>
										<input
											name="leftEarly"
											checked={trainee.leftEarly}
											type="checkbox"
											onChange={(event) => onChangeTrainees(event, i)}
										/>
									</div>
								</td>

								<td>
									<div>
										<input
											name="cameraOff"
											checked={trainee.cameraOff}
											type="checkbox"
											onChange={(event) => onChangeTrainees(event, i)}
										/>
									</div>
								</td>
								<td>
									<div>
										<input
											name="lowParticipation"
											checked={trainee.lowParticipation}
											type="checkbox"
											onChange={(event) => onChangeTrainees(event, i)}
										/>
									</div>
								</td>
								<td>
									<div>
										<input
											name="absent"
											checked={trainee.absent}
											type="checkbox"
											onChange={(event) => onChangeTrainees(event, i)}
										/>
									</div>
								</td>
								<td>
									<div>
										<textarea id="comment" name="comment" rows="1" cols="20" />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default VolunteerClockIn;
