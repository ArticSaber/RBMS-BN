import Express from "express";
import { authSignup, authlogin } from "../Controllers/authController.js";

const authrouter = Express.Router();

authrouter.route("/Signup").post(authSignup);
authrouter.route("/login").post(authlogin);

export default authrouter;
