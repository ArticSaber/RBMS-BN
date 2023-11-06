import Express from "express";
import { authlogin } from "../Controllers/authController.js";

const authrouter = Express.Router();

authrouter.route("/login").post(authlogin);

authrouter.route("/logout").get((req, res) => {
  res.clearCookie("token");
  res.clearCookie("role");
  res.status(200).json({ message: "Logout successfully", Status: true });
});

export default authrouter;
