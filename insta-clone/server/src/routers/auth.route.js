const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * - user register route
 * - /api/auth/register
 */
authRouter.post("/register", registerUser);

/**
 * - user login route
 * - /api/auth/login
 */
authRouter.post("/login", loginUser);

module.exports = authRouter;
