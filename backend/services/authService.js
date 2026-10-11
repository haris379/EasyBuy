import jwt from "jsonwebtoken";

export const setUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRE_KEY,
    { expiresIn: "5h" },
  );
};

export const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRE_KEY);
};
