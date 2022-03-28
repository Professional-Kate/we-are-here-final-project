import { Router } from "express";
import { authentication } from "./middleware";
import cors from "cors";

const auth = Router();
auth.use(cors());

// Will run before every endpoint starting with /validate
auth.get("/validate/volunteer", authentication("volunteer"));
auth.get("/validate/trainee", authentication("trainee"));
export default auth;