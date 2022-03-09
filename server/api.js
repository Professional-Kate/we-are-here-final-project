import { Router } from "express";

const router = Router();
const users = [];
const cohortList = ["WM3", "London10", "WM4"];
const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
	res.json(users);
});

router.post("/users", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			cohort: req.body.cohort,
			password: hashedPassword,
		};
		if (users.some((user) => user.username === newUser.username)) {
			res.status(400).send("Username already exist!");
		} else if (cohortList.every((cohort) => cohort!== newUser.cohort)) {
			res.status(400).send("Cohort does not exist!");
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
