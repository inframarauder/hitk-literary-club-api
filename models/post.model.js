const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    writer: { type: String, default: "Admin" },
    description: { type: String, maxlength: 100 },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = {
    title: Joi.string()
      .required()
      .min(1)
      .max(50),
    writer: Joi.string().min(1),
    description: Joi.string().max(100)
  };

  return Joi.validate(post, schema);
}

module.exports = {
  Post,
  validatePost
};
