import { Router } from "express";
import pool from "./db";

const router = Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/users/cohorts", async (req, res) => {
  try {
    const cohorts = await pool.query("SELECT * FROM cohorts");
    res.json(cohorts.rows);
  } catch (err) {
    console.error(err.message);
  }
});


export default router;


