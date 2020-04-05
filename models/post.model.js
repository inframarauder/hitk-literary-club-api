const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 50, minlength: 1 },
    writer: { type: String, default: "Admin" },
    description: { type: String, maxlength: 100 },
    imageUrl: { type: String },
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = {
    title: Joi.string().required().min(1).max(50),
    writer: Joi.string(),
    description: Joi.string(),
  };

  return Joi.validate(post, schema);
}

module.exports = {
  Post,
  validatePost,
};
