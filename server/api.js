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
			password: hashedPassword,
			isVolunteer: true,
		};
		//checking if username already exist
		pool
		.query("SELECT user_name FROM users WHERE user_name=$1", [newUser.username])
		.then((result) => {
			if (result.rows.length > 0) {
				res.status(400).send("Username already exist!");
			//ensuring password and username length is 6 or more characters
			} else if (req.body.password.length < 6 || newUser.username.length < 6) {
				res.status(400).send("Password or username must be of 6 or more characters!");
				//ensuring all fields are completed
			} else if (newUser.firstName && newUser.lastName) {
				const query = "INSERT INTO users (first_name, last_name, pass_hash, user_name, is_volunteer) VALUES ($1, $2, $3, $4, $5)";
				pool
					.query(query, [newUser.firstName, newUser.lastName, newUser.password, newUser.username, newUser.isVolunteer])
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


export default router;
