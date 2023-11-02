import Express from "express";
import { authSignup, authlogin, authToken } from "../Controllers/authController.js";

const authrouter = Express.Router();

authrouter.route("/api/create-user").post(authSignup);
authrouter.route("/login").post(authlogin);
// authrouter.route("/token").get(authToken);
// authrouter.get("/users/me", authToken, async (req, res) => {
//   res.send(req.user);
// });
export default authrouter;
