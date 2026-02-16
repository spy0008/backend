const postModel = require("../models/post.model.js");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  try {
    const { caption } = req.body;
    const { buffer, originalname } = req.file;

    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "UnAuthenticated user - token empty" });
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "UnAuthorized - Token not verifyed",
      });
    }

    const file = await imageKit.files.upload({
      file: await toFile(Buffer.from(buffer), "file"),
      fileName: originalname,
      folder: "insta-clone",
    });

    const post = await postModel.create({
      caption,
      imgUrl: file.url,
      user: decoded.id,
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

module.exports = { createPost };
