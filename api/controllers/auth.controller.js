import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // for password hashing
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";

// signup
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
    next(error);
  }
};

// login
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandle(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandle(401, "Wrong credentials"));
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...others } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
