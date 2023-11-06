import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import authSchema from "../model/authSchema.js";

const getallUsers = async (req, res, next) => {
  try {
    const User = await authSchema.find();
    if (!User) throw badRequest("No User found");
    res.status(StatusCodes.OK).json(User);
  } catch (error) {
    next(error);
  }
};
const getSpecificUser = async (req, res, next) => {
  try {
    const User = await authSchema.find({ _id: req.params.id });
    if (!User) throw badRequest("No User found");
    res.status(StatusCodes.OK).json({ User });
  } catch (error) {
    next(error);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const Admin = await authSchema.find({ role: "admin" });
    if (!Admin) throw badRequest("No User found");
    res.status(StatusCodes.OK).json({ Admin });
  } catch (error) {
    next(error);
  }
};
const getSuperAdmin = async (req, res, next) => {
  try {
    const SuperAdmin = await authSchema.find({ role: "superadmin" });
    if (!SuperAdmin) throw badRequest("No User found");
    res.status(StatusCodes.OK).json({ SuperAdmin });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      throw new badRequest("Email and Password is required");
    await authSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: "User Created" });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const User = await authSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!User) throw new badRequest("User not found");
    res.status(StatusCodes.OK).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await authSchema.findByIdAndDelete(req.params.id);
    if (!user) throw new badRequest("User not found");
    res.status(StatusCodes.OK).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export {
  addUser,
  editUser,
  deleteUser,
  getallUsers,
  getSpecificUser,
  getAdmin,
  getSuperAdmin,
};
