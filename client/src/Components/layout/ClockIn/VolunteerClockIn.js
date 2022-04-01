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
		// null will be based on token
		cohort_id: 0,
		date: dayjs(new Date()).format("YYYY-MM-DD"),
	});
	const onSearchClass=()=>{
		fetch("api/class/data"
			// method: "",
			// headers: { "Content-Type": "application/json" },
			// credentials: "include",
			// body: JSON.stringify(searchValues),
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
			<h3 className="date">Current date</h3>
			<h3 className="module">module</h3>
			<div>VolunteerClockIn</div>
			<div className="dropDown-cohort">
				<label htmlFor="cohorts">Select a cohort:</label>
				<select
					name="cohort_id"
					id="cohort"
					value={searchValues.cohort_id}
					onChange={(event) =>
						setSearchValues({ ...searchValues, cohort_id: event.target.value })
					}
				>
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
				<button onClick ={onSearchClass }>Search</button>
			</div>

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
					{/* onChange handler */}
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
										<textarea id="comment" name="comment" rows="1" cols="20" />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* <input
				type="submit"
				// onClick={submitHandler}
				value="Submit"
				className="btn"
			/> */}
		</div>
	);
}

export default VolunteerClockIn;
