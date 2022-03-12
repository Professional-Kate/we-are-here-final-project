import { Router } from "express";

const router = Router();
const users = [];
const cohortList = ["WM3", "London10", "WM4"];
const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
	res.json(users);
});

router.post("/signup", async (req, res) => {
	try {
		//this hides the password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			cohort: req.body.cohort,
			password: hashedPassword,
		};
		//checking if username already exist
		if (users.some((user) => user.username === newUser.username)) {
			res.status(400).send("Username already exist!");
			//checking if a cohort exist
		} else if (cohortList.every((cohort) => cohort!== newUser.cohort)) {
			res.status(400).send("Cohort does not exist!");
			//ensuring that all fields are filled
		} else if (newUser.firstName && newUser.lastName && newUser.username && newUser.cohort && newUser.password) {
		users.push(newUser);
		res.status(201).send("User created.");
		} else {
			res.status(400).send("One or more incomplete field(s)");
		}
	} catch {
		res.status(500).send();
	}
});
export default router;
