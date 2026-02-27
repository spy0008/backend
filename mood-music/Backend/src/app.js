const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("../src/routes/auth.route.js");

const app = express();

//configs
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", userRouter);

module.exports = app;
