const express = require("express");
const { createPost } = require("../controllers/post.controller");
const multer = require("multer");

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * - create a post
 * - /api/post/create
 */
postRouter.post("/create", upload.single("imgUrl") ,createPost);

module.exports = postRouter;
