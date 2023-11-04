import Express from "express";
import  {authlogin, sendRole}  from "../Controllers/authController.js";

const authrouter = Express.Router();


authrouter.route("/login").post(authlogin);

authrouter.route("/sendrole").post(sendRole)

export default authrouter;
