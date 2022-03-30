import { Router } from "express";
import { authentication } from "./middleware";
import cors from "cors";
import { Pool } from "./db";

const auth = Router();
auth.use(cors());

// Will run before every endpoint starting with /validate
auth.post("/validate/volunteer", authentication("volunteer"));
auth.post("/validate/trainee", authentication("trainee"), (req, res) => {
    const token = res.locals.token;
    // const user = verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if (!err) {
    //             return decoded;
    //         }
    //         return "Token is not valid";
    //     }
    // );
    const userId = token.id;
    const timeStamp = req.body.timeIn;
    const dateIn = timeStamp.getDate();
    const month = timeStamp.getMonth() + 1;
    const year = timeStamp.getYear();
    const hourIn = timeStamp.getHours();
    const minutesIn = timeStamp.getMinutes();
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    const fullDate = `${year}-${pad(month)}-${pad(dateIn)}`;
    Pool
    //checking if clock-in date matches class session date on database
    .query("SELECT * FROM weeks WHERE week_date=$1", [fullDate])
    .then((result) => {
        if (result.rows.length !== 1) {
            res.status(400).json({ msg: "Sorry, you don't have class today!" });
        } else if (hourIn < 9 || hourIn === 9 && minutesIn < 45) {
            res.status(400).json({ msg: "Sorry, you are early. Please come later." });
        } else if (hourIn === 15 && minutesIn >= 1) {
            res.status(400).json({ msg: "Sorry, you cannot join. The class is about to finish" });
        } else if (hourIn > 16 || hourIn === 16 && minutesIn >= 1) {
            res.status(400).json({ msg: "Sorry, There is no class to join!" });
        } else {
            const weekId = result.row[0].id;
            const query = "INSERT INTO volunteer_flags (clockin_time, user_id, week_id) VALUES($1, $2, $3)";
            const valueArr = [timeStamp, userId, weekId];
            if (hourIn === 9 && minutesIn >= 45 || hourIn === 10 && minutesIn <= 15) {
                Pool
                    //registering trainee clock-in time to database
                    .query(query, valueArr)
                    .then(() => res.status(200).json({ msg: "Thank you for joining the class" }));
            }
            if (hourIn === 10 && minutesIn > 15 || hourIn > 10 || hourIn === 14 && minutesIn <= 59) {
                Pool
                    //registering trainee clock-in time to database
                    .query(query, valueArr)
                    .then(() => res.status(200).json({ msg: "You are late today." }));
            }
        }
    })
    .catch((error) => res.status(500).json(error));
});
export default auth;
