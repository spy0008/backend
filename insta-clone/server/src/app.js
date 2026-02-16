const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// create server -
const app = express();

// config -
app.use(express.json());
app.use(cors());
app.use(cookieParser());

module.exports = app;
