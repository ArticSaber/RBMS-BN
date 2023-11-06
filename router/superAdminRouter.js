import Express from "express";
import {
  getAdmin,
  addUser,
  editUser,
  deleteUser,
  getallUsers,
  getSpecificUser,
  getSuperAdmin,
} from "../Controllers/superAdminController.js";
import { verifyUser } from "../Middleware/Verify-User.js";
import authVerify from "../Middleware/auth-verify.js";

const superAdminRouter = Express.Router();

superAdminRouter
  .route("/getadmin")
  .get(authVerify, verifyUser("superadmin"), getAdmin);
  
superAdminRouter
  .route("/getsuperadmin")
  .get(authVerify, verifyUser("superadmin"), getSuperAdmin);

superAdminRouter
  .route("/getusers")
  .get(authVerify, verifyUser("superadmin"), getallUsers);

superAdminRouter
  .route("/getspecificuser/:id")
  .get(authVerify, verifyUser("superadmin"), getSpecificUser);

superAdminRouter
  .route("/adduser")
  .post(addUser);
  // authVerify, verifyUser("superadmin"),

  superAdminRouter
    .route("/update/:id")
    .put(authVerify, verifyUser("superadmin"), editUser);

superAdminRouter
  .route("/delete/:id")
  .delete(authVerify, verifyUser("superadmin"), deleteUser);

export default superAdminRouter;
