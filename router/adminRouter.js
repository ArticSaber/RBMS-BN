import  Express  from "express";
import {getUser, adminUpdate, adminDelete, addUser} from "../Controllers/adminController.js";
import { verifyUser } from "../Middleware/Verify-User.js";
import authVerify from "../Middleware/auth-verify.js";

const adminRouter = Express.Router();

adminRouter.route("/getusers").get(authVerify, verifyUser('admin','superadmin'),getUser);

adminRouter
    .route("/adduser")
    .post(authVerify, verifyUser("admin"), addUser);

adminRouter
  .route("/update/:id")
  .put(authVerify, verifyUser("admin"), adminUpdate);

adminRouter
  .route("/delete/:id")
  .delete(authVerify, verifyUser("admin"), adminDelete);

export default adminRouter;
