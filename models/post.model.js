const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    writer: { type: String, required: true },
    description: { type: String, maxlength: 100 },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post
};
