import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

// *******not segregade controller **
// router.get("/test", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

// corrent way to use controller
router.get("/test", test);

export default router;
