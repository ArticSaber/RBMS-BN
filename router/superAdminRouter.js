import Express from "express";
import {
  getUser,
  getAdmin,
  addUser,
  editUser,
  deleteUser,
  getallUsers,
  getSpecificUser,
} from "../Controllers/superAdminController.js";
import { verifyUser } from "../Middleware/Verify-User.js";
import authVerify from "../Middleware/auth-verify.js";

const superAdminRouter = Express.Router();

superAdminRouter
  .route("/getuser")
  .get(authVerify, verifyUser("superadmin"), getUser);

superAdminRouter
  .route("/getadmin")
  .get(authVerify, verifyUser("superadmin"), getAdmin);

superAdminRouter
  .route("/getusers")
  .get(authVerify, verifyUser("superadmin"), getallUsers);

superAdminRouter
  .route("/getspecificuser/:id")
  .get(authVerify, verifyUser("superadmin"), getSpecificUser);

superAdminRouter
  .route("/adduser")
  .post(authVerify, verifyUser("superadmin"), addUser);

superAdminRouter
  .route("/update/:id")
  .put(authVerify, verifyUser("superadmin"), editUser);

superAdminRouter
  .route("/delete/:id")
  .delete(authVerify, verifyUser("superadmin"), deleteUser);

export default superAdminRouter;
