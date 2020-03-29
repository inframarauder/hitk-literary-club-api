const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function() {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  let token = jwt.sign({ _id: this._id }, privateKey);
  return token;
};

module.exports = mongoose.model("User", userSchema);
