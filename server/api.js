import { Router } from "express";
import pool from "./db";

const router = Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
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
    const cohorts = await pool.query("SELECT regions.name, cohorts.number FROM regions INNER JOIN cohorts ON regions.id = cohorts.region_id");
    return res.json(cohorts.rows);
  } catch (err) {
    console.error(err.message);
  }
});


export default router;


