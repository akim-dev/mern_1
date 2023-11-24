import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // for password hashing
import { errorHandle } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // for password hashing
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    // res.status(500).json(error.message);
    // from middleware
    // next(error);
    next(errorHandle(500, "error coming from this midleware function"));
  }
};
