import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"; // this is using route from user routes and change name from router to userRouter , this is no problem due to same name in both file and aleady export default on module user.route.js
import authRouter from "./routes/auth.route.js";
dotenv.config();
const app = express();
app.use(express.json()); // for allowing json on database

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// *******api route example with express **
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

// this is using route from user routes
app.use("/api/user", userRouter); // in this example we use /api/user mean from folder api subfolder routes we use user.route.js and then userRouter from file user.route.js

// for signup route
app.use("/api/auth", authRouter);

// for middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
