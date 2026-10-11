import User from "../model/User.js";

// Get all Users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(200).json({ message: "No User Registered" });
    }
    res.status(200).json({ message: "All Users Fetched", users });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Users", error });
  }
};

// Get one user with id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Found Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching User with ID", error });
  }
};
