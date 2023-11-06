import authSchema from "../model/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";


const addUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
          throw new badRequest("Email and Password is required");
    if (req.body.role === "superadmin" || req.body.role === "admin") {
      throw new badRequest("You are not authorized");
    }
    await authSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: "User Created" });
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


const adminUpdate = async (req, res, next) => {
  const userid = req.params.id;

  try {
    const user = await authSchema.findById(userid);
    if (!user) {
      throw new badRequest("User not found");
    }
    if (user.role === "superadmin" || user.role === "admin") {
      throw new badRequest("You are not authorized");
    }

    if (req.body.role === "superadmin" || req.body.role === "admin") {
      throw new badRequest("You are not authorized");
    }

    const updatedUser = await authSchema.findByIdAndUpdate(userid, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json({ message: "User Updated", updatedUser });
  } catch (error) {
    next(error);
  }
};

const adminDelete = async (req, res, next) => {
  const userid = req.params.id;
  try {
    const user = await authSchema.findById(userid);
    if (!user) {
      throw new badRequest("User not found");
      }
      if (user.role === "superadmin" || user.role === "admin") {
          throw new badRequest("You are not authorized");
        }
    await authSchema.findByIdAndDelete(userid);
    res.status(StatusCodes.OK).json({ message: "User Deleted" });
  } catch (error) {
    next(error);
  }
};
export { adminUpdate, adminDelete, addUser, getUser };
