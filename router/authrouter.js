import Express from "express";
import  authlogin  from "../Controllers/authController.js";

const authrouter = Express.Router();


authrouter.route("/login").post(authlogin);

export default authrouter;
