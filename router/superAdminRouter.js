import Express from "express";
import {
  addUser,
  editUser,
  deleteUser,
  getallUsers,
  getUser,
} from "../Controllers/superAdminController.js";
import { verifyUser } from "../Middleware/Verify-User.js";
import authVerify from "../Middleware/auth-verify.js";

const superAdminRouter = Express.Router();

superAdminRouter
  .route("/getusers")
  .get(authVerify, verifyUser("superadmin"), getallUsers);

superAdminRouter
  .route("/getuser/:id")
  .get(authVerify, verifyUser("superadmin"), getUser);

superAdminRouter
  .route("/adduser")
  .post(authVerify, verifyUser("superadmin"), addUser);

superAdminRouter
  .route("/edituser/:id")
  .put(authVerify, verifyUser("superadmin"), editUser);

superAdminRouter
  .route("/deleteuser/:id")
  .delete(authVerify, verifyUser("superadmin"), deleteUser);

export default superAdminRouter;
