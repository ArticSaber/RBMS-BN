import jwt from 'jsonwebtoken';
import { badRequest } from "../error/index.js";

const verifyUser = (...role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) throw new badRequest("No token provided");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
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
