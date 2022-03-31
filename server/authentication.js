import { Router } from "express";
import { authentication } from "./middleware";
import cors from "cors";
import pool from "./db";
import { verify } from "jsonwebtoken";

const auth = Router();
auth.use(cors());

// Will run before every endpoint starting with /validate
auth.post("/validate/volunteer", authentication("volunteer"));
auth.get("/trainee/ongoing-class", authentication("trainee"), (req, res) => {
    const token = res.locals.token;
    const user = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (!err) {
                return decoded;
            }
            return "Token is not valid";
        }
    );
    const userId = user.id;
    const time = new Date();
    const dateIn = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    const fullDate = `${year}-${pad(month)}-${pad(dateIn)}`;
    pool
    .query("SELECT * FROM weeks WHERE week_date=$1", [fullDate])
    .then((result) => {
        if (result.rows.length !== 1) {
            return res.status(200).json({});
        } else {
            const weekId = result.rows[0].id;
            const query = "SELECT regions.name AS region, cohorts.number AS cohort_no, weeks.week_date, weeks.start_time, weeks.end_time, modules.name AS module, volunteer_flags.clockin_time FROM users INNER JOIN cohorts ON users.cohort_id=cohorts.id INNER JOIN regions ON regions.id=cohorts.region_id INNER JOIN volunteer_flags ON volunteer_flags.user_id=users.id INNER JOIN weeks ON volunteer_flags.week_id=weeks.id INNER JOIN modules ON weeks.module_id=modules.id WHERE weeks.id=$1 AND users.id=$2";
            pool
            .query(query, [weekId, userId])
            .then((result1) => res.status(200).json(result1.rows[0]))
            .catch((err) => console.log(err));
        }
    });
});

auth.post("/validate/trainee", authentication("trainee"), (req, res) => {
    const token = res.locals.token;
    const user = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (!err) {
                return decoded;
            }
            return "Token is not valid";
        }
    );
    const userId = user.id;
    const time = new Date(req.body.timeIn);
    const dateIn = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const hourIn = time.getHours() - 1;
    const minutesIn = time.getMinutes();
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    const fullDate = `${year}-${pad(month)}-${pad(dateIn)}`;
    //checking if clock-in date matches class session date on database
    pool
        .query("SELECT * FROM weeks WHERE week_date=$1", [fullDate])
        .then((result) => {
            if (result.rows.length !== 1) {
                return res.status(400).json({ msg: "Sorry, you don't have class today!" });
            } else if (hourIn < 9 || hourIn === 9 && minutesIn < 45) {
                return res.status(400).json({ msg: "Sorry, you are early. Please come later." });
            } else if (hourIn === 15 && minutesIn >= 1) {
                return res.status(400).json({ msg: "Sorry, you cannot join. The class is about to finish" });
            } else if (hourIn > 16 || hourIn === 16 && minutesIn >= 1) {
                return res.status(400).json({ msg: "Sorry, There is no class to join!" });
            } else {
                const weekId = result.rows[0].id;
                //Checking if the trainee has already clocked in or not
                const queryCheck = "SELECT user_id FROM volunteer_flags WHERE week_id=$1 AND user_id=$2";
                pool
                    .query(queryCheck, [weekId, userId])
                    .then((result1) => {
                        if (result1.rows.length >= 1) {
                            return res.status(400).json({ msg: "You have already clocked in." });
                        } else {
                            const query = "INSERT INTO volunteer_flags (clockin_time, user_id, week_id) VALUES($1, $2, $3)";
                            const valueArr = [time, userId, weekId];
                            if (hourIn === 9 && minutesIn >= 45 || hourIn === 10 && minutesIn <= 15) {
                                //registering trainee clock-in time to database
                                pool
                                    .query(query, valueArr)
                                    .then(() => res.status(200).json({ msg: "Thank you for joining the class" }));
                            } else if (hourIn === 10 && minutesIn > 15 || hourIn > 10 || hourIn === 14 && minutesIn <= 59) {
                                //registering trainee's late clock-in time to database
                                pool
                                    .query(query, valueArr)
                                    .then(() => res.status(200).json({ msg: "You are late today." }));
                            }
                        }
                    })
            }
        })
        .catch((error) => console.log(error));
});
export default auth;
