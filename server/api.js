import { Router } from "express";
import pool from "./db";

const router = Router();
const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
	res.json("hello world");
});

router.post("/signup", async (req, res) => {
	try {
		//this hides the password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			cohortId: req.body.cohortId,
			password: hashedPassword,
			isVolunteer: req.body.isVolunteer,
		};
		//checking if username already exist
		pool
		.query("SELECT user_name FROM users WHERE user_name=$1", [newUser.username])
		.then((result) => {
			if (result.rows.length > 0) {
				res.status(400).send("Username already exist!");
			} else {
				//Checking if cohort ID exist
				pool.query("SELECT id FROM cohorts WHERE id=$1", [newUser.cohortId])
				.then((result1) => {
					if (result1.rows.length < 1) {
						res.status(400).send("Cohort ID doesn't exist");
					//ensuring password and username length is 6 or more characters
					} else if (req.body.password.length < 6 || newUser.username.length < 6) {
						res.status(400).send("Password or username must be of 6 or more characters!");
						//ensuring all fields are completed
					} else if (newUser.firstName && newUser.lastName && newUser.cohortId && newUser.isVolunteer !== "") {
						const query = "INSERT INTO users (first_name, last_name, pass_hash, user_name, is_volunteer, cohort_id) VALUES ($1, $2, $3, $4, $5, $6)";
						pool
							.query(query, [newUser.firstName, newUser.lastName, newUser.password, newUser.username, newUser.isVolunteer, newUser.cohortId])
							.then(() => res.status(200).send("User created successfully!"))
							.catch((error) => {
								console.error(error);
								res.status(500).json(error);
							});
					} else {
						res.status(400).send("One or more incomplete field(s)");
					}
				});
			}
		});
	} catch {
		res.status(500).send("Problem with pool.query");
	}
});


export default router;
