import authSchema from "../model/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

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
    console.log(User, isActive, isMatch, token);
    res.cookie(
      "token",
      token,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.cookie(
      "role",
      User.role,
      {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    if (User.role === "user") {
      res.status(StatusCodes.OK).json({
        Status: true,
        message: "User Found",
        role: User.role,
        id: User._id,
      });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ Status: true, message: "User Found", role: User.role });
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const User = await authSchema.find({ role: "user" });
    if (!User) throw badRequest("No User found");
    res.status(StatusCodes.OK).json({ User });
  } catch (error) {
    next(error);
  }
};

export { authlogin, getUser };
