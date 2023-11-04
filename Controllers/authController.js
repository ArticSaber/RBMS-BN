import authSchema from "../model/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator, jwtVerify } from "../utils/index.js";
import  jwt  from "jsonwebtoken";

const authlogin = async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password)
      throw new badRequest("Email and Password is required");
    const User = await authSchema.findOne({ email: req.body.email });
    if (!User) throw new badRequest("User not found");
    const isActive = User.active;
    if (!isActive) throw new badRequest("User is not active");
    const isMatch = await comparePassword(req.body.password, User.password);
    if (!isMatch) throw new badRequest("Password is not correct");
    const token = jwtGenrator({ payload: { id: User._id, role: User.role } });
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.status(StatusCodes.OK).json({ message: "User Found" });
  } catch (error) {
    next(error);
  }
};

const sendRole = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) throw new badRequest("Token not found");
    const payload = jwtVerify(token);
    console.log(payload.payload.role);
    res.status(StatusCodes.OK).json({ role: payload.payload.role });
  } catch (error) {
    next(error);
  }
};


export { authlogin ,sendRole} ;
