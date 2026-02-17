const express = require("express");
const {
  createPost,
  getPosts,
  getSinglePostDetails,
} = require("../controllers/post.controller");
const multer = require("multer");
const authCheckUser = require("../middlewares/auth.middleware");

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * - create a post
 * - /api/post/create
 */
postRouter.post("/create", authCheckUser, upload.single("imgUrl"), createPost);

/**
 * - get posts
 * - /api/post
 */
postRouter.get("/", authCheckUser, getPosts);

/**
 * - get a post
 * - /api/post/details/:postid
 */
postRouter.get("/details/:postId", authCheckUser, getSinglePostDetails);

module.exports = postRouter;
