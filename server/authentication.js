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
    const timeIn = req.body.timeIn;
    Pool
    .query("SELECT")
});
export default auth;
