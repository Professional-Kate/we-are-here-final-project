import { Router } from "express";
import { authentication } from "./middleware";
import cors from "cors";
import pool from "./db";

const auth = Router();
auth.use(cors());

// Will run before every endpoint starting with /validate
auth.get("/validate/volunteer", authentication("volunteer"));
auth.get("/validate/trainee", authentication("trainee"));
// returning of current class data. Need to be a volunteer to access this
auth.get("/class/data", authentication("volunteer"), async (req, res) => {
  const { cohort_id } = res.locals.token;
  const { date } = req.body; // date is sent from the frontend
  const firstQuery = "WITH weeks AS (SELECT modules.name AS module_name, weeks.week_date, weeks.start_time, weeks.end_time FROM modules INNER JOIN weeks ON weeks.module_id = modules.id), cohorts AS (SELECT cohorts.number AS cohort_number, regions.name AS region_name FROM cohorts INNER JOIN regions ON regions.id = cohorts.region_id) SELECT * FROM weeks, cohorts WHERE cohorts.region_name = $1 AND cohorts.cohort_number = $2 AND weeks.week_date = $3;";

  const secondQuery = "SELECT users.id, CONCAT(users.first_name, users.last_name) AS name, volunteer_flags.clockin_time, volunteer_flags.left_early, volunteer_flags.no_webcam, volunteer_flags.low_participation, volunteer_flags.absent FROM volunteer_flags FULL OUTER JOIN users ON users.id = volunteer_flags.user_id WHERE users.cohort_id = $1 AND users.is_volunteer = false;";

  const { number, name } = await pool.query("SELECT cohorts.number, regions.name FROM cohorts INNER JOIN regions ON regions.id = cohorts.region_id WHERE cohorts.id = $1;", [cohort_id]).then((response) => response.rows[0]);

  const { rows } = await pool.query(firstQuery, [name, number, date]).catch((err) => console.log(err));

  const usersData = await pool.query(secondQuery, [cohort_id]);

  rows.length === 0 ? res.status(200).json({}) : res.status(200).json({ ...rows[0], users: usersData.rows });
});
export default auth;