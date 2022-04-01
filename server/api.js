import { Router } from "express";
import pool from "./db";

const jwt = require("jsonwebtoken");

const router = Router();
const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
	res.json("hello world");
});

router.post("/signup", async (req, res) => {
	console.log(req.body.cohortId, req.body.isVolunteer);
	try {//this hides the password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: hashedPassword,
			isVolunteer: req.body.isVolunteer,
			cohortId: req.body.cohortId,
		};
		//checking if username already exist
		pool
			.query("SELECT user_name FROM users WHERE user_name=$1", [
				newUser.username,
			])
			.then((result) => {
				if (result.rows.length > 0) {
					res.status(400).send("Username already exist!");
					//ensuring password and username length is 6 or more characters
				} else if (
					req.body.password.length < 6 ||
					newUser.username.length < 6
				) {
					res
						.status(400)
						.send("Password or username must have 6 or more characters!");
					//ensuring all fields are completed
				} else if (newUser.firstName && newUser.lastName) {
					const query =
						"INSERT INTO users (first_name, last_name, pass_hash, user_name, is_volunteer, cohort_id) VALUES ($1, $2, $3, $4, $5, $6)";
					pool
						.query(query, [
							newUser.firstName,
							newUser.lastName,
							newUser.password,
							newUser.username,
							newUser.isVolunteer,
							newUser.cohortId,
						])
						.then(() => res.status(200).send("User created successfully!"))
						.catch((error) => {
							console.error(error);
							res.status(500).json(error);
						});
				} else {
					res.status(400).send("Name field(s) incomplete");
				}
			});
	} catch {
		res.status(500).send("Problem with pool.query");
	}
});

router.post("/login", (req, res) => {
	const username = req.body.username;
	console.log(username);
	let user;
	pool //checking if username exist in the database
		.query("SELECT * FROM users WHERE user_name=$1", [username])
		.then((result) => {
			if (result.rows.length !== 1) {
				res.status(403).send("Username doesn't exist");
			} else {
				//user is the payload
				user = result.rows[0];
				//verifying password with the stored one on database
				bcrypt.compare(req.body.password, user.pass_hash, (err, data) => {
					if (err) {
						res.sendStatus(403);
					}
					if (data) {
						//jsonwebtoken is generated after login success
						const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
						res.status(200).json({
							isVolunteer:user.is_volunteer,
							login: "success",
							accessToken: token,
						});
					} else {
						res.status(403).json("Incorrect password.");
					}
				});
			}
		})
		.catch((error) => res.status(500).send(error));
});

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT first_name, last_name, user_name, cohort_id OR first_name, last_name, is_volunteer FROM users");
    return res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});



router.get("/cohorts", async (req, res) => {
  try {
    const cohorts = await pool.query("SELECT regions.name AS region_name, cohorts.number AS cohort_number, cohorts.id AS cohort_id FROM regions INNER JOIN cohorts ON regions.id = cohorts.region_id");
    return res.json(cohorts.rows);
  } catch (err) {
    console.error(err.message);
  }
});


export default router;


