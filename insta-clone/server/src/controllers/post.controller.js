const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  try {
    const { caption } = req.body;
    const { buffer, originalname } = req.file;

    const file = await imageKit.files.upload({
      file: await toFile(Buffer.from(buffer), "file"),
      fileName: originalname,
      folder: "insta-clone",
    });

    const post = await postModel.create({
      caption,
      imgUrl: file.url,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Post Created successfully!!!",
      post,
    });
  } catch (error) {
    console.log("Creating post Error:" + error);
    res.status(500).json("server error");
  }
}

async function getPosts(req, res) {
  try {
    const userId = req.user.id;

    const posts = await postModel.find({
      user: userId,
    });

    if (!posts) {
      return res.status(404).json({
        message: "No Post found for User",
      });
    }

    res.status(200).json({
      message: "Post get successfully",
      posts,
    });
  } catch (error) {
    console.log("getting post Error:" + error);
    res.status(500).json("server error");
  }
}

async function getSinglePostDetails(req, res) {
  try {
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.statsu(404).json({
        message: "Post not found",
      });
    }

    const isValidPost = post.user.toString() === req.user.id;

    if (!isValidPost) {
      return res.status(403).json({
        message: "Forbiden Content",
      });
    }

    return res.status(200).json({
      message: "Post Fetched Successfully!!!",
      post,
    });
  } catch (error) {
    console.log("getting single post Error:" + error);
    res.status(500).json("server error");
  }
}

async function likePost(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.statsu(404).json({
        message: "Post not found",
      });
    }

    const like = await likeModel.create({
      post: postId,
      user: userId,
    });

    res.status(201).json({
      message: "Post like successfully!!!",
      like,
    });
  } catch (error) {
    console.log("Error while like a post:" + error);
    res.status(500).json("server error");
  }
}

module.exports = { createPost, getPosts, getSinglePostDetails, likePost };
