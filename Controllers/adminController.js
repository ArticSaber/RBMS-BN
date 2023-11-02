import authSchema from "../model/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const adminUpdate = async (req, res, next) => {
    const userid = req.params.id;
    
    try {
        const user = await authSchema.findById(userid);
        if (!user) {
            throw new badRequest("User not found");
        }
        const updatedUser = await authSchema.findByIdAndUpdate(
            userid,
            req.body,
            { new: true }
        );
        res.status(StatusCodes.OK).json({ message: "User Updated", updatedUser });
    }
    catch (error) {
        next(error);
    }
}