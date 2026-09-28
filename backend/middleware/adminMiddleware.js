const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "Admin access required",
    });
  }

  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({
      message: "You are not the authorized admin",
    });
  }

  next();
};

export default adminOnly;
