import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"; // this is using route from user routes and change name from router to userRouter , this is no problem due to same name in both file and aleady export default on module user.route.js
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
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
