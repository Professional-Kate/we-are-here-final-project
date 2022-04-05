import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

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
			firstName: "tenzyn",
			lastName: "khan",
			leftEarly: true,
			cameraOff: true,
			lowParticipation: true,
			absent: true,
		},
		{
			firstName: "kate",
			lastName: "khan",
			leftEarly: true,
			cameraOff: true,
			lowParticipation: true,
			absent: true,
		},
		{
			firstName: "georgina",
			lastName: "khan",
			leftEarly: true,
			cameraOff: true,
			lowParticipation: true,
			absent: true,
		},
	],
};

function VolunteerClockIn() {
	const [cohortClass, setCohortClass] = useState(reactData);
	console.log(cohortClass);
	const [trainees, setTrainees] = useState(reactData.trainees);
	const [cohorts, setCohorts] = useState([]);


	useEffect(() => {
		fetch("api/cohorts")
			.then((response) => response.json())
			.then((data) => setCohorts(data))
			.catch((err) => console.log({ ...err }));
	}, []);
	console.log(cohorts);
	const [searchValues, setSearchValues] = useState({

		cohort_id: 0,
		date: dayjs(new Date()).format("YYYY-MM-DD"),
	});
	const onSearchClass=()=>{
		fetch("api/class/data"
)
			.then((response) => {
				if (response.status >= 200 && response.status <= 209) {
					return response.json();
				} else {
					throw new Error(response.text());
				}
			})
			.then((data) => {
				setCohortClass(data);
				setTrainees(data.trainees);

			})
			.catch((error) => console.log(error));
	};
	const onChangeTrainees = (event, index) => {
		const value=event.target.type==="checkbox" ? event.target.checked : event.target.value;
		setTrainees(
			trainees.map((trainee, i) => {
				if (index === i) {
					return { ...trainee, [event.target.name]: value };
				}
				return trainee;
			})
		);
	};

	return (
		<div>
			<h3 className="date">Clock In for Volunteers</h3>

			<div className="search-classes-form">
				<select
					name="cohort_id"
					id="cohort"
					value={searchValues.cohort_id}
					onChange={(event) =>
						setSearchValues({
							...searchValues,
							cohort_id: event.target.value,
						})
					}
				>
					<option>Select a class</option>
					{cohorts.map((cohort) => {
						const regionCohort =
							cohort.cohort_id +
							". " +
							cohort.region_name +
							"-" +
							cohort.cohort_number;
						return (
							<option
								key={cohort.cohort_id}
								className="traineeClass"
								value={cohort.cohort_id}
							>
								{regionCohort}
							</option>
						);
					})}
				</select>

				<input
					type="date"
					value={searchValues.date}
					onChange={(event) =>
						setSearchValues({ ...searchValues, date: event.target.value })
					}
				/>
				<button onClick={onSearchClass}>Search</button>
			</div>
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
								<tr key={trainee.firstName}>
									<td>
										{trainee.firstName} {trainee.lastName}
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
											<textarea
												id="comment"
												name="comment"
												rows="1"
												cols="20"
												checked={trainee.comment}
												onChange={(event) => onChangeTrainees(event, i)}
											/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default VolunteerClockIn;
