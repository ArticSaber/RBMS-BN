import { jwtVerify } from "../utils/index.js";

const authVerify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verified = jwtVerify(token);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerify;
