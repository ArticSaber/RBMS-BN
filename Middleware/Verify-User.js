const verifyUser = (req, res, next) => {
  try {
    if (req.user.payload === req.params.id) {
      next();
    } else {
      throw new badRequest("User not found");
    }
  } catch (error) {
    next(error);
  }
};

export default verifyUser;
