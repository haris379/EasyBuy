import { getUser } from "../services/authService.js";

export const restrictToLoginUsersOnly = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).send({
        message: "Please Login to continue",
      });
    }
    const token = authHeaders.split(" ")[1];
    const user = getUser(token);
    if (!user) {
      return res.status(401).send({
        message: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in restrictToLoginUsersOnly",
      error,
    });
  }
};
