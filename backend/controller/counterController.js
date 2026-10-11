import Counter from "../model/Counter.js";
import User from "../model/User.js";

// Fetch All Counter of a User
export const getCounters = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const counters = await Counter.find({
      user: user._id,
    });
    res.status(200).json({ message: "Counter Fetched Successfully", counters });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Counters", error });
  }
};

// Add Counter
export const addCounter = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    const counter = await Counter.create({
      value: 0,
      user: user._id,
      name: user.name,
      email: user.email,
    });
    res.status(200).json({ message: "Counter created Successfully", counter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Adding Counter", error });
  }
};

// Delete Counter
export const deleteCounter = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    await Counter.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    res.status(200).json({ message: "Counter deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Deleting Counter", error });
  }
};

// Increment Counter Value
export const incrementValue = async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.findOne({ _id: id });
    if (!counter) {
      return res.status(400).json({ message: "Counter not Found" });
    }
    counter.value += 1;

    await counter.save();
    res
      .status(200)
      .json({ message: "Counter Value Incremented Successfully", counter });
  } catch (error) {
    res.status(500).json({ message: "Error Incrementing Counter", error });
  }
};

// Decrement Counter Value
export const decrementValue = async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.findOne({ _id: id });
    if (!counter) {
      return res.status(400).json({ message: "Counter not Found" });
    }
    if (counter.value === 0) {
      return res.status(401).json({ message: "No Decrement" });
    }
    counter.value -= 1;

    await counter.save();
    res
      .status(200)
      .json({ message: "Counter Value Decremented Successfully", counter });
  } catch (error) {
    res.status(500).json({ message: "Error Decrementing Counter", error });
  }
};
