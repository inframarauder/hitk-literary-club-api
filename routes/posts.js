const express = require("express");
const cloudinary = require("cloudinary");
require("../configs/cloudinary");
const logger = require("../configs/logger");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { Post, validatePost } = require("../models/post.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find().sort({ _id: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ error: "No posts collection in database!" });
    } else {
      return res.status(200).json(posts);
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    } else {
      return res.status(200).json(post);
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.post("/", isAuthenticated, uploadMiddleware, async (req, res) => {
  try {
    let { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      let cloudinaryUploads = {};
      for (var file of req.files) {
        let upload = await cloudinary.v2.uploader.upload(file.path, {
          public_id: `literary_club/${file.originalname}${Date.now()}`,
        });
        cloudinaryUploads[`${file.fieldname}`] = upload.secure_url;
      }
      let newPost = await new Post({
        ...req.body,
        ...cloudinaryUploads,
      }).save();
      return res.status(200).json(newPost);
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.put("/edit/:id", isAuthenticated, uploadMiddleware, async (req, res) => {
  try {
    let cloudinaryUploads = {};
    for (var file of req.files) {
      let upload = await cloudinary.v2.uploader.upload(file.path, {
        public_id: `literary_club/${file.originalname}${Date.now()}`,
      });
      cloudinaryUploads[`${file.fieldname}`] = upload.secure_url;
    }
    let post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...cloudinaryUploads },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    } else {
      return res.status(200).json(post);
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    } else {
      return res.status(200).json({ success: `${post._id} deleted!` });
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
