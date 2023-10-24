import authSchema from "../model/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const authSignup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      throw new badRequest("Email and Password is required");
    await authSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: "User Created" });
  } catch (error) {
    next(error);
  }
};
const authlogin = async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password) {
      throw new badRequest("Email and Password is required");
    }
    const User = await authSchema.findOne({ email: req.body.email });
    if (!User) {
      throw new badRequest("User not found");
    }
    const isMatch = await comparePassword(req.body.password, User.password);
    if (!isMatch) {
      throw new badRequest("Password is not correct");
    }
    const token = jwtGenrator({ payload: { id: User._id, role: User.role } });
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.status(StatusCodes.OK).json({ message: "User Found", token: token });
  } catch (error) {
    next(error);
  }
};

export { authSignup, authlogin };
