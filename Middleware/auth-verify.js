import { jwtVerify } from "../utils/index.js";

const authVerify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const verified = jwtVerify(token);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized verified" });
    }
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerify;
