const express = require("express");
const logger = require("../configs/logger");
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

module.exports = router;
