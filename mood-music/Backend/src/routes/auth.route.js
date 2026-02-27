const { Router } = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;
