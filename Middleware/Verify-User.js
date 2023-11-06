import jwt from "jsonwebtoken";
import { badRequest } from "../error/index.js";
import authSchema from "../model/authSchema.js";

const verifyUser = (...role) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) throw new badRequest("No token provided");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      const checkUser = await authSchema.findOne({ _id: req.user.payload.id });
      if (!checkUser) throw new badRequest("User not found");
      if (checkUser.role !== req.user.payload.role)
        throw new badRequest("User not found");
      console.log(req.user.payload.role);
      if (role.includes(req.user.payload.role)) {
        next();
      } else {
        throw new badRequest("authorization failed verify user");
      }
    } catch (error) {
      next(error);
    }
  };
};

export { verifyUser };
